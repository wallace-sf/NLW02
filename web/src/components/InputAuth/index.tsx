import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputAuthProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
}

const InputAuth: React.FC<InputAuthProps> = ({
  id,
  label,
  value,
  children,
  ...rest
}) => {
  return (
    <div className="input-block-auth">
      <input id={id} value={value} {...rest} />
      <label htmlFor={id} className={`${value.length > 0 && 'valid'}`}>
        {label}
      </label>
      {children}
    </div>
  );
};

export default InputAuth;
