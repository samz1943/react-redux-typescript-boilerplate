import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../redux/auth/authActions';

function NavBar() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-semibold">
          MyApp
        </Link>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;