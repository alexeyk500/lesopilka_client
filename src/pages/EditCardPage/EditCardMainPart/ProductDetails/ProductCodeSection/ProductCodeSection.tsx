import React from 'react';
import classes from './ProductCodeSection.module.css';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorProductCard, setProductCode } from '../../../../../store/productCardSlice';
import SectionContainer from '../SectionContainer/SectionContainer';

const ProductCodeSection = () => {
  const dispatch = useAppDispatch();
  const editCard = useAppSelector(selectorProductCard);

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(setProductCode(event.currentTarget.value ? event.currentTarget.value : undefined));
  };

  return (
    <SectionContainer title={'Артикул'} completeCondition={!!editCard.productCode} blurCondition={false}>
      <div className={classes.contentContainer}>
        <div className={classes.title}>Укажите артикул товара согласно своей внутренней системы учета</div>
        <input className={classes.customSizeInput} value={editCard.productCode} onChange={onChangeInput} type="text" />
      </div>
    </SectionContainer>
  );
};

export default ProductCodeSection;
