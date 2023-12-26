import { useEffect, useState } from "react";

export enum FormInputType {
  TEXT = "text",
  SELECT = "select",
}

export type FormValidator = (value: string) => string;

export const useInput = (
  initialValue: string,
  validator: FormValidator
): [
  {
    value: string;
    error: string;
    onChange: (value: string) => void;
  },
  () => void,
] => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>("");
  const onChange = (v: string) => {
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
