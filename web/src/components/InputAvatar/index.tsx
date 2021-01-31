import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useField } from '@unform/core';

import {
  loadImage,
  getImageOrientation,
} from '../../utils/getImageOrientation';

import defaultAvatar from '../../assets/images/default-avatar.png';
import cameraIcon from '../../assets/images/icons/camera.svg';

import './styles.css';

interface InputAvatarProps {
  name: string;
}

const InputAvatar: React.FC<InputAvatarProps> = ({ name }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  const [avatarOrientation, setAvatarOrientation] = useState('landscape');
  const [avatar, setAvatar] = useState(defaultValue);

  const handleChange = useCallback(async e => {
    const data = new FormData();
    const file = e.target.files[0];

    data.append('file', file);

    const previewURL = URL.createObjectURL(file);

    setAvatar(previewURL);
  }, []);

  useEffect(() => {
    if (avatar) {
      loadImage(avatar).then(response => {
        setAvatarOrientation(getImageOrientation(response));
      });
    }

    setAvatarOrientation('landscape');
  }, [avatar]);

  useEffect(() => {
    if (inputRef.current !== null) {
      registerField({
        name: fieldName,
        path: 'value',
        ref: inputRef.current,
        clearValue(ref: HTMLInputElement) {
          ref.value = '';
          setAvatar('');
        },
      });
    }
  }, [fieldName, registerField, inputRef]);

  return (
    <section className="avatar">
      <div className="mask-avatar">
        <img
          src={avatar || defaultAvatar}
          alt="Avatar"
          className={`${avatarOrientation}`}
        />
      </div>
      <label htmlFor="avatar">
        <input
          type="file"
          name={name}
          id={name}
          accept="image/*"
          onChange={handleChange}
        />
        <input type="hidden" ref={inputRef} defaultValue={avatar} />
        <span className="avatar-button">
          <img src={cameraIcon} alt="Trocar foto de perfil" />
        </span>
      </label>
    </section>
  );
};

export default InputAvatar;
