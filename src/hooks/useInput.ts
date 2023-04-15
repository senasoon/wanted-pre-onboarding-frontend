import { useCallback, useState } from 'react';

const useInput = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  }, []);

  return { value, onChange };
};

export default useInput;
