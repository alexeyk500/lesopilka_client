import React from 'react';
import classes from './ManufacturerRegistrationData.module.css';
import SectionContainer from '../../../../components/commonComponents/SectionContainer/SectionContainer';
import ManufacturerAddressData from './ManufacturerAddressData/ManufacturerAddressData';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';

const ManufacturerRegistrationData = () => {
  return (
    <SectionContainer title={'Уставная информация'}>
      <div className={classes.content}>
        <div className={classes.rowContainer}>
          <form className={classes.dataContainer}>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Название организации :'}</div>
              <input className={classes.input} name="t1tl6" type="text" placeholder={'Введите название'} required />
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'ИНН организации :'}</div>
              <input className={classes.input} name="inn" type="text" placeholder={'Введите ИНН'} required />
            </div>
            <div className={classes.rowDataContainer}>
              <div className={classes.title}>{'Телефон организации :'}</div>
              <input className={classes.input} name="ph0n6" type="text" placeholder={'Введите телефон'} required />
            </div>
            <ManufacturerAddressData />
          </form>
        </div>
        <div className={classes.btnGroup}>
          <ButtonComponent title={'Регистрация'} type={'submit'} />
          <ButtonComponent title={'Отмена'} buttonType={ButtonType.SECONDARY} onClick={() => {}} />
        </div>
      </div>
    </SectionContainer>
  );
};

export default ManufacturerRegistrationData;
