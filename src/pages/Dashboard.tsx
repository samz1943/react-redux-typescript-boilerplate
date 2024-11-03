import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchPosts } from '../redux/post/postActions';

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { posts, loading, error } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const goToPost = (id: number) => {
    navigate('/post/' + id)
  }

  if (loading === 'pending') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg className="animate-spin h-8 w-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      </div>
    );
  };

  return (
    <div className="container mx-auto my-6 px-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Dashboard</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md text-center mb-6">
          Error loading posts: {error}
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
              onClick={() => goToPost(post.id)}
            >
              <div className="p-5">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.content}</p>
                <div className="border-t pt-4 mt-4 text-sm text-gray-500">
                  <p>
                    Published by: <strong>{post.publishedBy.username}</strong>
                    {' | '}
                    <a
                      href={`mailto:${post.publishedBy.email}`}
                      className="text-blue-500 hover:underline"
                    >
                      {post.publishedBy.email}
                    </a>
                  </p>
                  <p>Created on: {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-center col-span-full text-gray-600">
              No posts available.
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default Dashboard;
