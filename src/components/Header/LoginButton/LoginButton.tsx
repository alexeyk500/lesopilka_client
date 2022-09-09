import React from 'react';
import classes from './LoginButton.module.css';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorUser } from '../../../store/userSlice';
import { showPortalPopUp } from '../../PortalPopUp/PortalPopUp';
import LoginForm from '../LoginForm/LoginForm';
import RegistrationButton from '../LoginForm/RegistrationButton/RegistrationButton';
import ForgotPasswordButton from '../LoginForm/ForgotPasswordButton/ForgotPasswordButton';

const LoginButton: React.FC = () => {
  const user = useAppSelector(selectorUser);

  const onClosePopUp = (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const email = response.get('email');
      const password = response.get('password');
      console.log('email =', email, '   password =', password);
    } else {
      console.log('response =', response);
    }
  };

  const onClickLogin = () => {
    if (!user) {
      showPortalPopUp({
        popUpContent: <LoginForm />,
        onClosePopUp: onClosePopUp,
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
