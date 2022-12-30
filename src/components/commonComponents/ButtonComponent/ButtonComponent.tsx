import React from 'react';
import classes from './ButtonComponent.module.css';
import classNames from 'classnames';
import { showErrorPopUp } from '../../InfoAndErrorMessageForm/InfoAndErrorMessageForm';

export enum ButtonType {
  DEFAULT,
  SECONDARY,
  FILTER,
  RED,
  GREEN,
  GRAY,
}

type PropsType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  buttonType?: ButtonType;
  disabled?: boolean;
  disabledPopUpMessage?: string;
  onClick?: () => void;
};

const ButtonComponent: React.FC<PropsType> = ({
  title = 'Ok',
  buttonType = ButtonType.DEFAULT,
  onClick,
  disabled = false,
  disabledPopUpMessage,
  ...otherProps
}) => {
  const onClickHandler = () => {
    if (disabled && disabledPopUpMessage) {
      showErrorPopUp(disabledPopUpMessage);
    } else {
      onClick && onClick();
    }
  };

  return (
    <button
      className={classNames(classes.container, {
        [classes.default]: buttonType === ButtonType.DEFAULT && !disabled,
        [classes.secondary]: buttonType === ButtonType.SECONDARY && !disabled,
        [classes.filter]: buttonType === ButtonType.FILTER && !disabled,
        [classes.red]: buttonType === ButtonType.RED && !disabled,
        [classes.green]: buttonType === ButtonType.GREEN && !disabled,
        [classes.gray]: buttonType === ButtonType.GRAY && !disabled,
        [classes.disabled]: disabled,
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
