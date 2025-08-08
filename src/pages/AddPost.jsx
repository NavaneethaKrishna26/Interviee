// src/pages/AddPost.js
import React, { useState } from 'react';
import { createPost } from '../services/postService';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import dayjs from 'dayjs';

function AddPost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    interviewDate: '',
    branch: '',
    numberOfRounds: '',
    experience: '',
    tips: '',
    authorName: '',
    tags: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.companyName || !formData.role || !formData.experience || !formData.authorName) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      const postData = {
        ...formData,
        interviewDate: formData.interviewDate || null,
        numberOfRounds: parseInt(formData.numberOfRounds || 0),
        datePosted: dayjs().format('YYYY-MM-DD'),
      };

      await createPost(postData);
      alert("Form submitted");
      navigate('/'); // Redirect to home
    } catch (err) {
      setError("Failed to post. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <h4 className="mb-4">📝 Share Your Interview Experience</h4>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Company Name *</Form.Label>
          <Form.Control type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Role *</Form.Label>
          <Form.Control type="text" name="role" value={formData.role} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date of Interview</Form.Label>
          <Form.Control type="date" name="interviewDate" value={formData.interviewDate} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Branch/Stream</Form.Label>
          <Form.Control type="text" name="branch" value={formData.branch} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Number of Rounds</Form.Label>
          <Form.Control type="number" name="numberOfRounds" value={formData.numberOfRounds} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Detailed Experience *</Form.Label>
          <Form.Control as="textarea" rows={4} name="experience" value={formData.experience} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tips for Others</Form.Label>
          <Form.Control as="textarea" rows={2} name="tips" value={formData.tips} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Your Name *</Form.Label>
          <Form.Control type="text" name="authorName" value={formData.authorName} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tags (comma separated)</Form.Label>
          <Form.Control type="text" name="tags" value={formData.tags} onChange={handleChange} />
        </Form.Group>

        <Button type="submit" variant="success">Submit Post</Button>
      </Form>
    </div>
  );
}
export default AddPost;
