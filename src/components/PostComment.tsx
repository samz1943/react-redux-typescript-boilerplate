import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, updateCommentById, deleteCommentById } from '../actions/commentActions';
import { RootState, AppDispatch } from '../store';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';

interface PostCommentProps {
  postId: number;
  userId: number;
}

const PostComment: React.FC<PostCommentProps> = ({ postId, userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { comments, loading, currentPage, totalPages } = useSelector((state: RootState) => state.comment);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const hasMore = currentPage < totalPages;

  useEffect(() => {
    dispatch(fetchComments({ postId, commentListRequest: { page: 1, limit: 10 } }));
  }, [dispatch, postId]);

  const loadMoreComments = () => {
    if (hasMore) {
      dispatch(fetchComments({ postId, commentListRequest: { page: currentPage + 1, limit: 10 } }));
    }
  };

  const confirmDelete = (commentId: number) => {
    setSelectedCommentId(commentId);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (selectedCommentId !== null) {
      dispatch(deleteCommentById({ postId, commentId: selectedCommentId }));
      setShowDeleteModal(false);
      setSelectedCommentId(null);
    }
  };

  const startEdit = (commentId: number, content: string) => {
    setSelectedCommentId(commentId);
    setComment(content);
    setShowEditModal(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCommentId !== null && comment.trim()) {
      await dispatch(updateCommentById({ postId: postId, commentId: selectedCommentId, data: { content: comment } }));
      setShowEditModal(false);
      setSelectedCommentId(null);
      setComment('');
    }
  };

  return (
    <div className="w-full max-w-lg" style={{ overflowY: 'auto' }}>
      <InfiniteScroll
        dataLength={comments.length}
        next={loadMoreComments}
        hasMore={hasMore}
        loader={<div className="flex justify-center my-4"><Spinner /></div>}
        endMessage={<p className="text-center text-gray-500 mt-4">No more comments</p>}
        scrollableTarget="scrollableDiv"
      >
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 rounded-lg p-4 mb-4 shadow-sm">
            <p className="text-gray-700 mb-1">{comment.content}</p>
            <small className="text-gray-500">By: {comment.commentBy.username}</small>
            {comment.commentBy.id === userId && (
              <div className="flex space-x-2 mt-2">
                <button className="text-blue-500 hover:underline" onClick={() => startEdit(comment.id, comment.content)}>Edit</button>
                <button className="text-red-500 hover:underline" onClick={() => confirmDelete(comment.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </InfiniteScroll>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this comment?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Comment Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-xl font-semibold mb-4">Edit Comment</h2>
            <form onSubmit={handleUpdate}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                rows={3}
              />
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  type="button"
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostComment;
