import React from 'react';
import classes from '../../RegistrationAsManufacturer/RulesInformForm/RulesInformForm.module.css';

const ResellerInformForm: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Правила регистрации Реселлера'}</div>
        <p className={classes.title}>
          Доступ Реселлера к регистрации поставщиков и к отчетам о заработке будет предоставлен сразу заполнения
          дополнительных регистрационных данных.
        </p>
        <p className={classes.title}>
          Пользователь площадки не может быть одновременно реселлером и поставщиком пиломатериалов, в случае успешной
          регистрации пользователя как реселлера, регистрация пользователя в качестве поставщика будет невозможна.
        </p>
      </div>
    </div>
  );
};

export default ResellerInformForm;
