import React from 'react';
import classes from './ManufacturerDataForm.module.css';

const ManufacturerDataForm: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.mainPart}>
        <div className={classes.titleBold}>{'Введите данные поставщика пиломатериалов'}</div>
        <div className={classes.field}>
          <label className={classes.label}>
            Название организации поставщика
            <input
              className={classes.input}
              name="name"
              type="text"
              placeholder={'Введите название организации поставщика'}
              required
            />
          </label>
        </div>

        <div className={classes.field}>
          <label className={classes.label}>
            ИНН организации поставщика
            <input
              className={classes.input}
              name="inn"
              type="text"
              placeholder={'Введите ИНН организации поставщика'}
              required
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerDataForm;
