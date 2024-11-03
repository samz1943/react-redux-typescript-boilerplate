import { useEffect } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { fetchPostById, clearSelectedPost } from "../redux/post/postActions";
import Spinner from "../components/Spinner";

function PostDetail() {
  let { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { selectedPost, loading, error } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(parseInt(id)));
    };

    return () => {
      dispatch(clearSelectedPost()); // Clear the selected post when component unmounts
    };
  }, [dispatch, id]);

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
          <div className="space-x-2">
            <button
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-200"
              onClick={() => {}}
            >
              Update
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
              onClick={() => {}}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
  