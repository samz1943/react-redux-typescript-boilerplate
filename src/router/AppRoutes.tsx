import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import PostDetail from '../pages/PostDetail';
import Login from '../pages/Login';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import FullLayout from '../components/FullLayout';

function AppRoutes() {
    const routes = useRoutes([
        {
            path: '/',
            element: <FullLayout />,
            children: [
                { path: '/home', element: <Home /> },
                { path: '/dashboard', element: <Dashboard /> },
                { path: '/post/:id', element: <PostDetail /> },
                { path: '/about', element: <About /> },
                { path: '/contact', element: <Contact /> },
                { path: '/login', element: <Login /> },
                { path: '*', element: <NotFound /> },
            ]
        }
    ]);

    return routes;
}

export default AppRoutes;
