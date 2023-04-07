import React from 'react';
import classes from './SuccessActivateManufacturerForm.module.css';

const SuccessActivateManufacturerForm: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Успешная активация'}</div>
        <p className={classes.firstTitle}>{'Поздравляем, Вы успешно активировали свой аккаунт поставщика.'}</p>
        <p className={classes.title}>
          Вам уже начислено 500 приветсвенных лицензий, для того что бы вы могли опубликовать свои первые обьявления о
          продаже пиломатериалов.
        </p>
        <p className={classes.title}>
          Детальная информация о публикации обьявлений, правилах площадки и контакты службы поддержки в разделе
          "Справочная" главного меню.
        </p>
      </div>
    </div>
  );
};

export default SuccessActivateManufacturerForm;
