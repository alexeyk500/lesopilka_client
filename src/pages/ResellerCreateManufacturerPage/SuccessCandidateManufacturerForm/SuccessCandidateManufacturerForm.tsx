import React from 'react';
import classes from './SuccessCandidateManufacturerForm.module.css';

type PropsType = {
  title: string;
  email: string;
};

const SuccessCandidateManufacturerForm: React.FC<PropsType> = ({ title, email }) => {
  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Успешная регистрация'}</div>
        <p className={classes.firstTitle}>
          {'Поздравляем Вы успешно зарегестрировали на портале нового поставщика'}
          <span className={classes.manufacturerTitle}>{`${title}`}</span>
        </p>
        <p className={classes.title}>
          Теперь, с каждой публикации обьявления данного поставщика, вы будете получать свои комиссионные.
        </p>
        <p className={classes.title}>
          {
            'Для ознакомления с работой площадки и публикации первых обьявлений поставщику начисленны приветсвенные 500 лицензий.\n(с приветственных лицензий комиссионные ресселлерам не начисляются)'
          }
        </p>
        <div className={classes.firstTitle}>
          на электронную почту: &nbsp;
          <span className={classes.emailBold}>{`${email}`}</span>
        </div>
        <div className={classes.subTitle}>
          поставщику автоматически было направленно электронное письмо о регистрации и краткой инструкцией по входу на
          площадку.
        </div>
        <div className={classes.title}>
          Для начала публикации обьявлений поставщик должен войти на площадку по ссылке из регистрационного письма, тем
          самым активировав свой аккаунт и подтвердив свою электронную почту.
        </div>
      </div>
    </div>
  );
};

export default SuccessCandidateManufacturerForm;
