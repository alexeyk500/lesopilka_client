import React, { useRef } from 'react';
import classes from './LoginButton.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { resetUser, selectorUser, userLoginByPasswordThunk } from '../../../store/userSlice';
import { PopupRef, showPortalPopUp } from '../../PortalPopUp/PortalPopUp';
import LoginForm from './LoginForm/LoginForm';
import { showErrorPopUp, showPreloaderPopUp } from '../../InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { PageEnum } from '../../AppRouter/AppRouter';
import RegistrationButton from './RegistrationForm/RegistrationButton/RegistrationButton';
import ForgotPasswordButton from './RegistrationForm/ForgotPasswordButton/ForgotPasswordButton';

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
      navigate(PageEnum.RootPage);
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
