import React from 'react';
import classes from './LoginButton.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { selectorUser, showLoginPopUp } from '../../../store/userSlice';

const LoginButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);

  const onClickLogin = () => {
    if (!user) {
      dispatch(showLoginPopUp());
    }
  };

  return (
    <div className={classes.container} onClick={onClickLogin}>
      {user ? user.name : 'Войти'}
    </div>
  );
};

export default LoginButton;
