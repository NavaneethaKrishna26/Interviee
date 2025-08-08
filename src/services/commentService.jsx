import api from './api';

export const fetchComments = async (postId) => {
  const res = await api.get(`/posts/${postId}/comments`);
  return res.data;
};

export const addComment = async (postId, comment) => {
  const res = await api.post(`/posts/${postId}/comments`, comment);
  return res.data;
};
