import React from 'react';
import classes from './SuccessRegistrationManufacturerForm.module.css';
import { WELCOME_LICENSES_AMOUNT } from '../../../../../utils/constants';

const SuccessRegistrationManufacturerForm: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Успешная активация'}</div>
        <p className={classes.firstTitle}>{'Поздравляем, Вы успешно активировали свой аккаунт поставщика.'}</p>
        <p className={classes.title}>
          {`Вам уже начислено ${WELCOME_LICENSES_AMOUNT} приветсвенных лицензий, и вы можете уже опубликовать свои первые обьявления о продаже
          пиломатериалов.`}
        </p>
        <p className={classes.title}>
          Детальная информация о публикации обьявлений, правилах площадки и контакты службы поддержки в разделе
          "Справочная" главного меню.
        </p>
      </div>
    </div>
  );
};

export default SuccessRegistrationManufacturerForm;
