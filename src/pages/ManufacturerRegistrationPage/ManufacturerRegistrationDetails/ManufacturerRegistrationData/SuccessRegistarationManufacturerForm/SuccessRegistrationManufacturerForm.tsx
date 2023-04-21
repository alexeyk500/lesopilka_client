import React from 'react';
import classes from './SuccessRegistrationManufacturerForm.module.css';
import { WELCOME_LICENSES_AMOUNT } from '../../../../../utils/constants';

const SuccessRegistrationManufacturerForm: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Успешная активация'}</div>
        <p className={classes.firstTitle}>{'Поздравляем, вы успешно активировали аккаунт поставщика.'}</p>
        <p className={classes.title}>
          {`Вам начислено ${WELCOME_LICENSES_AMOUNT} приветсвенных лицензий,
          и вы можете начать публикацию обьявлений
          о продаже пиломатериалов.

          Детальная информация о публикации обьявлений,
          правилах площадки и контакты службы поддержки
          в разделе "Справочная" главного меню.
          `}
        </p>
      </div>
    </div>
  );
};

export default SuccessRegistrationManufacturerForm;
