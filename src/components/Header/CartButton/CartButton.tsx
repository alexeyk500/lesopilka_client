import React, { useRef } from 'react';
import cartIco from '../../../img/cartIco.svg';
import classes from './CartButton.module.css';
import { PageEnum } from '../../AppRouter/AppRouter';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { selectorUser, userLoginByPasswordThunk } from '../../../store/userSlice';
import { PopupRef, showPortalPopUp } from '../../PortalPopUp/PortalPopUp';
import LoginForm from '../LoginButton/LoginForm/LoginForm';
import RegistrationButton from '../LoginButton/RegistrationForm/RegistrationButton/RegistrationButton';
import ForgotPasswordButton from '../LoginButton/RegistrationForm/ForgotPasswordButton/ForgotPasswordButton';
import { showErrorPopUp, showPreloaderPopUp } from '../../InfoAndErrorMessageForm/InfoAndErrorMessageForm';

const CartButton: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);
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

  const onClickBasket = () => {
    if (user) {
      navigate(PageEnum.BasketPage);
    } else {
      loginUser();
    }
  };

  return (
    <button className={classes.container} onClick={onClickBasket}>
      <img className={classes.ico} src={cartIco} alt="button cart" />
    </button>
  );
};

export default CartButton;
