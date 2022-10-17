import React, { useState } from 'react';
import classes from './NewPasswordForm.module.css';
import PasswordInputFields from '../../../../../components/Header/LoginButton/PasswordInputFields/PasswordInputFields';

const NewPasswordForm: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [passwordRepeated, setPasswordRepeated] = useState<string>('');
  const [blockToClose, setBlockToClose] = useState<string>('true');

  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Данные для установки нового пароля'}</div>
        <PasswordInputFields
          password={password}
          setPassword={setPassword}
          passwordRepeated={passwordRepeated}
          setPasswordRepeated={setPasswordRepeated}
          blockToClose={blockToClose}
          setBlockToClose={setBlockToClose}
          isChangePasswordForm
        />
      </div>
    </div>
  );
};

export default NewPasswordForm;
