import React from 'react';
import classes from './ImagesList.module.css';
import ImageCard from './ImageCard/ImageCard';

type PropsType = {
  productId: number;
  images?: string[];
};

const ImagesList: React.FC<PropsType> = ({ productId, images }) => {
  return (
    <div className={classes.container}>
      {images?.map((imageUrl, ind) => {
        return <ImageCard key={ind} productId={productId} imageUrl={imageUrl} />;
      })}
      {images && images.length <= 2 && <ImageCard productId={productId} isAddImageCard />}
    </div>
  );
};

export default ImagesList;
