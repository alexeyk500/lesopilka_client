import React from 'react';
import classes from './ButtonEdit.module.css';
import classNames from 'classnames';
import editBtnIco from '../../../img/editBtnIco.svg';

type PropsType = {
  onClick?: () => void;
  customClassName?: string;
  dataTestId?: string;
};

const ButtonEdit: React.FC<PropsType> = ({ onClick, customClassName, dataTestId }) => {
  const customClasses = classNames(customClassName);

  const onClickHandler = () => {
    onClick && onClick();
  };

  return (
    <button
      className={classNames(classes.container, { [customClasses]: customClassName })}
      onClick={onClickHandler}
      data-test-id={dataTestId}
    >
      <img className={classes.editButtonIco} src={editBtnIco} alt="edit" />
    </button>
  );
};

export default ButtonEdit;
