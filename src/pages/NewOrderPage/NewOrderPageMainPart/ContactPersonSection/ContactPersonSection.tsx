import React, { useState } from 'react';
import SectionContainer from '../../../EditCardPage/EditCardMainPart/ProductDetails/SectionContainer/SectionContainer';
import classes from './ContactPersonSection.module.css';
import {
  selectorNewOrderContactPersonName,
  selectorNewOrderContactPersonPhone,
  setContactPersonName,
  setContactPersonPhone,
} from '../../../../store/newOrderSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { regPhone } from '../../../../utils/constants';

export const checkContactPersonSection = ({
  contactPersonName,
  contactPersonPhone,
}: {
  contactPersonName: string | undefined;
  contactPersonPhone: string | undefined;
}) => {
  return !!(contactPersonPhone?.length === 12 && contactPersonName?.length);
};

const ContactPersonSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const contactPersonName = useAppSelector(selectorNewOrderContactPersonName);
  const contactPersonPhone = useAppSelector(selectorNewOrderContactPersonPhone);

  const onChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '' || regPhone.test(event.target.value)) {
      dispatch(setContactPersonPhone(event.currentTarget.value === '' ? undefined : event.currentTarget.value));
    }
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setContactPersonName(event.currentTarget.value === '' ? undefined : event.currentTarget.value));
  };

  const [isShowPhoneToolTip, setIsShowPhoneToolTip] = useState(false);

  let showPhoneSetTimeOut: NodeJS.Timeout;

  const showPhoneToolTip = () => {
    showPhoneSetTimeOut = setTimeout(() => {
      setIsShowPhoneToolTip(true);
    }, 500);
  };

  const hidePhoneToolTip = () => {
    clearTimeout(showPhoneSetTimeOut);
    setIsShowPhoneToolTip(false);
  };

  const isSectionCondition = checkContactPersonSection({ contactPersonName, contactPersonPhone });

  return (
    <SectionContainer title={'Контактное лицо'} completeCondition={isSectionCondition}>
      <div className={classes.rowContainer}>
        <div className={classes.phoneContainer} onMouseOver={showPhoneToolTip} onMouseLeave={hidePhoneToolTip}>
          <input
            className={classes.customPhoneInput}
            placeholder={'Мобильный телефон'}
            value={contactPersonPhone || ''}
            onChange={onChangePhone}
            type="text"
          />
          {isShowPhoneToolTip && <div className={classes.toolTipContainer}>{'Формат номера +79990001122'}</div>}
        </div>
        <div className={classes.nameContainer}>
          <input
            className={classes.customNameInput}
            placeholder={'Фамилия и Имя'}
            value={contactPersonName || ''}
            onChange={onChangeName}
            type="text"
          />
          <div className={classes.additionalInfoTitle}>
            {'Укажите контактное лицо с которым поставщик сможет связаться для уточнения деталей доставки и заказа'}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ContactPersonSection;
