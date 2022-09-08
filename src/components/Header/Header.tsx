import React from 'react';
import classes from './Header.module.css';
import LoginButton from './LoginButton/LoginButton';
import MenuButton from './MenuButton/MenuButton';
import PopUp from '../PopUp/PopUp';
import LoginForm from './LoginForm/LoginForm';

const Header: React.FC = () => {
  const onClosePopUp = (response: boolean | FormData | undefined) => {
    console.log('response from PopUp =', response);
    if (response instanceof FormData) {
      const email = response.get('email');
      const password = response.get('password');
      console.log('email =', email, '   password =', password);
    }
  };

  return (
    <div className={classes.container}>
      <MenuButton />
      <LoginButton />
      <PopUp popUpContent={<LoginForm />} onClosePopUp={onClosePopUp} />
    </div>
  );
};

export default Header;
