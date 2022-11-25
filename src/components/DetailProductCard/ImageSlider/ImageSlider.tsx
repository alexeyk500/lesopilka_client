import React, { useState } from 'react';
import classes from './ImageSlider.module.css';
import btnCloseSliderIco from './../../../img/btnCloseSliderIco.svg';
import btnRightSliderIco from './../../../img/btnRightSliderIco.svg';
import btnLeftSliderIco from './../../../img/btnLeftSliderIco.svg';

type PropsType = {
  destroyPopUp: () => void;
  images?: string[];
};

const ImageSlider: React.FC<PropsType> = ({ destroyPopUp, images }) => {
  const [ind, setInd] = useState<number>(0);
  const imagesLength = images?.length;

  const onClickLeft = () => {
    imagesLength &&
      imagesLength > 1 &&
      setInd((prev) => {
        return prev <= 0 ? imagesLength - 1 : prev - 1;
      });
  };

  const onClickRight = () => {
    imagesLength &&
      imagesLength > 1 &&
      setInd((prev) => {
        return prev >= imagesLength - 1 ? 0 : prev + 1;
      });
  };

  return (
    <div className={classes.container}>
      <button className={classes.btnClose} onClick={destroyPopUp}>
        <img src={btnCloseSliderIco} alt="close button" />
      </button>
      {imagesLength && imagesLength > 1 && (
        <button className={classes.btnLeft} onClick={onClickLeft}>
          <img src={btnLeftSliderIco} alt="left button" />
        </button>
      )}
      {imagesLength && imagesLength > 1 && (
        <button className={classes.btnRight} onClick={onClickRight}>
          <img src={btnRightSliderIco} alt="right button" />
        </button>
      )}
      <div className={classes.imageContainer}>
        {!!images?.length ? (
          <img className={classes.img} src={images[ind]} alt="product" />
        ) : (
          <div>Изображений нет</div>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
