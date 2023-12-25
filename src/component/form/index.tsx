import { FC } from "react";
import { FormInputType } from "../../hook/_shared/form";

export type FormInputProps = {
  label: string;
  value: string;
  type: FormInputType;
  options?: string[];
  error: string;
  onChange: (value: string) => void;
};

type Props = {
  disabled: boolean;
  inputs: FormInputProps[];
  onSubmit: () => void;
};

const Form: FC<Props> = ({ disabled, inputs, onSubmit }) => (
  <form>
    {inputs.map((input) => (
      <div key={input.label}>
        <label htmlFor={input.label}>{input.label}</label>
        {input.type === FormInputType.TEXT && (
          <input
            type={input.type}
            name={input.label}
            value={input.value}
            onChange={(e) => input.onChange(e.target.value)}
          />
        )}
        {input.type === FormInputType.SELECT && (
          <select name={input.label} value={input.value} onChange={(e) => input.onChange(e.target.value)}>
            {(input.options || []).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        <div>{input.error}</div>
      </div>
    ))}
    <button disabled={disabled} type="submit" onClick={onSubmit}>
      Submit
    </button>
  </form>
);

export default Form;
