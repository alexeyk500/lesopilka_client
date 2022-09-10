import React from 'react';
import classes from '../LoginButton/LoginButton.module.css';
import { serverApi } from '../../../api/serverApi';

const MenuButton: React.FC = () => {
  const onClick = async () => {
    const response = await serverApi.checkToken('123');
    console.log(response);
  };

  return (
    <div className={classes.container} onClick={onClick}>
      Меню
    </div>
  );
};

export default MenuButton;
