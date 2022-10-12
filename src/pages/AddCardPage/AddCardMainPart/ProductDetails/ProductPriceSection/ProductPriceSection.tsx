import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorNewCard, setProductPrice } from '../../../../../store/newCardSlice';
import SectionContainer from '../SectionContainer/SectionContainer';
import classes from './ProductPriceSection.module.css';

const onlyDigitAndCommaRegExp = /^([1-9][0-9]*)+(.[0-9]{0,2})?$/;

const ProductPriceSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const newCard = useAppSelector(selectorNewCard);

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.currentTarget.value === '') {
      dispatch(setProductPrice(undefined));
    }
    if (onlyDigitAndCommaRegExp.test(event.currentTarget.value)) {
      const priceStr = event.currentTarget.value.replace('.', ',');
      dispatch(setProductPrice(priceStr));
    }
  };

  return (
    <SectionContainer title={'Цена'} completeCondition={!!newCard.price} blurCondition={false}>
      <div className={classes.contentContainer}>
        <div className={classes.title}>Укажите стоимость одной единицы товара в рублях</div>
        <div className={classes.inputContainer}>
          <input className={classes.customSizeInput} value={newCard.price || ''} onChange={onChangeInput} type="text" />
          {'руб'}
        </div>
      </div>
    </SectionContainer>
  );
};

export default ProductPriceSection;
