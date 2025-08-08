// src/services/postService.js
import api from './api';

export const fetchAllPosts = async () => {
  const res = await api.get('/posts');
  return res.data;
};

export const createPost = async (post) => {
  const res = await api.post('/posts', post);
  return res.data;
};

export const getPostById = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};
export const filterPosts = async (filters) => {
  const params = new URLSearchParams();

  if (filters.company) params.append('company', filters.company);
  if (filters.role) params.append('role', filters.role);
  if (filters.branch) params.append('branch', filters.branch);

  const res = await api.get(`/posts/filter?${params.toString()}`);
  return res.data;
};
export const likePost = async (postId) => {
  await api.put(`/posts/${postId}/like`);
};
