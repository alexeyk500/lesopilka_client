import React from 'react';
import classes from './ProductImagesSection.module.css';
import SectionContainer from '../SectionContainer/SectionContainer';
import ImagesList from './ImagesList/ImagesList';
import { useAppSelector } from '../../../../../hooks/hooks';
import { selectorEditCard } from '../../../../../store/productSlice';

const ProductImagesSection: React.FC = () => {
  const editCard = useAppSelector(selectorEditCard);

  return (
    <SectionContainer title={'Фото'} completeCondition={!!editCard.images?.length}>
      <div className={classes.contentContainer}>
        <div className={classes.title}>Загрузите до 3-х изображений товара</div>
        <ImagesList images={editCard.images} productId={editCard.id} />
      </div>
    </SectionContainer>
  );
};

export default ProductImagesSection;
