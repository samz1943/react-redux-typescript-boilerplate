import { useEffect, useState } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, deletePostById, clearSelectedPost } from "../actions/postActions";
import PostComment from "../components/PostComment";
import Spinner from "../components/Spinner";

function PostDetail() {
  let { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.self.id);
  const { selectedPost, loading, error } = useSelector((state: RootState) => state.post);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(parseInt(id)));
    };

    return () => {
      dispatch(clearSelectedPost()); // Clear the selected post when component unmounts
    };
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (id) {
      const resultAction = await dispatch(deletePostById(parseInt(id)));
  
      if (deletePostById.fulfilled.match(resultAction)) {
        setDeleteSuccess(true);
      }
    }
  };

  if (loading === 'pending') {
    return (
      <div className="flex justify-center my-12">
        <Spinner></Spinner>
      </div>
    );
  };

  if (error) {
    return <p className="text-center text-red-500 my-4">Error loading post: {error}</p>;
  }

  if (!selectedPost) {
    return <p className="text-center text-gray-600 my-4">Post not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 my-8 flex justify-center">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">{selectedPost.title}</h1>
        <p className="text-gray-700 mb-6">{selectedPost.content}</p>
        <p className="text-gray-500 mb-4">
          Published by: <span className="font-semibold">{selectedPost.publishedBy.username}</span>
        </p>
        
        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
          {userId === selectedPost.publishedBy.id &&
            <div className="space-x-2">
              <button
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-200"
                onClick={() => navigate('/post/' + id + '/edit')}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </button>
            </div>
          }
        </div>

        <PostComment postId={selectedPost.id} userId={userId} />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            {deleteSuccess ? (
              <>
                <h2 className="text-2xl font-semibold mb-4">Post Deleted</h2>
                <p className="text-gray-700 mb-6">The post has been successfully deleted.</p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                  Back to Dashboard
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
                <p className="text-gray-700 mb-6">Are you sure you want to delete this post?</p>
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
  