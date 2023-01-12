import React, { useRef } from 'react';
import classes from './OrdersButton.module.css';
import ordersList from '../../../img/ordersList.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { selectorUser, userLoginByPasswordThunk } from '../../../store/userSlice';
import { setCatalogSearchParams } from '../../../store/productSlice';
import { PageEnum } from '../../AppRouter/AppRouter';
import { PopupRef, showPortalPopUp } from '../../PortalPopUp/PortalPopUp';
import { showErrorPopUp, showPreloaderPopUp } from '../../InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import LoginForm from '../LoginButton/LoginForm/LoginForm';
import RegistrationButton from '../LoginButton/RegistrationForm/RegistrationButton/RegistrationButton';
import ForgotPasswordButton from '../LoginButton/RegistrationForm/ForgotPasswordButton/ForgotPasswordButton';

const OrdersButton: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
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
              navigate(PageEnum.OrdersPage);
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

  const onClickOrders = () => {
    if (user) {
      dispatch(setCatalogSearchParams(searchParams.toString()));
      navigate(PageEnum.OrdersPage);
    } else {
      loginUser();
    }
  };

  return (
    <button className={classes.container} onClick={onClickOrders}>
      <img className={classes.ico} src={ordersList} alt="orders" />
    </button>
  );
};

export default OrdersButton;
