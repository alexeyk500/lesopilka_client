import React from 'react';
import classes from './ConfirmEmailForm.module.css';

type PropsType = {
  email: string;
};

const ConfirmEmailForm: React.FC<PropsType> = ({ email }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{`Успешная регистрация пользователя`}</div>
      <div>
        <div className={classes.subTitle}>{`пользователь с электроной почтой `}</div>
        <div className={classes.email}>{email}</div>
        <div className={classes.subTitle}>{`успешно зарегестрирован`}</div>
      </div>
      <div className={classes.bottomTitle}>
        {`Письмо с инструкцией по активации аккаунта\nи входу в личный кабинет\nотправлено электронную почту пользователя`}
      </div>
    </div>
  );
};

export default ConfirmEmailForm;
