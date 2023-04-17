import axios from 'axios';
import { Auth } from '../types/auth';
import { Todo } from '../types/todo';

const api = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

export const signIn = ({ email, password }: Auth) => {
  return api.post('/auth/signin', { email, password });
};
export const signUp = ({ email, password }: Auth) => {
  api.post('/auth/signup', { email, password });
};

export const getTodos = () => api.get('/todos');
export const createTodo = ({ todo }: { todo: string }) => {
  return api.post('/todos', { todo });
};
export const updateTodo = ({ todo, isCompleted, id }: Todo) => {
  return api.put(`todos/${id}`, { todo, isCompleted });
};
export const deleteTodo = ({ id }: { id: number }) => api.delete(`todos/${id}`);

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('access_token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
