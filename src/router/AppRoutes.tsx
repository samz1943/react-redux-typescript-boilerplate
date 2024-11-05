import { useRoutes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Dashboard from '../pages/Dashboard';
import PostDetail from '../pages/PostDetail';
import CreatePost from '../pages/CreatePost';
import EditPost from '../pages/EditPost';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import FullLayout from '../components/FullLayout';
import UserList from '../pages/UserList';

function AppRoutes() {
    const isAuthenticated = useSelector((state: RootState) => !!state.auth.accessToken);

    const routes = useRoutes([
        {
            path: '/',
            element: <FullLayout />,
            children: [
                { path: '/login', element: <Login /> },
                { index: true, path: '/dashboard', element: isAuthenticated ? <Dashboard /> : <Navigate to="/login" /> },
                { path: '/post/create', element: isAuthenticated ? <CreatePost /> : <Navigate to="/login" /> },
                { path: '/post/:id', element: isAuthenticated ? <PostDetail /> : <Navigate to="/login" /> },
                { path: '/post/:id/edit', element: isAuthenticated ? <EditPost /> : <Navigate to="/login" /> },
                { path: '/user', element: isAuthenticated ? <UserList /> : <Navigate to="/login" /> },
                { path: '*', element: <NotFound /> },
            ]
        }
    ]);

    return routes;
}

export default AppRoutes;
