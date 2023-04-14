import React, { useState } from 'react';
import classes from './ChangePasswordForm.module.css';
import passwordIco from '../../../../../img/password.svg';
import visibilityIcoOn from '../../../../../img/visibilityIcoOn.svg';
import visibilityIcoOff from '../../../../../img/visibilityIcoOff.svg';

const ChangePasswordForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
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
        <div className={classes.titleBold}>{'Изменение пароля у пользователя'}</div>
        <div className={classes.title}>{'для замены пароля требуется текущий пароль пользователя'}</div>
        <div className={classes.field}>
          <img src={passwordIco} className={classes.ico} alt="email" />
          <label className={classes.label}>
            Текущий Пароль
            <input
              className={classes.input}
              name="curr6ntPa55w0rd"
              type={typePasswordInput}
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
              autoComplete="off"
              placeholder={'Введите текущий пароль'}
              required
            />
          </label>
          <img
            src={typePasswordInput === 'password' ? visibilityIcoOn : visibilityIcoOff}
            className={classes.visibilityIco}
            alt="password"
            onClick={onClickShowPassword}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
