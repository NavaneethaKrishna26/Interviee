import React, { useEffect, useState } from 'react';
import { filterPosts } from '../services/postService';
import { Link } from 'react-router-dom';
import { Button, Card, Spinner, Form, Row, Col } from 'react-bootstrap';
import '../Styles/Home.css'; 

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: '',
    company: '',
    role: '',
    branch: '',
  });

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const data = await filterPosts({
          company: filters.search || filters.company,
          role: filters.role,
          branch: filters.branch,
        });
        setPosts(data.reverse());
      } catch (err) {
        console.error("Error fetching posts", err);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>📚 Interview Experiences</h4>
        <Link to="/addpost">
          <Button variant="primary">+ Add Post</Button>
        </Link>
      </div>

      {/* Search & Filter Controls */}
      <Form className="mb-4">
        <Row>
          <Col md={4} className="mb-2">
            <Form.Control
              placeholder="Search by company or keyword"
              name="search"
              value={filters.search}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={3} className="mb-2">
            <Form.Control
              placeholder="Filter by role"
              name="role"
              value={filters.role}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={3} className="mb-2">
            <Form.Control
              placeholder="Filter by branch"
              name="branch"
              value={filters.branch}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={2}>
            <Button variant="secondary" onClick={() => setFilters({search:'', company:'', role:'', branch:''})}>
              Clear Filters
            </Button>
          </Col>
        </Row>
      </Form>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <Card className="mb-3 shadow-sm" key={post.id}>
            <Card.Body>
              <Card.Title>{post.companyName} - {post.role}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                By {post.authorName} | {post.datePosted}
              </Card.Subtitle>
              <Card.Text>
                {post.experience?.substring(0, 150)}...
              </Card.Text>
              <Link to={`/posts/${post.id}`}>
                <Button variant="outline-primary" size="sm">Read More</Button>
              </Link>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default Home;
