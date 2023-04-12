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
        {`Письмо с инструкциями по активации аккаунта и входу в личный кабинет\nотправлено электронную почту пользователя`}
      </div>
    </div>
  );
};

export default ConfirmEmailForm;
