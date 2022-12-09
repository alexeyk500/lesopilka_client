import React from 'react';
import { ProductType } from '../../../../../types/types';
import classes from './PriceListProductItem.module.css';
import { getProductSizesStr } from '../../../../../utils/functions';
import visibilityIcoOff from '../../../../../img/visibilityIcoOff.svg';
import editBlueIco from '../../../../../img/editBlueIco.svg';

type PropsType = {
  product: ProductType;
};

const PriceListProductItem: React.FC<PropsType> = ({ product }) => {
  const productSizes = getProductSizesStr(product);

  return (
    <div className={classes.container}>
      <div className={classes.infoRow}>
        <div className={classes.sizeContainer}>{productSizes}</div>
        <div className={classes.materialContainer}>{product.material?.title}</div>
        <div className={classes.sortContainer}>{product.sort?.title}</div>
        <div className={classes.codeContainer}>{product.code}</div>
        <div className={classes.priceContainer}>{product.price}</div>
        <div className={classes.actionsContainer}>
          <div className={classes.visibilityIcoContainer}>
            <img className={classes.visibilityIco} src={visibilityIcoOff} alt="visibilityOff" />
          </div>
          <div className={classes.editIcoContainer}>
            <img className={classes.editBlueIco} src={editBlueIco} alt="visibilityOff" />
          </div>
        </div>
      </div>

      <div className={classes.delimiter} />
    </div>
  );
};

export default PriceListProductItem;
