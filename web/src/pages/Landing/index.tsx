import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthLayout from '../_layouts/auth';
import InputAuth from '../../components/InputAuth';
import SubmitButton from '../../components/SubmitButton';

import viewPassword from '../../assets/images/icons/view-password.svg';
import hidePassword from '../../assets/images/icons/hide-password.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

const Landing: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    return history.push('/home');
  };

  return (
    <AuthLayout>
      <header>
        <h1>Fazer login</h1>
      </header>
      <form onSubmit={handleOnSubmit}>
        <div className="input-group">
          <InputAuth
            id="email"
            name="email"
            type="text"
            label="E-mail"
            className="rounded-top"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="input-block-login">
            <InputAuth
              id="password"
              name="password"
              label="Senha"
              type={isPasswordHidden ? 'password' : 'text'}
              className="rounded-bottom"
              value={password}
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
          </div>
        </div>
        <div className="options">
          <div className="checkbox">
            <label htmlFor="rememberMe" className="checkbox-label">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
              />
              <span className="checkbox-custom" />
            </label>
            <span>Lembrar-me</span>
          </div>
          <Link to="/forgot-password">Esqueci minha senha</Link>
        </div>
        <SubmitButton
          label="Entrar"
          className={`${email.length > 0 && password.length > 0 && 'filled'}`}
          disabled={!(email.length > 0 && password.length > 0)}
        />
      </form>
      <footer className="footer-login">
        <section className="register-link">
          <span>Não tem conta?</span>
          <Link to="/register">Cadastre-se</Link>
        </section>
        <section className="free-message">
          <span>É de graça</span>
          <img src={purpleHeartIcon} alt="Coração roxo" />
        </section>
      </footer>
    </AuthLayout>
  );
};

export default Landing;
