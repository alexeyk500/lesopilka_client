import React, { useEffect } from 'react';
import classes from './ProductSizesSection.module.css';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { SizeTypeEnum, ProductCardType } from '../../../../../types/types';
import SectionContainer from '../SectionContainer/SectionContainer';
import { clearEditCard, selectorEditCard } from '../../../../../store/productSlice';
import { CALIBER_PRODUCT_CATEGORIES } from '../../../../../utils/constants';
import SizeSelector from './SizeSelector/SizeSelector';

export const getSizesSectionIndicator = (productCard: ProductCardType) => {
  if (productCard.categoryId && CALIBER_PRODUCT_CATEGORIES.includes(productCard.categoryId)) {
    const result =
      productCard.caliber && Number(productCard.caliber) > 0 && productCard.length && Number(productCard.length) > 0;
    return Boolean(result);
  }
  const result =
    productCard.height &&
    Number(productCard.height) > 0 &&
    productCard.width &&
    Number(productCard.width) > 0 &&
    productCard.length &&
    Number(productCard.length) > 0;
  return Boolean(result);
};

const ProductSizesSection = () => {
  const dispatch = useAppDispatch();
  const editCard = useAppSelector(selectorEditCard);

  useEffect(() => {
    return () => {
      dispatch(clearEditCard());
    };
  }, [dispatch]);

  return (
    <SectionContainer title={'Размеры'} completeCondition={getSizesSectionIndicator(editCard)} blurCondition={false}>
      <div className={classes.rowContainer}>
        {editCard.categoryId && CALIBER_PRODUCT_CATEGORIES.includes(editCard.categoryId) ? (
          <SizeSelector title={'Диаметр'} sizeType={SizeTypeEnum.caliber} />
        ) : (
          <>
            <SizeSelector title={'Толщина'} sizeType={SizeTypeEnum.height} />
            <SizeSelector title={'Ширина'} sizeType={SizeTypeEnum.width} />
          </>
        )}
        <SizeSelector title={'Длинна'} sizeType={SizeTypeEnum.length} />
      </div>
    </SectionContainer>
  );
};

export default ProductSizesSection;
