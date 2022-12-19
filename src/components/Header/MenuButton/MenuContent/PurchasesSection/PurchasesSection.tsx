import React, { useRef } from 'react';
import classes from '../MenuContent.module.css';
import catalogIco from '../../../../../img/catalogIco.svg';
import cartIcoOutlined from '../../../../../img/cartIcoOutlined.svg';
import ordersIco from '../../../../../img/ordersIco.svg';
import { useNavigate } from 'react-router-dom';
import { PageEnum } from '../../../../AppRouter/AppRouter';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorUser, userLoginByPasswordThunk } from '../../../../../store/userSlice';
import { PopupRef, showPortalPopUp } from '../../../../PortalPopUp/PortalPopUp';
import LoginForm from '../../../LoginButton/LoginForm/LoginForm';
import ForgotPasswordButton from '../../../LoginButton/RegistrationForm/ForgotPasswordButton/ForgotPasswordButton';
import RegistrationButton from '../../../LoginButton/RegistrationForm/RegistrationButton/RegistrationButton';
import { showErrorPopUp, showPreloaderPopUp } from '../../../../InfoAndErrorMessageForm/InfoAndErrorMessageForm';

type PropsType = {
  closeMenuContent: () => void;
};

const PurchasesSection: React.FC<PropsType> = ({ closeMenuContent }) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectorUser);
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

  const onClickCatalog = () => {
    navigate(PageEnum.RootPage);
    closeMenuContent();
  };

  const onClickBasket = () => {
    if (user) {
      navigate(PageEnum.BasketPage);
    } else {
      loginUser();
    }
    closeMenuContent();
  };

  return (
    <div className={classes.section}>
      Покупки
      <button className={classes.menuButton} onClick={onClickCatalog}>
        <img src={catalogIco} className={classes.ico} alt="catalog button" />
        Каталог
      </button>
      <button className={classes.menuButton} onClick={onClickBasket}>
        <img src={cartIcoOutlined} className={classes.ico} alt="basket button" />
        Корзина
      </button>
      <button className={classes.menuButton}>
        <img src={ordersIco} className={classes.ico} alt="orders button" />
        Заказы
      </button>
    </div>
  );
};

export default PurchasesSection;
