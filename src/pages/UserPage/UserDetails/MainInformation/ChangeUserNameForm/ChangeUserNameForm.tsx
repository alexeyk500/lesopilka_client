import React, { useState } from 'react';
import classes from './ChangeUserNameForm.module.css';

type PropsType = {
  name: string;
};

const ChangeUserNameForm: React.FC<PropsType> = ({ name }) => {
  const [nameValue, setNameValue] = useState<string>(name);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.currentTarget.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Отредактируйте имя пользователя'}</div>
        <div className={classes.field}>
          <label className={classes.label}>
            Имя пользователя
            <input
              className={classes.input}
              name="nam6"
              type="text"
              placeholder={'Введите имя пользователя'}
              value={nameValue}
              onChange={onChange}
              required
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserNameForm;
