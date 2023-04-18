import { useNavigate } from 'react-router-dom';
import FormInput from '../components/form/FormInput';
import useInput from '../hooks/useInput';
import styles from '../assets/scss/components/Form.module.scss';
import { useEffect, useState } from 'react';
import { signIn } from '../api/api';
import { CustomError } from '../types/error';

interface SignInPageProps {
  updateIsAuthenticated: () => void;
}

const SignInPage = ({ updateIsAuthenticated }: SignInPageProps) => {
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
      const { data } = await signIn({ email, password });
      localStorage.setItem('access_token', data['access_token']);
      updateIsAuthenticated();
      navigate('/todo');
    } catch (error: unknown) {
      alert((error as CustomError)?.response?.data.message ?? (error as Error).message);
    }
  };

  return (
    <>
      <h1 className={styles.heading1}>로그인</h1>
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
          data-testid="signin-button"
          disabled={isValidEmail && isValidPassword ? false : true}
        >
          로그인
        </button>
        <button
          className={styles.whiteButton}
          data-testid="signup-button"
          type="button"
          onClick={() => navigate('/signup')}
        >
          회원가입
        </button>
      </form>
    </>
  );
};

export default SignInPage;
