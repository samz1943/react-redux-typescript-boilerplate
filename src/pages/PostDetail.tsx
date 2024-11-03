import { useEffect } from "react";
import { useDispatch, useSelector  } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { fetchPostById, clearSelectedPost } from "../redux/post/postActions";
import { Alert, Container } from "react-bootstrap";

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

  if (error) {
    return <Alert variant="danger">Error loading post: {error}</Alert>;
  }

  if (!selectedPost) {
    return <p className="text-center">Post not found.</p>;
  }

  return (
    <Container className="my-4">
      <h1>{selectedPost.title}</h1>
      <p>{selectedPost.content}</p>
      <p className="text-muted">
        Published by: <strong>{selectedPost.publishedBy.username}</strong>
      </p>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </Container>
  );
}

export default PostDetail;
  