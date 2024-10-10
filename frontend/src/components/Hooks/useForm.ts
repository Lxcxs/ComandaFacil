import React from "react";

const types = {
  email: {
    regex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    message: "Preencha um email válido",
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message: "A senha precisa ter 1 caracter maíusculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres.",
  },
  // tel: {
  //   regex: /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/,
  //   message: "Insira uma número de telefone válido."
  // },
}

const useForm = (type: "email" | "password" | null) => {

  const [value, setValue] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  function validate(value: string) {
    if (type === null) return true;

    if (value.length === 0) {
      setError('Preencha um valor.');
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>) {
    if (error) validate(value);
    setValue(value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  }
}

export default useForm;