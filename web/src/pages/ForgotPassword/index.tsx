import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AuthLayout from '../_layouts/auth';
import GoBackHeader from '../../components/GoBackHeader';
import InputAuth from '../../components/InputAuth';
import SubmitButton from '../../components/SubmitButton';

import './styles.css';

const ForgotPassword: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    return history.push('/success', {
      mainMessage: 'Redefinição enviada!',
      subMessage:
        'Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.',
      goBackLabel: 'Voltar ao login',
    });
  };

  return (
    <AuthLayout reverseColumn>
      <div id="forgot-password-container">
        <GoBackHeader GoBackRoute="/" />
        <div className="forgot-password-content">
          <h1>Eita, esqueceu sua senha?</h1>
          <h4>Não esquenta, vamos dar um jeito nisso.</h4>
          <form onSubmit={handleOnSubmit}>
            <InputAuth
              id="email"
              name="email"
              type="email"
              value={email}
              className="rounded"
              label="E-mail"
              onChange={e => setEmail(e.target.value)}
            />
            <SubmitButton
              label="Entrar"
              className={`${email.length > 0 && 'filled'}`}
              disabled={!(email.length > 0)}
            />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
