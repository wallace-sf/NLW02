import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

// import { Container } from './styles';

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars0.githubusercontent.com/u/7969483?s=460&u=6bc5c02f2342e5446fa637dad296b88634ab1a1c&v=4"
          alt="Wallace Ferreira"
        />
        <div>
          <strong>Wallace Ferreira</strong>
          <span>Desenvolvedor</span>
        </div>
      </header>
      <p>
        Entusiasta das melhores tecnologias de química avançada.
        <br />
        <br />
        Apaixonado por explodir coisas em laboratório e por mudar a vida das
        pessoas através de experiências. Mais de 200.000 pessoas já passaram por
        uma das minhas explosões.
      </p>
      <footer>
        <p>
          Preço/Hora
          <strong>R$ 20,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
