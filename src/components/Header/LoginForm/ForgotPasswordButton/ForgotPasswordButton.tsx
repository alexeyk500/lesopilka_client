import React from 'react';
import classes from './ForgotPasswordButton.module.css';
import ButtonComponent from '../../../commonComponents/ButtonComponent/ButtonComponent';

const ForgotPasswordButton: React.FC = () => {
  const onForgotClick = () => {
    console.log('onForgotClick');
  };

  return (
    <ButtonComponent className={classes.forgotBtn} title={'Не помню пароль'} onClick={onForgotClick} type="button" />
  );
};

export default ForgotPasswordButton;
