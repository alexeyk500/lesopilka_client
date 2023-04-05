import React from 'react';
import classes from './ManufacturerAddressData.module.css';
import RegionLocationInputs from '../../../../../components/RegionLocationInputs/RegionLocationInputs';

const ManufacturerAddressData: React.FC = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>Юридический адрес:</div>
      <div className={classes.rowDataContainer}>
        <div className={classes.titleSelector}>{'Почтовый индекс :'}</div>
        <input className={classes.input} name="p0st1nd6x" type="text" placeholder={'Введите индекс'} required />
      </div>
      <RegionLocationInputs />
      <div className={classes.rowDataContainer}>
        <div className={classes.titleSelector}>{'Улица :'}</div>
        <input className={classes.input} name="str66t" type="text" placeholder={'Введите улицу'} required />
      </div>
      <div className={classes.rowDataContainer}>
        <div className={classes.titleSelector}>{'Дом :'}</div>
        <input className={classes.input} name="bu1ld1ng" type="text" placeholder={'Введите дом'} required />
      </div>
      <div className={classes.rowDataContainer}>
        <div className={classes.titleSelector}>{'Офис:'}</div>
        <input className={classes.input} name="off1c6" type="text" placeholder={'Введите офис'} />
      </div>
    </div>
  );
};

export default ManufacturerAddressData;
