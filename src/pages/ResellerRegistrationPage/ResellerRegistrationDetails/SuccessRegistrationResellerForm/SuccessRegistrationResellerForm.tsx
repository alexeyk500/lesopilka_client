import React from 'react';
import classes from './SuccessRegistrationResellerForm.module.css';

const SuccessRegistrationResellerForm: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Успешная активация'}</div>
        <p className={classes.firstTitle}>{'Поздравляем, вы успешно активировали свой аккаунт реселлера.'}</p>
        <p className={classes.title}>
          {`В личном кабинете реселлера вам теперь доступна регистрация новых поставщиков пиломатериалов, а так же отчет по публикации поставщиками обявлений и детализация этого отчета.`}
        </p>
        <p className={classes.title}>
          Детальная информация о статусе реселлера, размере комиссионных для реселлера, правилах площадки и контакты
          службы поддержки в разделе "Справочная" главного меню.
        </p>
      </div>
    </div>
  );
};

export default SuccessRegistrationResellerForm;
