import { useState } from 'react';
import styles from '../../assets/scss/components/Todo.module.scss';
import { Todo } from '../../types/todo';

interface TodoItemProps extends Todo {
  deleteTodoHandler: (id: number) => void;
  updateTodoHandler: ({ id, todo, isCompleted }: Todo) => void;
}

const TodoItem = ({ id, todo, isCompleted, deleteTodoHandler, updateTodoHandler }: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTodo, setNewTodo] = useState(todo);

  const todoChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const toggleEditHandler = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <li className={styles.todoItem}>
      {!isEdit && (
        <>
          <div>
            <label>
              <input
                className={styles.checkBox}
                type="checkbox"
                defaultChecked={isCompleted}
                onChange={() => updateTodoHandler({ id, todo, isCompleted: !isCompleted })}
              />
            </label>
            <span>{todo}</span>
          </div>
          <div>
            <button className={styles.button} data-testid="modify-button" onClick={toggleEditHandler}>
              수정
            </button>
            <button
              className={styles.button}
              data-testid="delete-button"
              onClick={() => {
                if (window.confirm('정말 삭제하시겠습니까?')) deleteTodoHandler(id);
              }}
            >
              삭제
            </button>
          </div>
        </>
      )}
      {isEdit && (
        <>
          <label>
            <input
              className={styles.editInput}
              data-testid="modify-input"
              defaultValue={todo}
              onChange={todoChangeHandler}
            />
          </label>
          <button
            className={styles.button}
            data-testid="submit-button"
            onClick={() => {
              updateTodoHandler({ id, todo: newTodo, isCompleted });
              setIsEdit(false);
            }}
          >
            제출
          </button>
          <button className={styles.button} data-testid="cancel-button" onClick={toggleEditHandler}>
            취소
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
