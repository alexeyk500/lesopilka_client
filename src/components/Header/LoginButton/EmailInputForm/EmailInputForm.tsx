import React from 'react';
import classes from './EmailInputForm.module.css';
import emailIco from '../../../../img/mail.svg';

const EmailInputForm: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Пожалуйста,'}</div>
        <div className={classes.title}>
          {'для начала процедуры востановления пароля \nвведите адрес электронной почты'}
        </div>
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
      </div>
    </div>
  );
};

export default EmailInputForm;
