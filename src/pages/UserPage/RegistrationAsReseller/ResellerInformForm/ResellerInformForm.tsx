import React from 'react';
import classes from '../../RegistrationAsManufacturer/ManufacturerRulesInformForm/ManufacturerRulesInformForm.module.css';

const ResellerInformForm: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Правила регистрации реселлера'}</div>
        <p className={classes.title}>
          Доступ Реселлера к регистрации новых поставщиков пиломатериалов, а так же доступ реселлера к отчетам о его
          комиссионных будет предоставлен сразу после регистрации.
        </p>
        <p className={classes.title}>
          {'Согласно правил площадки, пользователь не может явлаться как реселлером, так одновременно и поставщиком пиломатериалов.\n' +
            'В случае успешной регистрации пользователя как реселлера, возможность регистрации пользователя в качестве поставщика пиломатериалов будет заблокирована.'}
        </p>
      </div>
    </div>
  );
};

export default ResellerInformForm;
