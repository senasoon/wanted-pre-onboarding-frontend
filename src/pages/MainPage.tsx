import TodoList from '../components/todo/TodoList';
import styles from '../assets/scss/components/Todo.module.scss';

const MainPage = () => {
  return (
    <>
      <h1 className={styles.heading1}>TODO LIST</h1>
      <label>
        <input className={styles.todoInput} data-testid="new-todo-input" />
      </label>
      <button className={styles.button} data-testid="new-todo-add-button">
        추가
      </button>
      <TodoList />
    </>
  );
};

export default MainPage;
