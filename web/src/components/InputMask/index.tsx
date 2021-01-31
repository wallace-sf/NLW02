import React, { useRef, useEffect, useState, CSSProperties } from 'react';
import { useField } from '@unform/core';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';

import '../Input/styles.css';

interface InputMaskProps extends MaskedInputProps {
  label: string;
  name: string;
  mask?: Array<string | RegExp>;
  containerStyle?: CSSProperties;
  fnMask?: (phoneInput: string) => Array<string | RegExp>;
}

const InputMask: React.FC<InputMaskProps> = ({
  label,
  name,
  mask,
  containerStyle,
  fnMask,
  ...rest
}) => {
  const inputRef = useRef<MaskedInput>(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  const [inputMaskValue, setInputMaskValue] = useState(defaultValue);

  useEffect(() => {
    if (inputRef.current !== null) {
      registerField({
        name: fieldName,
        path: 'value',
        ref: inputRef.current.inputElement,
      });
    }
  }, [fieldName, registerField, inputRef]);

  return (
    <div className="input-block" style={containerStyle}>
      <label htmlFor={name}>{label}</label>
      <MaskedInput
        id={fieldName}
        ref={inputRef}
        defaultValue={inputMaskValue}
        onChange={e => setInputMaskValue(e.currentTarget.value)}
        mask={fnMask ? fnMask(inputMaskValue) : mask}
        {...rest}
      />
    </div>
  );
};

export default InputMask;
