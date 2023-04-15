import { useState } from 'react';
import styles from '../../assets/scss/components/Todo.module.scss';

const TodoItem = () => {
  const [isEdit, setIsEdit] = useState(false);

  const toggleEditHandler = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <li className={styles.todoItem}>
      {!isEdit && (
        <>
          <div>
            <label>
              <input className={styles.checkBox} type="checkbox" />
            </label>
            <span>할일</span>
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
            <input className={styles.editInput} data-testid="modify-input" />
          </label>
          <button className={styles.button} data-testid="submit-button">
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