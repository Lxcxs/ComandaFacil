import React from 'react';
import { InputEl, InputField } from './styles';

interface FormProps {
  label: string;
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

const Input = ({ label, placeholder, required, type, name, value, error, onChange, onBlur }: FormProps) => {
  return (
    <InputField>
      <label>{label}</label>
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
    </InputField>
  );
};

export default Input;