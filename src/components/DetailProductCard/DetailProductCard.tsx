import React, { useCallback, useRef } from 'react';
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
};

const DetailProductCard: React.FC<PropsType> = ({ divId, popUpRoot, product }) => {
  const refContent = useRef<HTMLDivElement | null>(null);
  useClickOutsideElement(refContent, () => {
    destroyPopUp();
  });

  const destroyPopUp = useCallback(() => {
    popUpRoot.unmount();
    const div = document.getElementById(divId);
    if (div) {
      div.parentNode?.removeChild(div);
    }
  }, [divId, popUpRoot]);

  console.log('product =', product);

  return (
    <div className={classes.container}>
      <div ref={refContent} className={classes.content}>
        <ImageSlider destroyPopUp={destroyPopUp} images={product.images} />
        <div className={classes.infoContainer}>
          <SectionGeneralInfo product={product} />
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

export const showDetailProductCardPopUp = (product: ProductType) => {
  const div = document.createElement('div');
  div.id = 'productCardPopUp' + new Date().getTime();
  document.body.append(div);
  const popUpContainer = document.getElementById(div.id)!;
  const popUpRoot = createRoot(popUpContainer);
  popUpRoot.render(<DetailProductCard divId={div.id} popUpRoot={popUpRoot} product={product} />);
};
