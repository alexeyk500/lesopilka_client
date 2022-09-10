import React from 'react';
import classes from './ConfirmEmailForm.module.css';

type PropsType = {
  email: string;
};

const ConfirmEmailForm: React.FC<PropsType> = ({ email }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{`Пользователь`}</div>
      <div>
        <div className={classes.subTitle}>{`с электроной почтой `}</div>
        <div className={classes.email}>{email}</div>
        <div className={classes.subTitle}>{` зарегестрирован`}</div>
      </div>
      <div className={classes.bottomTitle}>
        {`На электронную почту пользователя отправлено письмо\nс инструкциями по активации аккаунта`}
      </div>
    </div>
  );
};

export default ConfirmEmailForm;
