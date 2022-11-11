import React, { useRef } from 'react';
import classes from './LoginButton.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { resetUser, selectorUser, userLoginByPasswordThunk } from '../../../store/userSlice';
import { PopupRef, showPortalPopUp } from '../../PortalPopUp/PortalPopUp';
import LoginForm from './LoginForm/LoginForm';
import ButtonComponent, { ButtonType } from '../../commonComponents/ButtonComponent/ButtonComponent';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import ConfirmEmailForm from './ConfirmEmailForm/ConfirmEmailForm';
import { serverApi } from '../../../api/serverApi';
import EmailInputForm from './EmailInputForm/EmailInputForm';
import ConfirmSendingPasswordRecoveryCodeForm from './ConfirmSendingPasswordRecoveryCodeForm/ConfirmSendingPasswordRecoveryCodeForm';
import EnterCodeForgotPasswordForm from './EnterCodeForgotPasswordForm/EnterCodeForgotPasswordForm';
import { showErrorPopUp, showPreloaderPopUp } from '../../InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import classNames from 'classnames';
import {useNavigate} from "react-router-dom";

const LoginButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectorUser);
  const preloaderPopUpRef = useRef<PopupRef | null>(null);

  const onCloseLoginPopUp = async (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const email = response.get('email')!.toString();
      const password = response.get('password')!.toString();
      if (email && password) {
        try {
          showPreloaderPopUp('Вход в систему...', preloaderPopUpRef);
          dispatch(userLoginByPasswordThunk({ email, password })).then(() => {
            preloaderPopUpRef.current?.closePopup();
          });
        } catch (e: any) {
          preloaderPopUpRef.current?.closePopup();
          const message =
            `${email} - Ошибка входа в систему` + e.message
              ? `\n${e.message}`
              : '' + e.response.data.message
              ? `\n${e.response.data.message}`
              : '';
          showErrorPopUp(message);
        }
      }
    }
  };

  const onCloseRegistrationPopUp = async (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const email = response.get('email')!.toString();
      const password = response.get('password')!.toString();
      if (email && password) {
        try {
          showPortalPopUp({
            popUpContent: <h3 style={{ color: '#4A90E2', margin: '64px 96px 64px 96px' }}>Регистрация...</h3>,
            withoutButtons: true,
            ref: preloaderPopUpRef,
          });
          await serverApi.sendConfirmationEmail(email, password);
          preloaderPopUpRef.current?.closePopup();
          showPortalPopUp({
            popUpContent: <ConfirmEmailForm email={email} />,
            titleConfirmBtn: 'Понятно',
            oneCenterConfirmBtn: true,
            customClassBottomBtnGroup: classes.oneCenterBtn,
          });
        } catch (e: any) {
          preloaderPopUpRef.current?.closePopup();
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
        preloaderPopUpRef.current?.closePopup();
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

  const sendConfirmedRecoveryCodeAndNewPassword = async (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const code = response.get('code');
      const password = response.get('password');
      if (code && password) {
        try {
          const passwordStr = password.toString();
          const codeStr = code.toString();
          showPortalPopUp({
            popUpContent: (
              <h3 style={{ color: '#4A90E2', margin: '64px 96px 64px 96px' }}>Происходит смена пароля...</h3>
            ),
            withoutButtons: true,
            ref: preloaderPopUpRef,
          });
          const result = await serverApi.sendConfirmedRecoveryPasswordCode(codeStr, passwordStr);
          preloaderPopUpRef.current?.closePopup();
          showPortalPopUp({
            popUpContent: (
              <h3
                style={{ color: '#4A90E2', margin: '64px 96px 64px 96px', whiteSpace: 'pre-line', textAlign: 'center' }}
              >{`${result.message},\n\n\n теперь Вы можете заново войти в систему`}</h3>
            ),
            titleConfirmBtn: 'Понятно',
            oneCenterConfirmBtn: true,
            customClassBottomBtnGroup: classes.oneCenterBtn,
          });
        } catch (e: any) {
          preloaderPopUpRef.current?.closePopup();
          showPortalPopUp({
            popUpContent: (
              <>
                <h3 style={{ color: '#4A90E2', marginTop: 32 }}>{`Ошибка востановления пароля этап проверки кода`}</h3>
                <br />
                {e.response.data.message && <h4 style={{ color: '#FF0000' }}>{e.response.data.message}</h4>}
              </>
            ),
            titleConfirmBtn: 'Понятно',
            oneCenterConfirmBtn: true,
          });
        }
      }
    }
  };

  const onCloseConfirmSendingRecoveryLetter = (response: boolean | FormData | undefined) => {
    if (response) {
      try {
        showPortalPopUp({
          popUpContent: <EnterCodeForgotPasswordForm />,
          titleConfirmBtn: 'Отправить',
          onClosePopUp: sendConfirmedRecoveryCodeAndNewPassword,
        });
      } catch (e: any) {
        showPortalPopUp({
          popUpContent: (
            <>
              <h3 style={{ color: '#4A90E2', marginTop: 32 }}>{`Ошибка востановления пароля этап ввода кода`}</h3>
              <br />
              {e.response.data.message && <h4 style={{ color: '#FF0000' }}>{e.response.data.message}</h4>}
            </>
          ),
          titleConfirmBtn: 'Понятно',
          oneCenterConfirmBtn: true,
        });
      }
    }
  };

  const sendEmailWithRecoveryPasswordCode = async (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const email = response.get('email')!.toString();
      if (email) {
        try {
          showPortalPopUp({
            popUpContent: <h3 style={{ color: '#4A90E2', margin: '64px 96px 64px 96px' }}>Отправка письма...</h3>,
            withoutButtons: true,
            ref: preloaderPopUpRef,
          });
          await serverApi.sendRecoveryPasswordEmail(email);
          preloaderPopUpRef.current?.closePopup();
          showPortalPopUp({
            popUpContent: <ConfirmSendingPasswordRecoveryCodeForm email={email} />,
            titleConfirmBtn: 'Понятно',
            oneCenterConfirmBtn: true,
            customClassBottomBtnGroup: classes.oneCenterBtn,
            onClosePopUp: onCloseConfirmSendingRecoveryLetter,
          });
        } catch (e: any) {
          preloaderPopUpRef.current?.closePopup();
          showPortalPopUp({
            popUpContent: (
              <>
                <h3
                  style={{ color: '#4A90E2', marginTop: 32 }}
                >{`${email} - Ошибка востановления пароля этап отправки кода`}</h3>
                <br />
                {e.response.data.message && <h4 style={{ color: '#FF0000' }}>{e.response.data.message}</h4>}
              </>
            ),
            titleConfirmBtn: 'Понятно',
            oneCenterConfirmBtn: true,
          });
        }
      } else {
        preloaderPopUpRef.current?.closePopup();
        showPortalPopUp({
          popUpContent: <h3>Что-то пошло не так</h3>,
          titleConfirmBtn: 'Понятно',
          oneCenterConfirmBtn: true,
        });
      }
    }
  };

  const ForgotPasswordButton: React.FC = () => {
    const onForgotClick = () => {
      showPortalPopUp({
        popUpContent: <EmailInputForm />,
        titleConfirmBtn: 'Запросить код',
        onClosePopUp: sendEmailWithRecoveryPasswordCode,
      });
    };
    return (
      <ButtonComponent className={classes.forgotBtn} title={'Не помню пароль?'} onClick={onForgotClick} type="reset" />
    );
  };

  const loginUser = () => {
    showPortalPopUp({
      popUpContent: <LoginForm />,
      onClosePopUp: onCloseLoginPopUp,
      titleConfirmBtn: 'Войти',
      hideCancelBottomBtn: true,
      customBottomBtn: <RegistrationButton />,
      customBottomBtnTwo: <ForgotPasswordButton />,
      customClassBottomBtnGroup: classes.customClassBottomBtnGroup,
    });
  };

  const logoutUser = () => {
    dispatch(resetUser());
  };

  const onClosePopUpLogout = (result?: boolean | FormData | undefined) => {
    if (result) {
      logoutUser();
      navigate('/');
    }
  };

  const onClickLogin = () => {
    if (user) {
      showPortalPopUp({
        popUpContent: <div className={classNames(classes.containerLogout)}>{`Выйти из аккаунта: \n${user.name}`}</div>,
        titleConfirmBtn: 'Выйти',
        customClassBottomBtnGroup: classes.customClassBottomBtnGroupLogout,
        onClosePopUp: onClosePopUpLogout,
      });
    } else {
      loginUser();
    }
  };

  return (
    <div className={classes.container} onClick={onClickLogin}>
      {user ? user.name : 'Войти'}
    </div>
  );
};

export default LoginButton;
