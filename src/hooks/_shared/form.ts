import { useEffect, useState, ChangeEvent } from "react";

export type FormValidator = (value: string) => string;

export const useInput = (
  initialValue: string,
  validator: FormValidator
): [
  {
    value: string;
    error: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  },
  () => void,
] => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setError(validator(v));
    setValue(v);
  };
  const reset = () => {
    setValue(initialValue);
    setError("");
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return [{ value, error, onChange }, reset];
};
