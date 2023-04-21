import React from 'react';
import classes from './ImageCard.module.css';
import addImgButton from '../../../../../../../img/addImageButton.svg';
import { useAppDispatch } from '../../../../../../../hooks/hooks';
import redRoundDeleteIco from './../../../../../../../img/redRoundDeleteIco.svg';
import { deleteProductPictureThunk, uploadPictureToProductThunk } from '../../../../../../../store/productSlice';

type PropsType = {
  productId?: number;
  imageUrl?: string;
  isAddImageCard?: boolean;
};

const ImageCard: React.FC<PropsType> = ({ imageUrl, isAddImageCard, productId }) => {
  const dispatch = useAppDispatch();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (productId && event.target && event.target.files && event.target.files[0]) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      const img = event.target.files[0];
      event.target.value = '';
      if (token && img) {
        dispatch(uploadPictureToProductThunk({ token, productId, img }));
      }
    }
  };

  const onClickDelete = () => {
    if (productId && imageUrl) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      const fileName = imageUrl.split('/').pop();
      if (token && fileName) {
        dispatch(deleteProductPictureThunk({ token, productId, fileName }));
      }
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
                <img src={imageUrl} className={classes.imgProduct} alt="product" />
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
