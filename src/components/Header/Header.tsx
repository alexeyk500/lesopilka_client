import React from 'react';
import classes from './Header.module.css';
import LoginButton from './LoginButton/LoginButton';
import MenuButton from './MenuButton/MenuButton';
import PopUp from '../PopUp/PopUp';
import LoginForm from './LoginForm/LoginForm';
import ButtonComponent, { ButtonType } from '../commonComponents/ButtonComponent/ButtonComponent';

const Header: React.FC = () => {
  const onClosePopUp = (response: boolean | FormData | undefined) => {
    if (response instanceof FormData) {
      const email = response.get('email');
      const password = response.get('password');
      console.log('email =', email, '   password =', password);
    }
  };

  const CustomBottomBtn: React.FC = () => {
    return (
      <ButtonComponent
        title={'Регистрация'}
        buttonType={ButtonType.SECONDARY}
        onClick={onRegisterClick}
        type="button"
      />
    );
  };

  const onRegisterClick = () => {
    console.log('onRegisterClick');
  };

  const CustomBottomBtnThree: React.FC = () => {
    return (
      <ButtonComponent className={classes.forgotBtn} title={'Не помню пароль'} onClick={onForgotClick} type="button" />
    );
  };

  const onForgotClick = () => {
    console.log('onForgotClick');
  };

  return (
    <div className={classes.container}>
      <MenuButton />
      <LoginButton />
      <PopUp
        popUpContent={<LoginForm />}
        titleConfirmBtn={'Войти'}
        onClosePopUp={onClosePopUp}
        hideCancelBottomBtn
        customBottomBtn={<CustomBottomBtn />}
        customBottomBtnThree={<CustomBottomBtnThree />}
        customClassBottomBtnGroup={classes.customClassBottomBtnGroup}
      />
    </div>
  );
};

export default Header;
