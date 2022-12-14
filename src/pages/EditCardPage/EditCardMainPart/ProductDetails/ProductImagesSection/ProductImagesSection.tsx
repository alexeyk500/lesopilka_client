import React from 'react';
import classes from './ProductImagesSection.module.css';
import SectionContainer from '../SectionContainer/SectionContainer';
import ImagesList from './ImagesList/ImagesList';
import { useAppSelector } from '../../../../../hooks/hooks';
import { selectorEditProduct } from '../../../../../store/productSlice';
import { EditCardSectionsEnum, ProductType } from '../../../../../types/types';

export const checkImagesSection = (product: ProductType) => {
  return !!product.images?.length;
};

const ProductImagesSection: React.FC = () => {
  const editCard = useAppSelector(selectorEditProduct);
  const isCompleteCheckSizesSection = checkImagesSection(editCard);
  return (
    <SectionContainer title={EditCardSectionsEnum.images} completeCondition={isCompleteCheckSizesSection}>
      <div className={classes.contentContainer}>
        <div className={classes.title}>Загрузите до 3-х изображений товара</div>
        <ImagesList images={editCard.images} productId={editCard.id} />
      </div>
    </SectionContainer>
  );
};

export default ProductImagesSection;
