import React from 'react';

import logoImg from '../../../assets/images/logo.svg';
import backgroundPrimary from '../../../assets/images/background-primary.svg';

import './styles.css';

interface AuthLayoutProps {
  reverseColumn?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  reverseColumn = false,
}) => {
  return (
    <div id="auth-layout">
      <section className="showcase-container">
        <div
          className="showcase-background"
          style={{
            backgroundImage: `url(${backgroundPrimary})`,
            gridColumnStart: reverseColumn ? 2 : 1,
          }}
        >
          <div className="showcase-background-content">
            <img src={logoImg} alt="Logo" />
            <h2>Sua plataforma de estudos online.</h2>
          </div>
        </div>
      </section>
      <main
        className="auth-layout-container"
        style={{ gridColumnStart: reverseColumn ? 1 : 2 }}
      >
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
