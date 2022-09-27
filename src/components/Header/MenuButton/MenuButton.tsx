import classes from './MenuButton.module.css';
import React, { useState } from 'react';
import menuButton from './../../../img/menueButton.svg';
import MenuContent from './MenuContent/MenuContent';

const MenuButton: React.FC = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const onClick = async () => {
    setIsShowMenu((prev) => !prev);
  };

  return (
    <>
      <button className={classes.container} onClick={onClick}>
        <img src={menuButton} alt="menu button" />
      </button>
      {isShowMenu && <MenuContent />}
    </>
  );
};

export default MenuButton;
