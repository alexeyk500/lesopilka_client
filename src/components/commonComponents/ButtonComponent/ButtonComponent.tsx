import React from 'react';
import classes from './ButtonComponent.module.css';
import classNames from 'classnames';

export enum ButtonType {
  DEFAULT,
  SECONDARY,
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

  const otherClasses = classNames(otherProps.className);

  return (
    <button
      className={classNames(classes.container, {
        [classes.default]: buttonType === ButtonType.DEFAULT,
        [classes.secondary]: buttonType === ButtonType.SECONDARY,
        [otherClasses]: otherProps.className,
      })}
      onClick={onClickHandler}
      {...otherProps}
    >
      {title}
    </button>
  );
};

export default ButtonComponent;
