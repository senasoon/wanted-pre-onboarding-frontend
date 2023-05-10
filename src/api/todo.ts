import { Todo } from '../types/todo';
import { api } from './instance';

export const getTodos = () => api.get('/todos');

export const createTodo = ({ todo }: { todo: string }) => {
  return api.post('/todos', { todo });
};

export const updateTodo = ({ todo, isCompleted, id }: Todo) => {
  return api.put(`todos/${id}`, { todo, isCompleted });
};

export const deleteTodo = ({ id }: { id: number }) => api.delete(`todos/${id}`);
