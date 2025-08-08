import React from 'react';
import { ListGroup } from 'react-bootstrap';

function CommentList({ comments }) {
  if (!comments.length) return <p>No comments yet.</p>;

  return (
    <ListGroup>
      {comments.map(({ id, authorName, content, createdAt }) => (
        <ListGroup.Item key={id}>
          <strong>{authorName || 'Anonymous'}</strong> <small className="text-muted">({new Date(createdAt).toLocaleString()})</small>
          <p>{content}</p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default CommentList;
