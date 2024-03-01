import React from 'react';
import { InputEl } from './styles';

interface FormProps {
  id?: string | null;
  type: string;
  placeholder: string;
  name: string;
  value?: string;
  error?: string | null;
  required: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const Input = ({ placeholder, required, type, name, value, error, onChange, onBlur }: FormProps) => {
  return (
    <div>
      <InputEl
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
       />
      {error && <p>{error}</p>}
    </div>
  );
};

export default Input;