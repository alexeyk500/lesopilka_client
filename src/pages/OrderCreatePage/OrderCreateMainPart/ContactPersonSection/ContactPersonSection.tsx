import React from 'react';
import SectionContainer from '../../../EditCardPage/EditCardMainPart/ProductDetails/SectionContainer/SectionContainer';
import classes from './ContactPersonSection.module.css';

const ContactPersonSection: React.FC = () => {
  return (
    <SectionContainer title={'Контактное лицо'} completeCondition={false}>
      <div className={classes.rowContainer}>
        <div className={classes.phoneContainer}>
          <input className={classes.customPhoneInput} placeholder={'Телефон'} onChange={() => {}} type="text" />
        </div>
        <div className={classes.nameContainer}>
          <input className={classes.customNameInput} placeholder={'Фамилия и Имя'} onChange={() => {}} type="text" />
          <div className={classes.additionalInfoTitle}>
            {'Укажите контактное лицо с которым поставщик сможет связаться для уточнения деталей доставки и заказа'}
          </div>
        </div>
      </div>

    </SectionContainer>
  );
};

export default ContactPersonSection;
