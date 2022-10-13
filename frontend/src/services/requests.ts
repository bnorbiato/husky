import api from './axios/api';

export const getAllUsers = () => {
  return api.get('/users');
};

export const getUser = (email) => {
  return api.get(`/users/${email}`);
};

export const createUser = (user) => {
  return api.post('/users', user);
};

export const updateUser = (email, user) => {
  return api.put(`/users/${email}`, user);
};

export const deleteUser = (email) => {
  return api.delete(`/users/${email}`);
};