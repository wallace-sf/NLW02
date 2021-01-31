import React from 'react';

import { Link, RouteChildrenProps } from 'react-router-dom';

import backgroundSecondary from '../../assets/images/background-secondary.svg';
import successCheckIcon from '../../assets/images/icons/success-check-icon.svg';

import './styles.css';

interface StateProps extends Omit<RouteChildrenProps, 'location'> {
  location: {
    state: {
      mainMessage: string;
      subMessage: string;
      goBackLabel: string;
    };
  };
}

const SuccessStep: React.FC<StateProps> = ({ location: { state } }) => {
  return (
    <div id="success-step">
      <div
        className="success-step-content"
        style={{ backgroundImage: `url(${backgroundSecondary})` }}
      >
        <img src={successCheckIcon} alt="Feito" />
        <h1>{state.mainMessage}</h1>
        <h4>{state.subMessage}</h4>
        <Link to="/">{state.goBackLabel}</Link>
      </div>
    </div>
  );
};

export default SuccessStep;
