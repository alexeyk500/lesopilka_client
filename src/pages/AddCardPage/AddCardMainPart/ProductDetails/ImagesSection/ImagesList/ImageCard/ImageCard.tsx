import React from 'react';
import classes from './ImageCard.module.css';
import addImgButton from '../../../../../../../img/addImageButton.svg';

type PropsType = {
  isAddImageCard?: boolean;
};

const ImageCard: React.FC<PropsType> = ({ isAddImageCard }) => {
  return (
    <div className={classes.container}>
      {isAddImageCard ? (
        <div className={classes.addImageButton}>
          <img src={addImgButton} className={classes.imgAddButton} alt="add button" />
          <div className={classes.addImageTitle}>Добавить фото</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImageCard;
