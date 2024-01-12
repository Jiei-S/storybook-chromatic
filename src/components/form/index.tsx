import { ChangeEvent, FC } from "react";

export type FormProps = {
  disabled: boolean;
  label: string;
  value: string;
  error: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

const Form: FC<FormProps> = ({ disabled, label, value, error, onChange, onSubmit }) => (
  <form>
    <input type="text" value={value} onChange={onChange} aria-label={label} />
    <div style={{ color: "red" }}>{error}</div>
    <button disabled={disabled} type="submit" onClick={onSubmit}>
      Submit
    </button>
  </form>
);

export default Form;
