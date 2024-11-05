import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, deleteCommentById } from '../actions/commentActions';
import { RootState, AppDispatch } from '../store';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';

interface PostCommentProps {
  postId: number;
  userId: number;
}

const PostComment: React.FC<PostCommentProps> = ({ postId, userId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { comments, loading, totalItems, currentPage, totalPages } = useSelector((state: RootState) => state.comment);

  const hasMore = currentPage < totalPages;

  useEffect(() => {
    dispatch(fetchComments({ postId, commentListRequest: { page: 1, limit: 10 } }));
  }, [dispatch, postId]);

  const loadMoreComments = () => {
    if (hasMore) {
      dispatch(fetchComments({ postId, commentListRequest: { page: currentPage + 1, limit: 10 } }));
    }
  };

  const handleDelete = (postId: number, commentId: number) => {
    dispatch(deleteCommentById({ postId, commentId }));
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <InfiniteScroll
        dataLength={totalItems}
        next={loadMoreComments}
        hasMore={hasMore}
        loader={<div className="flex justify-center my-4"><Spinner /></div>}
        endMessage={<p className="text-center text-gray-500 mt-4">No more comments</p>}
      >
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 py-4 flex justify-between items-start">
            <div className="flex-1">
              <p className="text-gray-700 mb-1">{comment.content}</p>
              <small className="text-gray-500">By: {comment.commentBy.username}</small>
            </div>
            {comment.commentBy.id === userId && (
              <div className="flex space-x-2 ml-4">
                <button className="text-blue-500 hover:underline" onClick={() => {/* edit logic here */}}>Edit</button>
                <button className="text-red-500 hover:underline" onClick={() => handleDelete(postId, comment.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </InfiniteScroll>
      {loading === 'pending' && <Spinner />}
    </div>
  );
};

export default PostComment;
