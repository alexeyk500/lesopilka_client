import React from 'react';
import classes from './ButtonEdit.module.css';
import classNames from 'classnames';
import editBtnIco from '../../../img/editBtnIco.svg';

type PropsType = {
  onClick?: () => void;
  customClassName?: string;
};

const ButtonEdit: React.FC<PropsType> = ({ onClick, customClassName }) => {
  const customClasses = classNames(customClassName);

  const onClickHandler = () => {
    onClick && onClick();
  };

  return (
    <button className={classNames(classes.container, { [customClasses]: customClassName })} onClick={onClickHandler}>
      <img className={classes.editButtonIco} src={editBtnIco} alt="edit" />
    </button>
  );
};

export default ButtonEdit;
