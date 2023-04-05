import React, { FormEvent } from 'react';
import classes from './ManufacturerRegistrationData.module.css';
import SectionContainer from '../../../../components/commonComponents/SectionContainer/SectionContainer';
import ManufacturerAddressData from './ManufacturerAddressData/ManufacturerAddressData';
import ButtonComponent, { ButtonType } from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useAppDispatch } from '../../../../hooks/hooks';
import { userCreateManufacturerThunk, userLoginByTokenThunk } from '../../../../store/userSlice';
import { showErrorPopUp } from '../../../../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { getInputFormData } from '../../../../utils/functions';
import { PageEnum } from '../../../../components/AppRouter/AppRouter';
import { useNavigate } from 'react-router-dom';

const ManufacturerRegistrationData = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = getInputFormData(event.currentTarget, 't1tl6');
    const inn = getInputFormData(event.currentTarget, 'inn');
    const phone = getInputFormData(event.currentTarget, 'ph0n6');
    const locationId = Number(getInputFormData(event.currentTarget, 'l0cat10n'));
    const street = getInputFormData(event.currentTarget, 'str66t');
    const building = getInputFormData(event.currentTarget, 'bu1ld1ng');
    const office = getInputFormData(event.currentTarget, 'off1c6');
    const postIndex = getInputFormData(event.currentTarget, 'p0st1nd6x');
    if (title && inn && phone && locationId && street && building && postIndex) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        dispatch(
          userCreateManufacturerThunk({ token, title, inn, phone, locationId, street, building, office, postIndex })
        ).then(() => {
          dispatch(userLoginByTokenThunk());
        });
      } else {
        showErrorPopUp('Войдите в систему');
      }
    }
  };

  const onClickCancel = () => {
    navigate(PageEnum.UserPage);
  };

  return (
    <SectionContainer title={'Поставщик'}>
      <div className={classes.content}>
        <div className={classes.subtitle}>Введите информацию из учредительных документов поставщика</div>
        <div className={classes.rowContainer}>
          <form className={classes.dataContainer} onSubmit={onSubmit}>
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
            <div className={classes.btnGroup}>
              <ButtonComponent title={'Регистрация'} type={'submit'} />
              <ButtonComponent title={'Отмена'} buttonType={ButtonType.SECONDARY} onClick={onClickCancel} />
            </div>
          </form>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ManufacturerRegistrationData;
