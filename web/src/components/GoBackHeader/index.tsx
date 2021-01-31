import React from 'react';
import { Link } from 'react-router-dom';

import gobackIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface GoBackProps {
  GoBackRoute: string;
}

const GoBackHeader: React.FC<GoBackProps> = ({ GoBackRoute }) => {
  return (
    <header id="goback-container">
      <Link to={GoBackRoute}>
        <img src={gobackIcon} alt="Voltar" />
      </Link>
    </header>
  );
};

export default GoBackHeader;
