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
  const price = Number(product.price);
  const height = Number(product.height);
  const width = Number(product.width);
  const length = Number(product.length);
  const caliber = Number(product.caliber);

  const priceForSquareMeter = getPriceForSquareMeter({ width, length, price });
  const priceForCubicMeter = getPriceForCubicMeter({ height, width, length, price });
  const priceForCubicMeterCaliber = getPriceForCubicMeterCaliber({ caliber, length, price });

  return (
    <div className={classes.container}>
      <div className={classes.pricesContainer}>
        <div className={classes.infoRow}>
          <div className={classes.sizeTitle}>Цена за 1 шт.</div>- {formatPrice(price)} руб
        </div>
        {!caliber && (
          <div className={classes.infoRow}>
            <div className={classes.sizeTitle}>Цена за м.кв.</div>- {formatPrice(priceForSquareMeter)} руб{' '}
            <span className={classes.topStar}>*</span>
          </div>
        )}
        <div className={classes.infoRow}>
          <div className={classes.sizeTitle}>Цена за м.куб.</div>-{' '}
          {caliber ? formatPrice(priceForCubicMeterCaliber) : formatPrice(priceForCubicMeter)} руб{' '}
          <span className={classes.topStar}>*</span>
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
