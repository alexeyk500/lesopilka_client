import React, { useEffect } from 'react';
import classes from './ProductSizesSection.module.css';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { SizeTypeEnum, ProductCardType } from '../../../../../types/types';
import classNames from 'classnames';
import SectionContainer from '../SectionContainer/SectionContainer';
import { clearEditCard, selectorEditCard } from '../../../../../store/productSlice';
import { CALIBER_PRODUCT_CATEGORIES } from '../../../../../utils/constants';
import SizeSelector from './SizeSelector/SizeSelector';

export const getSizesSectionIndicator = (productCard: ProductCardType) => {
  // if (productCard.categoryId && CALIBER_PRODUCT_CATEGORIES.includes(productCard.categoryId)) {
  //   const result =
  //     ((productCard.caliberId && productCard.caliberId > 0) || productCard.customCaliberValue) &&
  //     ((productCard.lengthId && productCard.lengthId > 0) || productCard.customLengthValue);
  //   return Boolean(result);
  // }
  // const result =
  //   (productCard.heightId || productCard.customHeightValue) &&
  //   ((productCard.widthId && productCard.widthId > 0) || productCard.customWidthValue) &&
  //   ((productCard.lengthId && productCard.lengthId > 0) || productCard.customLengthValue);
  // return Boolean(result);
  return false
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
      <div
        className={classNames(classes.rowContainer, {
          // [classes.rowContainerSlim]: editCard.widthId === -1 || editCard.heightId === -1 || editCard.lengthId === -1,
        })}
      >
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
