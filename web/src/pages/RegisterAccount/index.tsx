import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AuthLayout from '../_layouts/auth';
import GoBackHeader from '../../components/GoBackHeader';
import InputAuth from '../../components/InputAuth';
import SubmitButton from '../../components/SubmitButton';

import viewPassword from '../../assets/images/icons/view-password.svg';
import hidePassword from '../../assets/images/icons/hide-password.svg';

import './styles.css';

const RegisterAccount: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const isDisabled = !(
    name.length > 0 &&
    lastName.length > 0 &&
    email.length > 0 &&
    password.length > 0
  );

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    return history.push('/success', {
      mainMessage: 'Cadastro concluído!',
      subMessage:
        'Agora você faz parte da plataforma da Proffy.\n Tenha uma ótima experiência.',
      goBackLabel: 'Fazer login',
    });
  };

  return (
    <AuthLayout reverseColumn>
      <div id="register-account-container">
        <GoBackHeader GoBackRoute="/" />
        <div className="register-account-content">
          <h1>Cadastro</h1>
          <h4>Preencha os dados abaixo para começar.</h4>
          <form onSubmit={handleOnSubmit}>
            <InputAuth
              id="name"
              name="name"
              type="text"
              value={name}
              className="rounded-top"
              label="Nome"
              onChange={e => setName(e.target.value)}
            />
            <InputAuth
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              label="Sobrenome"
              onChange={e => setLastName(e.target.value)}
            />
            <InputAuth
              id="email"
              name="name"
              type="email"
              value={email}
              label="E-mail"
              onChange={e => setEmail(e.target.value)}
            />
            <InputAuth
              id="password"
              name="password"
              type={isPasswordHidden ? 'password' : 'text'}
              value={password}
              className="rounded-bottom"
              label="Senha"
              onChange={e => setPassword(e.target.value)}
            >
              <button
                type="button"
                onClick={() => setIsPasswordHidden(!isPasswordHidden)}
              >
                {isPasswordHidden ? (
                  <img src={viewPassword} alt="Visualizar senha" />
                ) : (
                  <img src={hidePassword} alt="Esconder senha" />
                )}
              </button>
            </InputAuth>
            <SubmitButton
              label="Concluir cadastro"
              className={`${
                name.length > 0 &&
                lastName.length > 0 &&
                email.length > 0 &&
                password.length > 0 &&
                'filled'
              }`}
              disabled={isDisabled}
            />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterAccount;
