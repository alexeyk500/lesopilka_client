import React from 'react';
import classes from './ImageCard.module.css';
import addImgButton from '../../../../../../../img/addImageButton.svg';
import { useAppDispatch } from '../../../../../../../hooks/hooks';
import { addImageToNewCardImages, deleteImageFromNewCardImages } from '../../../../../../../store/newCardSlice';
import redRoundDeleteIco from './../../../../../../../img/redRoundDeleteIco.svg';

type PropsType = {
  imageUrl?: string;
  isAddImageCard?: boolean;
};

const ImageCard: React.FC<PropsType> = ({ imageUrl, isAddImageCard }) => {
  const dispatch = useAppDispatch();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const blobUrl = URL.createObjectURL(event.target.files[0]);
      dispatch(addImageToNewCardImages(blobUrl));
    }
  };

  const onClickDelete = () => {
    if (imageUrl) {
      dispatch(deleteImageFromNewCardImages(imageUrl));
    }
  };

  return (
    <div className={classes.container}>
      {isAddImageCard ? (
        <div className={classes.containerAddImageButton}>
          <label className={classes.addImageButton}>
            <img src={addImgButton} className={classes.imgAddButton} alt="add button" />
            <div className={classes.addImageTitle}>Добавить фото</div>
            <input style={{ display: 'none' }} type="file" accept="image/*" multiple={false} onChange={onChange} />
          </label>
        </div>
      ) : (
        <>
          {imageUrl && (
            <>
              <div className={classes.containerImg}>
                <img src={imageUrl} className={classes.img} alt="product" />
              </div>
              <button className={classes.deleteBtn} onClick={onClickDelete}>
                <img src={redRoundDeleteIco} className={classes.imgDeleteBtn} alt="delete" />
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ImageCard;
