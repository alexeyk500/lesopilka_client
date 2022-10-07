import React from 'react';
import classes from './ImagesSection.module.css';
import SectionContainer from '../SectionContainer/SectionContainer';
import ImagesList from './ImagesList/ImagesList';

const ImagesSection: React.FC = () => {
  return (
    <SectionContainer title={'Фото'} completeCondition={false}>
      <div className={classes.contentContainer}>
        <div className={classes.title}>Загрузите до 3-х изображений товара</div>
        <ImagesList />
      </div>
    </SectionContainer>
  );
};

export default ImagesSection;
