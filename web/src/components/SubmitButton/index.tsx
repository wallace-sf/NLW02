import React, { ButtonHTMLAttributes } from 'react';

import './styles.css';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  className,
  ...rest
}) => {
  return (
    <button type="submit" className={`submit-button ${className}`} {...rest}>
      {label}
    </button>
  );
};

export default SubmitButton;
