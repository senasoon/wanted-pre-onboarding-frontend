import { useEffect, useState } from 'react';
import { getTodos } from '../../api/api';
import TodoItem from './TodoItem';
import { Todo } from '../../types/todo';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodosHandler = async () => {
    const { data } = await getTodos();
    setTodos(data);
  };

  useEffect(() => {
    getTodosHandler();
  }, []);

  return (
    <ul>
      {todos?.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodoList;
