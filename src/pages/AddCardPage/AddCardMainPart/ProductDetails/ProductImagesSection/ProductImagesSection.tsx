import React from 'react';
import classes from './ProductImagesSection.module.css';
import SectionContainer from '../SectionContainer/SectionContainer';
import ImagesList from './ImagesList/ImagesList';
import { useAppSelector } from '../../../../../hooks/hooks';
import { selectorNewCard } from '../../../../../store/newCardSlice';

const ProductImagesSection: React.FC = () => {
  const newCard = useAppSelector(selectorNewCard);

  return (
    <SectionContainer title={'Фото'} completeCondition={!!newCard.images.length}>
      <div className={classes.contentContainer}>
        <div className={classes.title}>Загрузите до 3-х изображений товара</div>
        <ImagesList />
      </div>
    </SectionContainer>
  );
};

export default ProductImagesSection;
