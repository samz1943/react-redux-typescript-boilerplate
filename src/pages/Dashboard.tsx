import { useEffect, useState, useCallback  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchPosts } from '../actions/postActions';
import { debounce } from 'lodash';
import Spinner from '../components/Spinner';

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { posts, loading, error, totalPages } = useSelector((state: RootState) => state.post);

  const [titleFilter, setTitleFilter] = useState('');
  const [page, setPage] = useState(1);

  const fetchDebouncedPosts = useCallback(
    debounce((title) => {
      dispatch(fetchPosts({ page, limit: 6, title }));
    }, 500),
    [dispatch, page]
  );

  useEffect(() => {
    fetchDebouncedPosts(titleFilter);
    return fetchDebouncedPosts.cancel;
  }, [titleFilter, page, fetchDebouncedPosts]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleFilter(e.target.value);
    setPage(1);
  };

  const goToPost = (id: number) => {
    navigate('/post/' + id)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading === 'pending') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner></Spinner>
      </div>
    );
  };

  return (
    <div className="container mx-auto my-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-center mb-6">Dashboard</h1>
        <button
          onClick={() => navigate('/post/create')}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Create Post
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md text-center mb-6">
          Error loading posts: {error}
        </div>
      )}

      {/* Title Filter Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter by title"
          value={titleFilter}
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Posts in Single Column */}
      <div className="grid gap-6 grid-cols-2">
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

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
