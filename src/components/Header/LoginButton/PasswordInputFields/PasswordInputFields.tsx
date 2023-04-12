import React, { useEffect, useState } from 'react';
import classes from './PasswordInputFields.module.css';
import passwordIco from '../../../../img/password.svg';
import classNames from 'classnames';
import visibilityIcoOn from '../../../../img/visibilityIcoOn.svg';
import visibilityIcoOff from '../../../../img/visibilityIcoOff.svg';

type PropsType = {
  password: string;
  setPassword: (value: string) => void;
  passwordRepeated: string;
  setPasswordRepeated: (value: string) => void;
  blockToClose: string;
  setBlockToClose: (value: string) => void;
  isChangePasswordForm?: boolean;
};

const PasswordInputFields: React.FC<PropsType> = ({
  password,
  setPassword,
  passwordRepeated,
  setPasswordRepeated,
  blockToClose,
  setBlockToClose,
  isChangePasswordForm,
}) => {
  const [typePasswordInput, setTypePasswordInput] = useState<string>('password');

  useEffect(() => {
    if (password.length > 0 && password === passwordRepeated) {
      setBlockToClose('false');
    } else {
      setBlockToClose('true');
    }
  }, [password, passwordRepeated, setBlockToClose]);

  const onClickShowPassword = () => {
    setTypePasswordInput((value) => {
      if (value === 'password') {
        return 'text';
      }
      return 'password';
    });
  };

  return (
    <>
      <div className={classes.field}>
        <img src={passwordIco} className={classes.ico} alt="email" />
        <label className={classes.label}>
          {isChangePasswordForm ? 'Новый пароль' : 'Пароль'}
          <input
            className={classes.input}
            name="password"
            type={typePasswordInput}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete="off"
            placeholder={isChangePasswordForm ? 'Введите новый пароль' : 'Введите пароль'}
            required
          />
        </label>
        <img
          src={typePasswordInput === 'password' ? visibilityIcoOn : visibilityIcoOff}
          className={classes.visibilityIco}
          onClick={onClickShowPassword}
          alt="visibility"
        />
      </div>
      <div className={classes.field}>
        <img src={passwordIco} className={classes.ico} alt="password" />
        <label className={classes.label}>
          {isChangePasswordForm ? 'Повторите новый пароль' : 'Повторите пароль'}
          <input
            className={classes.input}
            name="passwordRepeated"
            type="password"
            value={passwordRepeated}
            onChange={(e) => {
              setPasswordRepeated(e.target.value);
            }}
            autoComplete="off"
            placeholder={isChangePasswordForm ? 'Повторите новый пароль' : 'Повторите пароль'}
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
    </>
  );
};

export default PasswordInputFields;
