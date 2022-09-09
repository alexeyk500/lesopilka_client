import React, { useEffect, useState } from 'react';
import classes from './RegistrationForm.module.css';
import emailIco from './../../../img/mail.svg';
import passwordIco from './../../../img/password.svg';
import eyeIco from './../../../img/eyeIco.svg';
import classNames from 'classnames';

const RegistrationForm: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [passwordRepeated, setPasswordRepeated] = useState<string>('');
  const [blockToClose, setBlockToClose] = useState<string>('true');
  const [typePasswordInput, setTypePasswordInput] = useState<string>('password');

  useEffect(() => {
    if (password.length > 0 && password === passwordRepeated) {
      setBlockToClose('false');
    } else {
      setBlockToClose('true');
    }
  }, [password, passwordRepeated]);

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
        <div className={classes.title}>{'введите адрес электронной почты и пароль,'}</div>
        <div className={classes.titleLine}>{'чтобы зарегстрироваться в системе'}</div>
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="off"
              placeholder={'Введите пароль'}
              required
            />
          </label>
          <img src={eyeIco} className={classes.eyeIco} alt="email" onClick={onClickShowPassword} />
        </div>
        <div className={classes.field}>
          <img src={passwordIco} className={classes.ico} alt="password" />
          <label className={classes.label}>
            Повторите пароль
            <input
              className={classes.input}
              name="passwordRepeated"
              type="password"
              value={passwordRepeated}
              onChange={(e) => {
                setPasswordRepeated(e.target.value);
              }}
              autoComplete="off"
              placeholder={'Повторите пароль'}
              required
            />
          </label>
        </div>
        <div className={classNames(classes.checkPasswordInfo, { [classes.blockToClose]: blockToClose === 'true' })}>
          {password.length > 0 || passwordRepeated.length > 0
            ? password === passwordRepeated
              ? 'Пароли совпадают'
              : 'Пароли не совпадают'
            : null}
        </div>
        <input name="blockToClosePopUp" value={blockToClose} type="hidden" />
      </div>
    </div>
  );
};

export default RegistrationForm;
