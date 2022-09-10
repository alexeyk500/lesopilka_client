import React from 'react';
import classes from './LoginButton.module.css';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorUser } from '../../../store/userSlice';
import { showPortalPopUp } from '../../PortalPopUp/PortalPopUp';
import LoginForm from './LoginForm/LoginForm';
import ButtonComponent, { ButtonType } from '../../commonComponents/ButtonComponent/ButtonComponent';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import ConfirmEmailForm from './ConfirmEmailForm/ConfirmEmailForm';
import { serverApi } from '../../../api/serverApi';

const LoginButton: React.FC = () => {
  const user = useAppSelector(selectorUser);

  const onCloseLoginPopUp = (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const email = response.get('email');
      const password = response.get('password');
      console.log('onCloseLoginPopUp: email =', email, '   password =', password);
    }
  };

  const onCloseRegistrationPopUp = async (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const email = response.get('email')!.toString();
      const password = response.get('password')!.toString();
      if (email && password) {
        try {
          await serverApi.sendConfirmationEmail(email, password);
          showPortalPopUp({
            popUpContent: <ConfirmEmailForm email={email} />,
            titleConfirmBtn: 'Понятно',
            oneCenterConfirmBtn: true,
            customClassBottomBtnGroup: classes.oneCenterBtn,
          });
        } catch (e: any) {
          showPortalPopUp({
            popUpContent: (
              <>
                <h3 style={{ color: '#4A90E2', marginTop: 32 }}>{`${email} - Ошибка регистрации`}</h3>
                <br />
                {e.response.data.message && <h4 style={{ color: '#FF0000' }}>{e.response.data.message}</h4>}
              </>
            ),
            titleConfirmBtn: 'Понятно',
            oneCenterConfirmBtn: true,
          });
        }
      } else {
        showPortalPopUp({
          popUpContent: <h3>Что-то пошло не так</h3>,
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
