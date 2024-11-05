import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUsers, removeUser } from '../actions/userActions';

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { self, users, totalPages, loading } = useSelector((state: RootState) => state.user);

  const [usernameFilter, setUsernameFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUsers({ page, limit: 5, username: usernameFilter }));
  }, [dispatch, page, usernameFilter]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameFilter(event.target.value);
    setPage(1);
  };

  const handleDeleteClick = (userId: number) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedUserId !== null) {
      dispatch(removeUser(selectedUserId)).then(() => {
        dispatch(fetchUsers({ page, limit: 5, username: usernameFilter }));
      });
      setShowModal(false);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4 text-center">User List</h1>

      {/* Username Filter */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Filter by username"
          value={usernameFilter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* User List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {loading === 'pending' ? (
          <div className="flex justify-center items-center h-40">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12" />
          </div>
        ) : (
          <ul className="space-y-4">
            {users.map((user) => (
              <li key={user.id} className="border-b pb-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{user.username}</p>
                <p className="text-gray-500">{user.email}</p>
              </div>
              {user.id !== self.id && (
                <button
                  onClick={() => handleDeleteClick(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h2 className="text-xl font-semibold mb-4 text-center">Confirm Deletion</h2>
            <p className="text-center mb-6">Are you sure you want to delete this user?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
