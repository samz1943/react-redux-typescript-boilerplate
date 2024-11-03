import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/auth/authActions';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function NavBar() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Nav className="me-auto">
          {isAuthenticated ? (
            <>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
            </>
          )}
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;