import React from 'react';
import classes from './ImagesList.module.css';
import ImageCard from './ImageCard/ImageCard';
import { useAppSelector } from '../../../../../../hooks/hooks';
import { selectorNewCard } from '../../../../../../store/newCardSlice';

const ImagesList: React.FC = () => {
  const newCard = useAppSelector(selectorNewCard);

  return (
    <div className={classes.container}>
      {newCard.images.map((imageUrl, ind) => {
        return <ImageCard key={ind} imageUrl={imageUrl} />;
      })}
      {newCard.images.length <= 2 && <ImageCard isAddImageCard />}
    </div>
  );
};

export default ImagesList;