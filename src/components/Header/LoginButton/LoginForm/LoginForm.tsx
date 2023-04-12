import React, { useState } from 'react';
import classes from './LoginForm.module.css';
import emailIco from '../../../../img/mail.svg';
import passwordIco from '../../../../img/password.svg';
import visibilityIcoOn from '../../../../img/visibilityIcoOn.svg';
import visibilityIcoOff from '../../../../img/visibilityIcoOff.svg';

const LoginForm = () => {
  const [typePasswordInput, setTypePasswordInput] = useState<string>('password');

  const onClickShowPassword = () => {
    setTypePasswordInput((value) => {
      if (value === 'password') {
        return 'text';
      }
      return 'password';
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Пожалуйста,'}</div>
        <div className={classes.title}>{'введите адрес электронной почты и пароль, чтобы войти в систему'}</div>
        <div className={classes.field}>
          <img src={emailIco} className={classes.ico} alt="email" />
          <label className={classes.label}>
            Адрес электронной почты
            <input
              className={classes.input}
              name="email"
              type="email"
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
              type={typePasswordInput}
              autoComplete="off"
              placeholder={'Введите пароль'}
              required
            />
          </label>
          <img
            src={typePasswordInput === 'password' ? visibilityIcoOn : visibilityIcoOff}
            className={classes.eyeIco}
            onClick={onClickShowPassword}
            alt="visibility"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
