import React from 'react';
import classes from './ButtonComponent.module.css';
import classNames from 'classnames';

export enum ButtonType {
  DEFAULT,
  SECONDARY,
  FILTER,
  RED,
  GREEN,
}

type PropsType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  buttonType?: ButtonType;
  onClick?: () => void;
};

const ButtonComponent: React.FC<PropsType> = ({
  title = 'Ok',
  buttonType = ButtonType.DEFAULT,
  onClick,
  ...otherProps
}) => {
  const onClickHandler = () => {
    onClick && onClick();
  };

  return (
    <button
      className={classNames(classes.container, {
        [classes.default]: buttonType === ButtonType.DEFAULT,
        [classes.secondary]: buttonType === ButtonType.SECONDARY,
        [classes.filter]: buttonType === ButtonType.FILTER,
        [classes.red]: buttonType === ButtonType.RED,
        [classes.green]: buttonType === ButtonType.GREEN,
      })}
      onClick={onClickHandler}
      {...otherProps}
    >
      {title}
      {buttonType === ButtonType.FILTER && (
        <div className={classes.closeFilter} onClick={onClickHandler}>
          &times;
        </div>
      )}
    </button>
  );
};

export default ButtonComponent;
