import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchPosts } from '../redux/post/postActions';
import { Container, Spinner, Alert, Row, Col, Card } from 'react-bootstrap';

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

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts: {error}</p>;

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Dashboard</h1>

      {loading && (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">Error loading posts: {error}</Alert>}

      <Row xs={1} md={2} lg={3} className="g-4">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <Col key={post.id}>
              <Card className="h-100 shadow-sm" onClick={() => goToPost(post.id)}>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text className="text-muted">{post.content}</Card.Text>
                  <Card.Footer className="border-top mt-3">
                    <small className="text-muted">
                      Published by: <strong>{post.publishedBy.username}</strong> |{' '}
                      <a href={`mailto:${post.publishedBy.email}`}>{post.publishedBy.email}</a>
                    </small>
                    <br />
                    <small className="text-muted">Created on: {new Date(post.createdAt).toLocaleDateString()}</small>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          !loading && <p className="text-center">No posts available.</p>
        )}
      </Row>
    </Container>
  );
}

export default Dashboard;
