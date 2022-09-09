import React from 'react';
import classes from './Header.module.css';
import LoginButton from './LoginButton/LoginButton';
import MenuButton from './MenuButton/MenuButton';

const Header: React.FC = () => {
  return (
    <div className={classes.container}>
      <MenuButton />
      <LoginButton />
    </div>
  );
};

export default Header;
