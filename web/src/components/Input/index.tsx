import React, { useRef, useEffect, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    if (inputRef.current !== null) {
      registerField({
        name: fieldName,
        path: 'value',
        ref: inputRef.current,
      });
    }
  }, [fieldName, registerField, inputRef]);

  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span>{error}</span>}
    </div>
  );
};

export default Input;
