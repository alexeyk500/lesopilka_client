import React from 'react';
import classes from './SuccessRegistrationMessageForm.module.css'

const SuccessRegistrationMessageForm: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        {'РЕГИСТРАЦИЯ\nпрошла успешно'}
      </div>
      <div className={classes.subTitle}>
        {'Теперь вы можете войти на сайт\nпод своим логином и паролем'}
      </div>
    </div>
  );
};

export default SuccessRegistrationMessageForm;
