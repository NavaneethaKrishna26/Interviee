import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { likePost } from '../services/postService';

function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async () => {
    try {
      await likePost(postId);
      setLikes(likes + 1);
    } catch (err) {
      alert('Failed to like post');
    }
  };

  return (
    <Button variant="outline-danger" onClick={handleLike}>
      ❤️ {likes}
    </Button>
  );
}

export default LikeButton;
