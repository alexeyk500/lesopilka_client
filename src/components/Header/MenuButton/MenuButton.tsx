import classes from './MenuButton.module.css';
import React, { useRef, useState } from 'react';
import menuButton from './../../../img/menueButton.svg';
import MenuContent from './MenuContent/MenuContent';
import useClickOutsideElement from '../../../hooks/useClickOutsideElement';

const MenuButton: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const exceptionRef = useRef<HTMLButtonElement>(null);
  const [isShowMenu, setIsShowMenu] = useState(false);

  useClickOutsideElement(
    ref,
    () => {
      setIsShowMenu(false);
    },
    exceptionRef
  );

  const onClick = async () => {
    setIsShowMenu((prev) => !prev);
  };

  return (
    <>
      <button ref={exceptionRef} className={classes.container} onClick={onClick}>
        <img src={menuButton} alt="menu button" />
      </button>
      {isShowMenu && <MenuContent ref={ref} closeMenuContent={onClick} />}
    </>
  );
};

export default MenuButton;
