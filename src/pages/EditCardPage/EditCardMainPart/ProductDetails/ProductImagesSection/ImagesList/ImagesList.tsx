import React from 'react';
import classes from './ImagesList.module.css';
import ImageCard from './ImageCard/ImageCard';
import { useAppSelector } from '../../../../../../hooks/hooks';
import { selectorProductCard } from '../../../../../../store/productCardSlice';

const ImagesList: React.FC = () => {
  const productCard = useAppSelector(selectorProductCard);

  return (
    <div className={classes.container}>
      {productCard.images.map((imageUrl, ind) => {
        return <ImageCard key={ind} imageUrl={imageUrl} />;
      })}
      {productCard.images.length <= 2 && <ImageCard isAddImageCard />}
    </div>
  );
};

export default ImagesList;
