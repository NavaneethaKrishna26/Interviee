// src/pages/ViewPost.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../services/postService';
import { fetchComments } from '../services/commentService';

import { Card, Badge, Button, Spinner } from 'react-bootstrap';
import LikeButton from '../components/LikeButton';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load post and comments
  useEffect(() => {
    const loadData = async () => {
      try {
        const postData = await getPostById(id);
        setPost(postData);

        const commentData = await fetchComments(id);
        setComments(commentData);
      } catch (err) {
        console.error("Failed to fetch post or comments", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  // Reload comments after new comment added
  const refreshComments = async () => {
    const updatedComments = await fetchComments(id);
    setComments(updatedComments);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!post) {
    return <p>Post not found or an error occurred.</p>;
  }

  return (
    <div>
      <Link to="/">
        <Button variant="secondary" className="mb-3">&larr; Back</Button>
      </Link>

      <Card className="shadow-sm mb-3">
        <Card.Body>
          <h4>{post.companyName} - {post.role}</h4>
          <p className="text-muted">
            By {post.authorName} | Interview on {post.interviewDate || "N/A"} | Posted on {post.datePosted}
          </p>

          {post.branch && (
            <p><strong>Branch:</strong> {post.branch}</p>
          )}

          <p><strong>Number of Rounds:</strong> {post.numberOfRounds}</p>

          <hr />
          <h5>📌 Experience</h5>
          <p style={{ whiteSpace: "pre-line" }}>{post.experience}</p>

          {post.tips && (
            <>
              <hr />
              <h5>💡 Tips</h5>
              <p style={{ whiteSpace: "pre-line" }}>{post.tips}</p>
            </>
          )}

          {post.tags && (
            <div className="mt-3">
              {post.tags.split(',').map((tag, index) => (
                <Badge bg="info" className="me-1" key={index}>#{tag.trim()}</Badge>
              ))}
            </div>
          )}

          {/* LIKE BUTTON */}
          <div className="mt-4">
            <LikeButton postId={post.id} initialLikes={post.likeCount} />
          </div>
        </Card.Body>
      </Card>

      {/* COMMENTS SECTION */}
      <h5>Comments</h5>
      <CommentList comments={comments} />
      <CommentForm postId={post.id} onCommentAdded={refreshComments} />
    </div>
  );
}

export default ViewPost;
