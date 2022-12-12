import React from 'react';
import classes from './PriceListGroupTitle.module.css';
import { DriedEnum, OptionsType, SepticEnum } from '../../../../../types/types';

type PropsType = {
  subCategory: OptionsType | undefined;
  isDried: boolean;
  isSeptic: boolean;
};

const PriceListGroupTitle: React.FC<PropsType> = ({ subCategory, isDried, isSeptic }) => {
  const isDriedTitle = isDried ? `${DriedEnum.dried.toLowerCase()}` : `${DriedEnum.noDried.toLowerCase()}`;
  const isSepticTitle = isSeptic ? `, ${SepticEnum.septic.toLowerCase()}` : '';

  return (
    <div className={classes.container}>
      <div className={classes.subCategoryRow}>
        {`${subCategory?.title}`}
        <span className={classes.optionsTitle}>&nbsp;{`(${isDriedTitle}${isSepticTitle})`}</span>
      </div>
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
