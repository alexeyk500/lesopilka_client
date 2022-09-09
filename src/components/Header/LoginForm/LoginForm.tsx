import React from 'react';
import classes from './LoginForm.module.css';
import emailIco from './../../../img/mail.svg';
import passwordIco from './../../../img/password.svg';

const LoginForm = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Пожалуйста,'}</div>
        <div className={classes.title}>{'укажите адрес электронной почты и пароль, чтобы войти в систему'}</div>
        <div className={classes.field}>
          <img src={emailIco} className={classes.ico} alt="email" />
          <label className={classes.label}>
            Адрес электронной почты
            <input
              className={classes.input}
              name="email"
              type="text"
              placeholder={'Введите электронную почту'}
              required
            />
          </label>
        </div>
        <div className={classes.field}>
          <img src={passwordIco} className={classes.ico} alt="email" />
          <label className={classes.label}>
            Пароль
            <input
              className={classes.input}
              name="password"
              type="password"
              autoComplete="off"
              placeholder={'Введите пароль'}
              required
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
