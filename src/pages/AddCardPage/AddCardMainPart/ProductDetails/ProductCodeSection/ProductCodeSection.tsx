import React from 'react';
import classes from './ProductCodeSection.module.css';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorNewCard, setProductCode } from '../../../../../store/newCardSlice';
import SectionContainer from '../SectionContainer/SectionContainer';

const ProductCodeSection = () => {
  const dispatch = useAppDispatch();
  const newCard = useAppSelector(selectorNewCard);

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(setProductCode(event.currentTarget.value ? event.currentTarget.value : undefined));
  };

  return (
    <SectionContainer title={'Артикул'} completeCondition={!!newCard.productCode} blurCondition={false}>
      <div className={classes.contentContainer}>
        <div className={classes.title}>Укажите артикул товара согласно своей внутренней системы учета</div>
        <input className={classes.customSizeInput} value={newCard.productCode} onChange={onChangeInput} type="text" />
      </div>
    </SectionContainer>
  );
};

export default ProductCodeSection;
