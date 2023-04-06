import React from 'react';
import classes from './RulesInformForm.module.css';

type PropsType = {
  email: string;
};

const RulesInformForm: React.FC<PropsType> = ({ email }) => {
  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Правила регистрации поставщика пиломатериалов'}</div>
        <p className={classes.title}>
          Доступ к продажам и созданию карточек будет предоставлен сразу после проверки регистрационных данных
          поставщика пиломатериалов.
        </p>
        <p className={classes.title}>
          Организация поставщик должна стоять на учете в ИФНС и иметь ОКВЭД относящийся производству или продаже
          пиломатериалов.
        </p>
        <p className={classes.title}>
          Проверка данных по поставщику проводится в ручном режиме и может занять до нескольких часов.
        </p>
        <div className={classes.title}>
          Результат рассмотрения заявки на регистрациию организации как поставщика пиломатериалов будет отправлен
          пользователю
        </div>
        <div className={classes.email}>
          на электронную почту: &nbsp;
          <span className={classes.emailBold}>{`${email}`}</span>
        </div>
        <p className={classes.title}>
          {'Согласно правил площадки, пользователь не может явлаться как поставщиком пиломатериалов, так одновременно и реселлером.\n' +
            'В случае успешной регистрации пользователя как поставщика пиломатериалов, возможность регистрации пользователя в качестве реселлера будет заблокирована.'}
        </p>
      </div>
    </div>
  );
};

export default RulesInformForm;
