import FormInput from '../components/form/FormInput';
import useInput from '../hooks/useInput';
import styles from '../assets/scss/components/Form.module.scss';
import { useEffect, useState } from 'react';
import { signUp } from '../api/api';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { value: email, onChange: emailChangeHandler } = useInput('');
  const { value: password, onChange: passwordChangeHandler } = useInput('');

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  useEffect(() => {
    email.includes('@') && email.includes('.') ? setIsValidEmail(true) : setIsValidEmail(false);
  }, [email]);

  useEffect(() => {
    password.length >= 8 ? setIsValidPassword(true) : setIsValidPassword(false);
  }, [password]);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp({ email, password });
      alert('회원가입이 완료되었습니다.');
      navigate('/signin');
    } catch (error: any) {
      alert(error.response.data.message ?? error.message);
    }
  };

  return (
    <>
      <h1 className={styles.heading1}>회원가입</h1>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <FormInput
          labelText="이메일"
          id="email"
          testId="email-input"
          value={email}
          onChange={emailChangeHandler}
          placeholder="example@example.com"
        />
        <FormInput
          labelText="비밀번호"
          id="password"
          testId="password-input"
          value={password}
          onChange={passwordChangeHandler}
          placeholder="8자 이상"
          type="password"
          autoComplete="off"
        />
        <button
          className={isValidEmail && isValidPassword ? styles.activeButton : styles.disabledButton}
          data-testid="signup-button"
          disabled={isValidEmail && isValidPassword ? false : true}
        >
          회원가입
        </button>
      </form>
    </>
  );
};

export default SignUpPage;
