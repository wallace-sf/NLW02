import React, { CSSProperties } from 'react';
import ld from 'lodash';

import { Link } from 'react-router-dom';

import logoHeader from '../../assets/images/logoHeader.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderProps {
  name: string;
  description?: string;
  headerContentStyle?: CSSProperties;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  name = '',
  description = '',
  children,
  headerContentStyle,
}) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <div className="top-bar">
          <Link to="/home">
            <img src={backIcon} alt="Voltar" />
          </Link>
          <span className="page-name">{name}</span>
          <img src={logoHeader} alt="Logo" />
        </div>
      </div>

      <div className="header-content" style={headerContentStyle}>
        {ld.isEmpty(children) ? <p>{description}</p> : children}
      </div>
    </header>
  );
};

export default PageHeader;
