import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addComment } from '../services/commentService';

function CommentForm({ postId, onCommentAdded }) {
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await addComment(postId, { authorName, content });
      setAuthorName('');
      setContent('');
      onCommentAdded();
    } catch (err) {
      alert('Failed to add comment');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Group className="mb-2">
        <Form.Control
          placeholder="Your name (optional)"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Write your comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary">Add Comment</Button>
    </Form>
  );
}

export default CommentForm;
