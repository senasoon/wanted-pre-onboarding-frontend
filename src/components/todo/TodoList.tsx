import { useEffect, useState } from 'react';
import { createTodo, getTodos } from '../../api/api';
import TodoItem from './TodoItem';
import { Todo } from '../../types/todo';
import styles from '../../assets/scss/components/Todo.module.scss';
import useInput from '../../hooks/useInput';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { value: todo, setValue: setTodo, onChange: todoChangeHandler } = useInput('');

  const getTodosHandler = async () => {
    const { data } = await getTodos();
    setTodos(data);
  };

  const createTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await createTodo({ todo });
      setTodos([...todos, data]);
      setTodo('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodosHandler();
  }, []);

  return (
    <>
      <h1 className={styles.heading1}>TODO LIST</h1>
      <form onSubmit={createTodoHandler}>
        <label>
          <input className={styles.todoInput} data-testid="new-todo-input" value={todo} onChange={todoChangeHandler} />
        </label>
        <button className={styles.button} data-testid="new-todo-add-button">
          추가
        </button>
      </form>
      <ul>
        {todos?.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
