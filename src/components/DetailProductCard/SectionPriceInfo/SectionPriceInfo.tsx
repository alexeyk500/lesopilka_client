import React from 'react';
import classes from './SectionPriceInfo.module.css';
import { ProductType } from '../../../types/types';
import {
  formatPrice,
  getPriceForCubicMeter,
  getPriceForCubicMeterCaliber,
  getPriceForSquareMeter,
} from '../../../utils/functions';

type PropsType = {
  product: ProductType;
};

const SectionPriceInfo: React.FC<PropsType> = ({ product }) => {
  const price = formatPrice(product.price);
  const height = product.height;
  const width = product.width;
  const length = product.length;
  const caliber = product.caliber;

  const priceForSquareMeter = formatPrice(getPriceForSquareMeter({ width, length, price }));
  const priceForCubicMeter = formatPrice(getPriceForCubicMeter({ height, width, length, price }));
  const priceForCubicMeterCaliber = formatPrice(getPriceForCubicMeterCaliber({ caliber, length, price }));

  return (
    <div className={classes.container}>
      <div className={classes.pricesContainer}>
        <div className={classes.infoRow}>
          <div className={classes.sizeTitle}>Цена за 1 шт.</div>- {price} руб
        </div>
        {!caliber && (
          <div className={classes.infoRow}>
            <div className={classes.sizeTitle}>Цена за м.кв.</div>- {priceForSquareMeter} руб{' '}
            <span className={classes.topStar}>*</span>
          </div>
        )}
        <div className={classes.infoRow}>
          <div className={classes.sizeTitle}>Цена за м.куб.</div>-{' '}
          {caliber ? priceForCubicMeterCaliber : priceForCubicMeter} руб <span className={classes.topStar}>*</span>
        </div>
      </div>
      <div className={classes.definitionContainer}>
        <div className={classes.definitionTitle}>
          <span className={classes.topStarDefinition}>*</span>
          {`- расчитывается автоматически`}
        </div>
      </div>
    </div>
  );
};

export default SectionPriceInfo;
