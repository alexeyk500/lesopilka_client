import React, { useState } from 'react';
import classes from './EnterCodeForgotPasswordForm.module.css';
import codeIco from '../../../../img/codeIco.svg';
import PasswordInputFields from '../PasswordInputFields/PasswordInputFields';

const EnterCodeForgotPasswordForm: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [passwordRepeated, setPasswordRepeated] = useState<string>('');
  const [blockToClose, setBlockToClose] = useState<string>('true');

  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Востановление пароля'}</div>
        <div className={classes.title}>
          {'введите проверочный код из электронного письма,\nи установите новый пароль для входа'}
        </div>
        <div className={classes.field}>
          <img src={codeIco} className={classes.ico} alt="email" />
          <label className={classes.label}>
            Проверочный код
            <input className={classes.input} name="c0de" type="text" placeholder={'Введите проверочный код'} required />
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

export default EnterCodeForgotPasswordForm;
