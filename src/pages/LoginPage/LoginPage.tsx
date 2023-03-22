import React, { useEffect, useRef, useState } from 'react';
import UnitedPage from '../UnitedPage/UnitedPage';
import { PopupRef, showPortalPopUp } from '../../components/PortalPopUp/PortalPopUp';
import LoginForm from '../../components/Header/LoginButton/LoginForm/LoginForm';
import RegistrationButton from '../../components/Header/LoginButton/RegistrationForm/RegistrationButton/RegistrationButton';
import ForgotPasswordButton from '../../components/Header/LoginButton/RegistrationForm/ForgotPasswordButton/ForgotPasswordButton';

import classes from './LoginPage.module.css';
import { showErrorPopUp, showPreloaderPopUp } from '../../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { selectorIsUserChecked, selectorUser, userLoginByPasswordThunk } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { QueryEnum } from '../../types/types';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const preloaderPopUpRef = useRef<PopupRef | null>(null);
  const isAuth = !!useAppSelector(selectorUser);
  const isUserChecked = useAppSelector(selectorIsUserChecked);

  const [searchParams] = useSearchParams();
  const [redirectRoute, setRedirectRoute] = useState<string | undefined>(undefined);

  useEffect(() => {
    searchParams.forEach((value, key) => {
      if (key === QueryEnum.Redirect) {
        setRedirectRoute(value);
      }
    });
  }, [searchParams]);

  useEffect(() => {
    const onCloseLoginPopUp = async (response: boolean | FormData | undefined) => {
      if (response instanceof FormData) {
        const email = response.get('email')!.toString();
        const password = response.get('password')!.toString();
        if (email && password) {
          try {
            showPreloaderPopUp('Вход в систему...', preloaderPopUpRef);
            dispatch(userLoginByPasswordThunk({ email, password })).then(() => {
              preloaderPopUpRef.current?.closePopup();
              if (redirectRoute) {
                console.log('will redirect =', redirectRoute);
                navigate(redirectRoute);
              }
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

    if (isAuth && isUserChecked && redirectRoute) {
      navigate(redirectRoute);
    } else if (!isAuth && isUserChecked && redirectRoute) {
      showPortalPopUp({
        popUpContent: <LoginForm />,
        onClosePopUp: onCloseLoginPopUp,
        titleConfirmBtn: 'Войти',
        hideCancelBottomBtn: true,
        customBottomBtn: <RegistrationButton />,
        customBottomBtnTwo: <ForgotPasswordButton />,
        customClassBottomBtnGroup: classes.customClassBottomBtnGroup,
      });
    }
  }, [redirectRoute, isAuth, isUserChecked, dispatch, navigate]);

  return (
    <>
      <UnitedPage />
    </>
  );
};

export default LoginPage;
