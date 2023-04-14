import React from 'react';
import classes from '../ConfirmEmailForm/ConfirmEmailForm.module.css';

type PropsType = {
  email: string;
};

const ConfirmSendingPasswordRecoveryCodeForm: React.FC<PropsType> = ({ email }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{`Восстановление пароля`}</div>
      <div>
        <div className={classes.subTitle}>{`Письмо с инструкциями отправленно на электроную почту:`}</div>
        <div className={classes.email}>{email}</div>
      </div>
      <div className={classes.bottomTitle}>
        <div
          className={classes.subTitleRed}
        >{`если в папке входящих писем письма нет,\nто проверьте папку со спамом`}</div>
      </div>
    </div>
  );
};

export default ConfirmSendingPasswordRecoveryCodeForm;
