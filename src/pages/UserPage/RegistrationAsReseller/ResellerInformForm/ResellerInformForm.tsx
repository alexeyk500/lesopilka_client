import React from 'react';
import classes from './ResellerInformForm.module.css';

const ResellerInformForm: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Правила регистрации реселлера'}</div>
        <p className={classes.title}>
          {` Доступ Реселлера к регистрации новых поставщиков, а так же
          доступ к отчетам о комиссионных будет предоставлен сразу
          после регистрации.

          Согласно правил площадки, пользователь не может одновременно
          явлаться как реселлером, так и поставщиком пиломатериалов на ней.
          В случае успешной регистрации пользователя как реселлера,
          возможность регистрации пользователя в качестве поставщика
          будет невозможна.`}
        </p>
      </div>
    </div>
  );
};

export default ResellerInformForm;
