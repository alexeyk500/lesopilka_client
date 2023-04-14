import React, { useState } from 'react';
import classes from './RegistrationForm.module.css';
import emailIco from '../../../../img/mail.svg';
import PasswordInputFields from '../PasswordInputFields/PasswordInputFields';

const RegistrationForm: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [passwordRepeated, setPasswordRepeated] = useState<string>('');
  const [blockToClose, setBlockToClose] = useState<string>('true');

  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Пожалуйста,'}</div>
        <div className={classes.title}>{'введите адрес электронной почты и пароль,'}</div>
        <div className={classes.titleLine}>{'чтобы зарегистрироваться в системе'}</div>
        <div className={classes.field}>
          <img src={emailIco} className={classes.ico} alt="email" />
          <label className={classes.label}>
            Адрес электронной почты
            <input
              className={classes.input}
              name="6ma1l"
              type="email"
              placeholder={'Введите электронную почту'}
              required
            />
          </label>
        </div>
        <PasswordInputFields
          password={password}
          setPassword={setPassword}
          passwordRepeated={passwordRepeated}
          setPasswordRepeated={setPasswordRepeated}
          blockToClose={blockToClose}
          setBlockToClose={setBlockToClose}
        />
      </div>
    </div>
  );
};

export default RegistrationForm;
