import React from 'react';
import classes from './PriceListGroupTitle.module.css';
import { OptionsType } from '../../../../../types/types';

type PropsType = {
  subCategory: OptionsType;
};

const PriceListGroupTitle: React.FC<PropsType> = ({ subCategory }) => {
  return (
    <div className={classes.container}>
      <div className={classes.subCategoryRow}>{subCategory.title}</div>
      <div className={classes.delimiter} />
      <div className={classes.titlesRow}>
        <div className={classes.sizeContainer}>Размеры, мм</div>
        <div className={classes.materialContainer}>Тип древисины</div>
        <div className={classes.sortContainer}>Сорт</div>
        <div className={classes.codeContainer}>Артикул</div>
        <div className={classes.priceContainer}>руб/шт</div>
        <div className={classes.actionsContainer}>Действия</div>
      </div>
      <div className={classes.delimiter} />
    </div>
  );
};

export default PriceListGroupTitle;
