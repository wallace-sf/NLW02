import React, { SelectHTMLAttributes, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import shortId from 'shortid';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options = [],
  ...rest
}) => {
  const inputRef = useRef<HTMLSelectElement>(null);

  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    });
  }, [fieldName, registerField, inputRef]);

  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      >
        <option disabled value="">
          Selecione uma opção
        </option>
        {options.map(option => (
          <option key={shortId()} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
