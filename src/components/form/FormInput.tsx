import styles from '../../assets/scss/components/Form.module.scss';

interface FormInputProps {
  labelText: string;
  id: string;
  testId: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({ labelText, id, testId, ...restProps }: FormInputProps) => {
  return (
    <div className={styles.inputBox}>
      <label className={styles.label} htmlFor={id}>
        {labelText}
      </label>
      <input className={styles.input} id={id} data-testid={testId} {...restProps} />
    </div>
  );
};

export default FormInput;
