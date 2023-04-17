import { useState, useEffect, useRef } from 'react';
import styles from '../../assets/scss/components/Todo.module.scss';
import { Todo } from '../../types/todo';
import useInput from '../../hooks/useInput';
import { updateTodo } from '../../api/api';

const TodoItem = ({ id, todo: todoProps, isCompleted: isCompletedProps, userId }: Todo) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isCompleted, setIsCompleted] = useState(isCompletedProps);
  const { value: todo, setValue: setTodo, onChange: todoChangeHandler } = useInput(todoProps);

  const toggleEditHandler = () => {
    setIsEdit((prev) => !prev);
  };

  const updateTodoHandler = async () => {
    try {
      const { data } = await updateTodo({ todo, isCompleted, id });
      setIsEdit(false);
      setTodo(data.todo);
    } catch (error) {
      console.log(error);
    }
  };

  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) updateTodoHandler();
    else didMount.current = true;
  }, [isCompleted]);

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
            <button className={styles.button} data-testid="delete-button">
              삭제
            </button>
          </div>
        </>
      )}
      {isEdit && (
        <>
          <label>
            <input className={styles.editInput} data-testid="modify-input" value={todo} onChange={todoChangeHandler} />
          </label>
          <button className={styles.button} data-testid="submit-button" onClick={updateTodoHandler}>
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
