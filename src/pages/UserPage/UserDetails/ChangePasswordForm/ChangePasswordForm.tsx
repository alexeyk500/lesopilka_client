import React, { useState } from 'react';
import classes from './ChangePasswordForm.module.css';
import passwordIco from '../../../../img/password.svg';
import eyeIco from '../../../../img/eyeIco.svg';

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
        <div className={classes.titleBold}>{'Смена пароля у пользователя'}</div>
        <div className={classes.title}>{'для смены пароля потребуется текущий пароль пользователя'}</div>
        <div className={classes.field}>
          <img src={passwordIco} className={classes.ico} alt="email" />
          <label className={classes.label}>
            Текущий Пароль
            <input
              className={classes.input}
              name="currentPassword"
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
          <img src={eyeIco} className={classes.eyeIco} alt="email" onClick={onClickShowPassword} />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
