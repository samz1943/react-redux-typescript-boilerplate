import React, { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import { addPost } from "../actions/postActions";
import Spinner from '../components/Spinner';

function CreatePost() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { loading, error } = useSelector((state: RootState) => state.post);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(addPost({ title, content }));

    if (addPost.fulfilled.match(resultAction)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="container mx-auto px-4 my-8 max-w-2xl w-full">
      <h1 className="text-3xl font-semibold mb-6">Create Post</h1>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-2"
              placeholder="Enter post title"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-medium mb-2">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-2"
              rows={6}
              placeholder="Enter post content"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition duration-200"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              disabled={loading === 'pending'}
            >
              {loading === 'pending' ? <Spinner></Spinner> : 'Create'}
            </button>
          </div>
      </form>
    </div>
  );
}

export default CreatePost;
