import { showErrorPopUp, showPreloaderPopUp } from '../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { userLoginByPasswordThunk } from '../store/userSlice';
import { PageEnum } from '../components/AppRouter/AppRouter';
import { PopupRef, showPortalPopUp } from '../components/PortalPopUp/PortalPopUp';
import LoginForm from '../components/Header/LoginButton/LoginForm/LoginForm';
import RegistrationButton from '../components/Header/LoginButton/RegistrationForm/RegistrationButton/RegistrationButton';
import ForgotPasswordButton from '../components/Header/LoginButton/RegistrationForm/ForgotPasswordButton/ForgotPasswordButton';
import classes from '../components/Header/BasketButton/BasketButton.module.css';
import React, { useRef } from 'react';
import { useAppDispatch } from './hooks';
import { useNavigate } from 'react-router-dom';

export default function useLoginUser() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const preloaderPopUpRef = useRef<PopupRef | null>(null);

  const onCloseLoginPopUp = async (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const email = response.get('email')!.toString();
      const password = response.get('password')!.toString();
      if (email && password) {
        try {
          showPreloaderPopUp('Вход в систему...', preloaderPopUpRef);
          dispatch(userLoginByPasswordThunk({ email, password }))
            .then(() => {
              preloaderPopUpRef.current?.closePopup();
            })
            .then(() => {
              navigate(PageEnum.BasketPage);
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

  return () => {
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
}
