import { useEffect, useState } from 'react';
import { createTodo, getTodos, deleteTodo, updateTodo } from '../../api/api';
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

  const updateTodoHandler = async ({ todo, isCompleted, id }: Todo) => {
    try {
      const { data } = await updateTodo({ todo, isCompleted, id });
      setTodos((todos) =>
        todos.map((todoItem) =>
          todoItem.id === id ? { ...todoItem, todo: data.todo, isCompleted: data.isCompleted } : todoItem,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodoHandler = async (id: number) => {
    try {
      await deleteTodo({ id });
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodosHandler();
  }, []);

  return (
    <main className={styles.todoList}>
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
          <TodoItem
            key={todo.id}
            {...todo}
            deleteTodoHandler={deleteTodoHandler}
            updateTodoHandler={updateTodoHandler}
          />
        ))}
      </ul>
    </main>
  );
};

export default TodoList;
