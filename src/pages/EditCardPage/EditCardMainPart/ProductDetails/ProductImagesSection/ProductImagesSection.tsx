import React from 'react';
import classes from './ProductImagesSection.module.css';
import SectionContainer from '../SectionContainer/SectionContainer';
import ImagesList from './ImagesList/ImagesList';
import { useAppSelector } from '../../../../../hooks/hooks';
import { selectorProductCard } from '../../../../../store/productCardSlice';

const ProductImagesSection: React.FC = () => {
  const productCard = useAppSelector(selectorProductCard);

  return (
    <SectionContainer title={'Фото'} completeCondition={!!productCard.images.length}>
      <div className={classes.contentContainer}>
        <div className={classes.title}>Загрузите до 3-х изображений товара</div>
        <ImagesList />
      </div>
    </SectionContainer>
  );
};

export default ProductImagesSection;
