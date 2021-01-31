/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import {
  loadImage,
  getImageOrientation,
} from '../../utils/getImageOrientation';

import LogoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import logoutIcon from '../../assets/images/icons/logout.svg';
import defaultAvatar from '../../assets/images/default-avatar.png';

import './styles.css';

const Home: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);
  const [avatarOrientation, setAvatarOrientation] = useState('landscape');

  useEffect(() => {
    api.get('/connections').then(({ data }) => {
      const { total } = data;

      setTotalConnections(total);
    });

    loadImage('').then(response =>
      setAvatarOrientation(getImageOrientation(response)),
    );
  }, []);

  return (
    <div id="page-home">
      <header>
        <Link to="/profile" className="avatar-container">
          <div className="mask-avatar">
            <img
              src={defaultAvatar}
              className={`${avatarOrientation}`}
              alt="Avatar"
            />
          </div>
          <span>Tiago Luchtenberg</span>
        </Link>
        <button
          type="button"
          className="logout"
          onClick={() => console.log('Logged out!')}
        >
          <img src={logoutIcon} alt="Sair" />
        </button>
      </header>
      <div id="page-home-container" className="container">
        <div className="logo-container">
          <img src={LogoImg} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img
          src={landingImg}
          alt="Plataforma de estudos"
          className="hero-image"
        />
      </div>
      <footer>
        <span className="footer-title">
          Seja bem-vindo. <br />
          <b>O que deseja fazer?</b>
        </span>
        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas
          <img src={purpleHeartIcon} alt="Coração roxo" />
        </span>
        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Estudar" />
            Dar aulas
          </Link>
        </div>
      </footer>
    </div>
  );
};
export default Home;
