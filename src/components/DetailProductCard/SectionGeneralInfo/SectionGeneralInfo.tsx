import React from 'react';
import classes from './SectionGeneralInfo.module.css';
import { ProductType, SepticEnum } from '../../../types/types';
import starIco from '../../../img/starIco.svg';
import cartIco from '../../../img/cartIco.svg';

type PropsType = {
  product: ProductType;
};

const SectionGeneralInfo: React.FC<PropsType> = ({ product }) => {
  return (
    <div className={classes.container}>
      <div className={classes.topRowContainer}>
        <div className={classes.title}>{product.subCategory?.title}</div>
        <div className={classes.btnGroup}>
          <div className={classes.starIcoContainer}>
            <img src={starIco} className={classes.starIco} alt="favorite" />
          </div>
          <img src={cartIco} className={classes.cartIco} alt="to cart" />
        </div>
      </div>
      <div className={classes.info}>
        {product.material?.title && <div className={classes.infoItem}>{product.material?.title}, </div>}
        {product.sort?.title && <div className={classes.infoItem}>{product.sort?.title}, </div>}
        {product.isSeptic ? (
          <div className={classes.infoItem}>{SepticEnum.septic}</div>
        ) : (
          <div className={classes.infoItem}>{SepticEnum.noSeptic}</div>
        )}
      </div>
      <div className={classes.infoManufacturer}>
        {product.manufacturer.title}, {product.manufacturer.address.location.title}
      </div>
    </div>
  );
};

export default SectionGeneralInfo;
