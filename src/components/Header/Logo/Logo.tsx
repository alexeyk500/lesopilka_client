import React from 'react';
import classes from './Logo.module.css';
import { useNavigate } from 'react-router-dom';
import { PageEnum } from '../../AppRouter/AppRouter';

const Logo: React.FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(PageEnum.MainPage);
  };

  return (
    <div className={classes.container} onClick={onClick}>
      lesopilka24.ru
    </div>
  );
};

export default Logo;
