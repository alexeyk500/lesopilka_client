import React, { useEffect } from 'react';
import classes from './ProductSizesSection.module.css';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { SizeTypeEnum, EditCardSectionsEnum, ProductType } from '../../../../../types/types';
import SectionContainer from '../SectionContainer/SectionContainer';
import { clearEditProduct, selectorEditProduct } from '../../../../../store/productSlice';
import { CALIBER_PRODUCT_CATEGORIES } from '../../../../../utils/constants';
import SizeSelector from './SizeSelector/SizeSelector';

export const checkSizesSection = (product: ProductType) => {
  if (product.category?.id && CALIBER_PRODUCT_CATEGORIES.includes(product.category.id)) {
    const result = product.caliber && Number(product.caliber) > 0 && product.length && Number(product.length) > 0;
    return Boolean(result);
  }
  const result =
    product.height &&
    Number(product.height) > 0 &&
    product.width &&
    Number(product.width) > 0 &&
    product.length &&
    Number(product.length) > 0;
  return Boolean(result);
};

const ProductSizesSection = () => {
  const dispatch = useAppDispatch();
  const editProduct = useAppSelector(selectorEditProduct);

  useEffect(() => {
    return () => {
      dispatch(clearEditProduct());
    };
  }, [dispatch]);

  return (
    <SectionContainer
      title={EditCardSectionsEnum.sizes}
      completeCondition={checkSizesSection(editProduct)}
      blurCondition={false}
    >
      <div className={classes.rowContainer}>
        {editProduct.category?.id && CALIBER_PRODUCT_CATEGORIES.includes(editProduct.category.id) ? (
          <SizeSelector title={'Диаметр'} sizeType={SizeTypeEnum.caliber} dataTestId={SizeTypeEnum.caliber} />
        ) : (
          <>
            <SizeSelector title={'Толщина'} sizeType={SizeTypeEnum.height} dataTestId={SizeTypeEnum.height} />
            <SizeSelector title={'Ширина'} sizeType={SizeTypeEnum.width} dataTestId={SizeTypeEnum.width} />
          </>
        )}
        <SizeSelector title={'Длинна'} sizeType={SizeTypeEnum.length} dataTestId={SizeTypeEnum.length} />
      </div>
    </SectionContainer>
  );
};

export default ProductSizesSection;
