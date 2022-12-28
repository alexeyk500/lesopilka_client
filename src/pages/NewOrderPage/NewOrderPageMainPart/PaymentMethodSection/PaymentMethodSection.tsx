import React from 'react';
import SectionContainer from '../../../EditCardPage/EditCardMainPart/ProductDetails/SectionContainer/SectionContainer';
import classes from './PaymentMethodSection.module.css';
import CheckBoxBlueSquare from '../../../../components/commonComponents/CheckBoxBlueSquare/CheckBoxBlueSquare';

const PaymentMethodSection: React.FC = () => {
  return (
    <SectionContainer title={'Способ оплаты'} completeCondition={false}>
      <div className={classes.checkBoxContainer}>
        <CheckBoxBlueSquare id={1} title={'Оплата через интернет банк'} checked={true} onSelect={() => {}} />
      </div>
      <div className={classes.checkBoxContainer}>
        <CheckBoxBlueSquare id={2} title={'Наличными при доставке'} checked={false} onSelect={() => {}} />
      </div>
      <div className={classes.checkBoxContainer}>
        <CheckBoxBlueSquare id={3} title={'Картой при доставке'} checked={false} onSelect={() => {}} />
      </div>
    </SectionContainer>
  );
};

export default PaymentMethodSection;
