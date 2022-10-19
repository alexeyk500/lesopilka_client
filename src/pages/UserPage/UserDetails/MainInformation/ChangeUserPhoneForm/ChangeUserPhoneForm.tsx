import React, { useState } from 'react';
import classes from './ChangeUserPhoneForm.module.css';

type PropsType = {
  phone: string;
};

const ChangeUserPhoneForm: React.FC<PropsType> = ({ phone }) => {
  const [phoneValue, setPhoneValue] = useState<string>(phone);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(event.currentTarget.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Отредактируйте телефон пользователя'}</div>
        <div className={classes.field}>
          <label className={classes.label}>
            Телефон пользователя
            <input
              className={classes.input}
              name="phone"
              type="text"
              placeholder={'Введите телефон пользователя'}
              value={phoneValue}
              onChange={onChange}
              required
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserPhoneForm;
