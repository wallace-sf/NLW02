import React, { useEffect, useRef, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  name: string;
}

const TextArea: React.FC<InputProps> = ({ label, name, hint, ...rest }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);

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
    <div className="textarea-block">
      <label htmlFor={name}>
        {label}
        {hint && <span className="hint">{`(${hint})`}</span>}
      </label>
      <textarea
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
