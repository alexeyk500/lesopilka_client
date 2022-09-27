import React from 'react';
import classes from './Logo.module.css';
import { useNavigate } from 'react-router-dom';

const Logo: React.FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/');
  };

  return (
    <div className={classes.container} onClick={onClick}>
      lesopilka24.ru
    </div>
  );
};

export default Logo;
