import React from 'react';
import classes from './SuccessActivateUserForm.module.css';

const SuccessActivateUserForm: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Успешная активация аккаунта'}</div>
        <p className={classes.firstTitle}>{'Поздравляем, вы успешно активировали свой аккаунт пользователя.'}</p>
        <p className={classes.title}>
          {`Ваша электронная почта подтверждена.
          В случае необходимости ее можно будет сменить
          через нашу службу поддержки.`}
        </p>
        <p className={classes.title}>
          {`Детальная информация о публикации обьявлений,
          правилах площадки и контакты службы поддержки
          в разделе "Справочная" главного меню.`}
        </p>
      </div>
    </div>
  );
};

export default SuccessActivateUserForm;
