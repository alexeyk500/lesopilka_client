import React from 'react';
import classes from './LoginForm.module.css';

const LoginForm = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.title}>
          {'Пожалуйста,\nукажите адрес электронной почты и пароль, чтобы войти в систему'}
        </div>
        <label className={classes.label}>
          Адрес электронной почты
          <input
            className={classes.input}
            name="email"
            type="text"
            autoComplete="on"
            placeholder={'Введите электронную почту'}
          />
        </label>
        <label className={classes.label}>
          Пароль
          <input
            className={classes.input}
            name="password"
            type="password"
            autoComplete="on"
            placeholder={'Введите пароль'}
          />
        </label>
      </div>
    </div>
  );
};

export default LoginForm;
