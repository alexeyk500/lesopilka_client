import React from 'react';
import classes from './SectionSizeInfo.module.css';
import { ProductType } from '../../../types/types';
import { getSizesValue, getSquare, getVolume, getVolumeCaliber, getWeight } from '../../../utils/functions';

type PropsType = {
  product: ProductType;
};

const SectionSizeInfo: React.FC<PropsType> = ({ product }) => {
  const { height, width, length, caliber } = getSizesValue(product);

  const square = getSquare({ width, length }).toFixed(2);
  const volumeItem = getVolume({ height, width, length });
  const volume = volumeItem.toFixed(2);
  const weight = getWeight(volumeItem).toFixed(1);

  const volumeCaliber = getVolumeCaliber({ caliber, length });
  const weightCaliber = getWeight(volumeCaliber);

  return (
    <div className={classes.container}>
      <div className={classes.dimensionColumn}>
        {caliber ? (
          <div className={classes.infoRow}>
            <div className={classes.sizeTitle}>Диаметр</div>- {caliber} мм
          </div>
        ) : (
          <>
            <div className={classes.infoRow}>
              <div className={classes.sizeTitle}>Толщина</div>- {height} мм
            </div>
            <div className={classes.infoRow}>
              <div className={classes.sizeTitle}>Ширина</div>- {width} мм
            </div>
          </>
        )}
        <div className={classes.infoRow}>
          <div className={classes.sizeTitle}>Длинна</div>- {length} мм
        </div>
      </div>
      <div className={classes.calculatedColumn}>
        {caliber ? (
          <div className={classes.calculatedInfoContainer}>
            <div className={classes.infoRow}>
              <div className={classes.sizeTitleCalculated}>Объем 1 шт.</div>- {volumeCaliber} м.куб.
              <span className={classes.topStar}>*</span>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.sizeTitleCalculated}>Вес 1 шт.</div>- {weightCaliber} кг.
              <span className={classes.topStar}>*</span>
            </div>
          </div>
        ) : (
          <div className={classes.calculatedInfoContainer}>
            <div className={classes.infoRow}>
              <div className={classes.sizeTitleCalculated}>Площадь 1 шт.</div>- {square} м.кв.
              <span className={classes.topStar}>*</span>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.sizeTitleCalculated}>Объем 1 шт.</div>- {volume} м.куб.
              <span className={classes.topStar}>*</span>
            </div>
            <div className={classes.infoRow}>
              <div className={classes.sizeTitleCalculated}>Вес 1 шт.</div>- {weight} кг.
              <span className={classes.topStar}>*</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionSizeInfo;
