import FormInput from '../components/form/FormInput';
import useInput from '../hooks/useInput';
import styles from '../assets/scss/components/Form.module.scss';

const SignUpPage = () => {
  const { value: email, onChange: emailChangeHandler } = useInput('');
  const { value: password, onChange: passwordChangeHandler } = useInput('');

  return (
    <>
      <h1 className={styles.heading1}>회원가입</h1>
      <form className={styles.form}>
        <FormInput labelText="이메일" id="email" testId="email-input" value={email} onChange={emailChangeHandler} />
        <FormInput
          labelText="비밀번호"
          id="password"
          testId="password-input"
          value={password}
          onChange={passwordChangeHandler}
        />
        <button className={styles.disabledButton} data-testid="signup-button" disabled>
          회원가입
        </button>
      </form>
    </>
  );
};

export default SignUpPage;
