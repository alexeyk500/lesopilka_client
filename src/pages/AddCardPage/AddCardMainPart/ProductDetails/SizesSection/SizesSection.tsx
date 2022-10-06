import React from 'react';
import classes from '../LumberSection/LumberSection.module.css';
import CheckIndicator from '../../../../../components/commonComponents/CheckIndicator/CheckIndicator';
import SectionSelector from '../../../../../components/commonComponents/SectionSelector/SectionSelector';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import {
  selectorNewCard,
  setProductCaliberId,
  setProductCustomCaliber,
  setProductCustomHeight,
  setProductCustomLength,
  setProductCustomWidth,
  setProductHeightId,
  setProductLengthId,
  setProductWidthId,
} from '../../../../../store/newCardSlice';
import { selectorCategorySizes } from '../../../../../store/catalogSlice';
import { SizeTypeEnum } from '../../../../../types/types';

const SizesSection = () => {
  const dispatch = useAppDispatch();
  const newCard = useAppSelector(selectorNewCard);
  const allCategorySizes = useAppSelector(selectorCategorySizes);

  const heightSizesRaw = allCategorySizes.filter((categorySize) => categorySize.type === SizeTypeEnum.height);
  const heightSizes = heightSizesRaw.map((size) => {
    return { id: size.id, title: `${size.value} мм` };
  });

  const widthSizesRaw = allCategorySizes.filter((categorySize) => categorySize.type === SizeTypeEnum.width);
  const widthSizes = widthSizesRaw.map((size) => {
    return { id: size.id, title: `${size.value} мм` };
  });

  const lengthSizesRaw = allCategorySizes.filter((categorySize) => categorySize.type === SizeTypeEnum.length);
  const lengthSizes = lengthSizesRaw.map((size) => {
    return { id: size.id, title: `${size.value} мм` };
  });

  const caliberSizesRaw = allCategorySizes.filter((categorySize) => categorySize.type === SizeTypeEnum.caliber);
  const caliberSizes = caliberSizesRaw.map((size) => {
    return { id: size.id, title: `${size.value} мм` };
  });

  const onChangeWidthSelector = (id: number) => {
    dispatch(setProductWidthId(id));
    newCard.customWidth && dispatch(setProductCustomWidth(undefined));
  };

  const onChangeHeightSelector = (id: number) => {
    dispatch(setProductHeightId(id));
    newCard.customHeight && dispatch(setProductCustomHeight(undefined));
  };

  const onChangeLengthSelector = (id: number) => {
    dispatch(setProductLengthId(id));
    newCard.customLength && dispatch(setProductCustomLength(undefined));
  };

  const onChangeCaliberSelector = (id: number) => {
    dispatch(setProductCaliberId(id));
    newCard.customCaliber && dispatch(setProductCustomCaliber(undefined));
  };

  return (
    <div className={classes.container}>
      <CheckIndicator
        title={'Размеры'}
        checked={!!newCard.categoryId && !!newCard.subCategoryId && !!newCard.productMaterialId}
      />
      <div className={classes.rowContainer}>
        {newCard.categoryId === 6 ? (
          <SectionSelector title={'Диаметр'} options={caliberSizes} onChangeSelector={onChangeCaliberSelector} />
        ) : (
          <>
            <SectionSelector title={'Толщина'} options={heightSizes} onChangeSelector={onChangeHeightSelector} />
            <SectionSelector title={'Ширина'} options={widthSizes} onChangeSelector={onChangeWidthSelector} />
          </>
        )}
        <SectionSelector title={'Длинна'} options={lengthSizes} onChangeSelector={onChangeLengthSelector} />
      </div>
    </div>
  );
};

export default SizesSection;
