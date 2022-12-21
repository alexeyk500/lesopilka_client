import React, { useCallback, useEffect, useRef, useState } from 'react';
import classes from './DetailProductCard.module.css';
import { ProductType } from '../../types/types';
import { createRoot, Root } from 'react-dom/client';
import useClickOutsideElement from '../../hooks/useClickOutsideElement';
import ImageSlider from './ImageSlider/ImageSlider';
import SectionGeneralInfo from './SectionGeneralInfo/SectionGeneralInfo';
import SectionSizeInfo from './SectionSizeInfo/SectionSizeInfo';
import SectionDescription from './SectionDescription/SectionDescription';
import SectionPriceInfo from './SectionPriceInfo/SectionPriceInfo';
import SectionReviews from './SectionReviews/SectionReviews';

type PropsType = {
  divId: string;
  popUpRoot: Root;
  product: ProductType;
  basketProducts: ProductType[];
  onClose: (result: CloseDetailCardType) => void;
};

const DetailProductCard: React.FC<PropsType> = ({ divId, popUpRoot, product, basketProducts, onClose }) => {
  const refContent = useRef<HTMLDivElement | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInBasket, setIsInBasket] = useState(false);
  useClickOutsideElement(refContent, () => {
    destroyPopUp();
  });

  const destroyPopUp = useCallback(() => {
    onClose({ productId: product.id, isFavorite, isInBasket });
    popUpRoot.unmount();
    const div = document.getElementById(divId);
    if (div) {
      div.parentNode?.removeChild(div);
    }
  }, [divId, popUpRoot, isFavorite, isInBasket, onClose, product.id]);

  useEffect(() => {
    const basketProductIds = basketProducts.map((basketProduct) => basketProduct.id);
    if (basketProductIds.includes(product.id)) {
      setIsInBasket(true);
    }
  }, [product, basketProducts]);

  const onClickToggleBasket = () => {
    setIsInBasket((prev) => !prev);
  };

  return (
    <div className={classes.container}>
      <div ref={refContent} className={classes.content}>
        <ImageSlider destroyPopUp={destroyPopUp} images={product.images} />
        <div className={classes.infoContainer}>
          <SectionGeneralInfo product={product} isInBasket={isInBasket} onClickToggleBasket={onClickToggleBasket} />
          <div className={classes.delimiter} />
          <SectionSizeInfo product={product} />
          <div className={classes.delimiter} />
          <SectionDescription description={product.description} />
          <div className={classes.delimiter} />
          <SectionPriceInfo product={product} />
          <div className={classes.delimiter} />
          <SectionReviews />
        </div>
      </div>
    </div>
  );
};

export type CloseDetailCardType = {
  productId: number;
  isFavorite: boolean;
  isInBasket: boolean;
};

export const showDetailProductCardPopUp = (
  product: ProductType,
  basketProducts: ProductType[],
  onClose: (result: CloseDetailCardType) => void
) => {
  const div = document.createElement('div');
  div.id = 'productCardPopUp' + new Date().getTime();
  document.body.append(div);
  const popUpContainer = document.getElementById(div.id)!;
  const popUpRoot = createRoot(popUpContainer);
  popUpRoot.render(
    <DetailProductCard
      divId={div.id}
      popUpRoot={popUpRoot}
      product={product}
      basketProducts={basketProducts}
      onClose={onClose}
    />
  );
};
