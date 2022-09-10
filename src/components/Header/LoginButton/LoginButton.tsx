import React from 'react';
import classes from './LoginButton.module.css';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorUser } from '../../../store/userSlice';
import { showPortalPopUp } from '../../PortalPopUp/PortalPopUp';
import LoginForm from './LoginForm/LoginForm';
import ButtonComponent, { ButtonType } from '../../commonComponents/ButtonComponent/ButtonComponent';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import ConfirmEmailForm from './ConfirmEmailForm/ConfirmEmailForm';

const LoginButton: React.FC = () => {
  const user = useAppSelector(selectorUser);

  const onCloseLoginPopUp = (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const email = response.get('email');
      const password = response.get('password');
      console.log('onCloseLoginPopUp: email =', email, '   password =', password);
    }
  };

  const onCloseRegistrationPopUp = (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const email = response.get('email')!.toString();
      const password = response.get('password')!.toString();
      console.log('onCloseRegistrationPopUp: email =', email, '   password =', password);
      if (email && password) {
        showPortalPopUp({
          popUpContent: <ConfirmEmailForm email={email} />,
          titleConfirmBtn: 'Понятно',
          oneCenterConfirmBtn: true,
          customClassBottomBtnGroup: classes.oneCenterBtn,
        });
      } else {
        showPortalPopUp({
          popUpContent: <h5>Что-то пошло не так</h5>,
          titleConfirmBtn: 'Понятно',
          oneCenterConfirmBtn: true,
        });
      }
    }
  };

  const RegistrationButton: React.FC = () => {
    const onRegisterClick = () => {
      showPortalPopUp({
        popUpContent: <RegistrationForm />,
        onClosePopUp: onCloseRegistrationPopUp,
        titleConfirmBtn: 'Регистрация',
      });
    };
    return (
      <ButtonComponent title={'Регистрация'} buttonType={ButtonType.SECONDARY} onClick={onRegisterClick} type="reset" />
    );
  };

  const ForgotPasswordButton: React.FC = () => {
    const onForgotClick = () => {
      showPortalPopUp({
        popUpContent: <h1>Забыл пароль</h1>,
      });
    };
    return (
      <ButtonComponent className={classes.forgotBtn} title={'Не помню пароль'} onClick={onForgotClick} type="reset" />
    );
  };

  const onClickLogin = () => {
    if (!user) {
      showPortalPopUp({
        popUpContent: <LoginForm />,
        onClosePopUp: onCloseLoginPopUp,
        hideCancelBottomBtn: true,
        customBottomBtn: <RegistrationButton />,
        customBottomBtnTwo: <ForgotPasswordButton />,
        customClassBottomBtnGroup: classes.customClassBottomBtnGroup,
      });
    }
  };

  return (
    <div className={classes.container} onClick={onClickLogin}>
      {user ? user.name : 'Войти'}
    </div>
  );
};

export default LoginButton;
