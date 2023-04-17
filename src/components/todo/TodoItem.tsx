import { useState, useEffect, useRef } from 'react';
import styles from '../../assets/scss/components/Todo.module.scss';
import { Todo } from '../../types/todo';

interface TodoItemProps extends Todo {
  deleteTodoHandler: (id: number) => void;
  updateTodoHandler: ({ id, todo, isCompleted }: Todo) => void;
}

const TodoItem = ({
  id,
  todo: todoProps,
  isCompleted: isCompletedProps,
  userId,
  deleteTodoHandler,
  updateTodoHandler,
}: TodoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isCompleted, setIsCompleted] = useState(isCompletedProps);
  const [todo, setTodo] = useState(todoProps);
  const [newTodo, setNewTodo] = useState(todoProps);

  const todoChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const toggleEditHandler = () => {
    setIsEdit((prev) => !prev);
  };

  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) updateTodoHandler({ id, todo, isCompleted });
    else didMount.current = true;
  }, [isCompleted]);

  useEffect(() => {
    setTodo(todoProps);
    setNewTodo(todoProps);
  }, [todoProps]);

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
                onChange={todoChangeHandler}
                onClick={() => setIsCompleted((prev) => !prev)}
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
              value={newTodo}
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
          <button
            className={styles.button}
            data-testid="cancel-button"
            onClick={() => {
              setNewTodo(todo);
              toggleEditHandler();
            }}
          >
            취소
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
