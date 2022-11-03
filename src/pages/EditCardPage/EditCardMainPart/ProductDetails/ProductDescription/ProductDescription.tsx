import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorProductCard, setProductDescription } from '../../../../../store/productCardSlice';
import SectionContainer from '../SectionContainer/SectionContainer';
import classes from './ProductDescription.module.css';

const ProductDescription: React.FC = () => {
  const dispatch = useAppDispatch();
  const productCard = useAppSelector(selectorProductCard);

  const onChangeInput: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    dispatch(setProductDescription(event.currentTarget.value ? event.currentTarget.value : undefined));
  };

  return (
    <SectionContainer title={'Описание'} completeCondition={!!productCard.description?.length} blurCondition={false}>
      <div className={classes.contentContainer}>
        <div className={classes.title}>Добавьте дополнительную информацию о товаре до 1000 символов</div>
        <textarea className={classes.customSizeInput} value={productCard.productCode} onChange={onChangeInput} />
      </div>
    </SectionContainer>
  );
};

export default ProductDescription;
