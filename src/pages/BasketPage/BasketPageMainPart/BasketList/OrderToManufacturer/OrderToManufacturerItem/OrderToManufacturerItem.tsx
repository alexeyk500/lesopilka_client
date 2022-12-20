import React from 'react';
import classes from './OrderToManufacturerItem.module.css';
import { DriedEnum, ProductType, SepticEnum } from '../../../../../../types/types';
import { formatPrice, getProductSizesStr } from '../../../../../../utils/functions';
import AmountInput from '../../../../../../components/AmountInput/AmountInput';
import viewIco from '../../../../../../img/visibilityIcoOn.svg';
import deleteIco from '../../../../../../img/deleteBlueIco.svg';

type PropsType = {
  num: number;
  product: ProductType;
};

const OrderToManufacturerItem: React.FC<PropsType> = ({ num, product }) => {
  const productSizes = getProductSizesStr(product);

  return (
    <div className={classes.container}>
      <div className={classes.numTitle}>{num}</div>
      <div className={classes.imageContainer}>
        {product.images?.[0] ? (
          <img src={product.images?.[0] || ''} className={classes.img} alt="product" />
        ) : (
          <div>No image</div>
        )}
      </div>
      <div className={classes.descriptionContainer}>
        <div className={classes.descriptionRow}>
          {product.subCategory?.title}
          {productSizes && `, ${productSizes} мм`}
        </div>
        <div className={classes.descriptionRow}>
          {product.material?.title.toLowerCase()}
          {product.sort?.title && `, ${product.sort?.title}`.toLowerCase()}
          {product.isSeptic && `, ${SepticEnum.septic}`.toLowerCase()}
          {product.isDried ? `, ${DriedEnum.dried}`.toLowerCase() : `, ${DriedEnum.noDried}`.toLowerCase()}
        </div>
        <div className={classes.descriptionRow}>{`артикул: ${product.code}`}</div>
      </div>
      <div className={classes.priceContainer}>
        <div className={classes.priceRow}>{formatPrice(product?.price)}</div>
        <div className={classes.priceRowLow}>{'руб.шт'}</div>
      </div>
      <div className={classes.amountColumn}>
        <AmountInput />
        <div className={classes.amountInfo}>
          <div className={classes.amountInfoWeight}>{`${125.0} кг.`}</div>
          <div className={classes.amountInfoSquare}>{`${34.7} м.кв.`}</div>
          <div className={classes.amountInfoVolume}>{`${2.5} м.куб.`}</div>
        </div>
      </div>
      <div className={classes.summColumn}>{`1245.88 руб.`}</div>
      <div className={classes.actionsColumn}>
        <div className={classes.actionContainer}>
          <img src={viewIco} className={classes.viewIco} alt="view" />
        </div>
        <div className={classes.actionContainer}>
          <img src={deleteIco} className={classes.deleteIco} alt="view" />
        </div>
      </div>
    </div>
  );
};

export default OrderToManufacturerItem;
