import React from 'react';
import classes from './SizesSection.module.css';
import CheckIndicator from '../../../../../components/commonComponents/CheckIndicator/CheckIndicator';
import SectionSelector from '../../../../../components/commonComponents/SectionSelector/SectionSelector';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import {
  selectorNewCard,
  setNewCardProductCaliberId,
  setNewCardProductCustomCaliber,
  setNewCardProductCustomHeight,
  setNewCardProductCustomLength,
  setNewCardProductCustomWidth,
  setNewCardProductHeightId,
  setNewCardProductLengthId,
  setNewCardProductWidthId,
} from '../../../../../store/newCardSlice';
import { selectorCategorySizes } from '../../../../../store/catalogSlice';
import { SizeTypeEnum } from '../../../../../types/types';

const SizesSection = () => {
  const dispatch = useAppDispatch();
  const newCard = useAppSelector(selectorNewCard);
  const allCategorySizes = useAppSelector(selectorCategorySizes);

  const heightSizesRaw = allCategorySizes.filter(
    (categorySize) =>
      categorySize.categoryId === newCard.categoryId &&
      !categorySize.isCustomSize &&
      categorySize.type === SizeTypeEnum.height
  );
  const heightSizes = heightSizesRaw.map((size) => {
    return { id: size.id, title: `${size.value} мм` };
  });

  const widthSizesRaw = allCategorySizes.filter(
    (categorySize) =>
      categorySize.categoryId === newCard.categoryId &&
      !categorySize.isCustomSize &&
      categorySize.type === SizeTypeEnum.width
  );
  const widthSizes = widthSizesRaw.map((size) => {
    return { id: size.id, title: `${size.value} мм` };
  });

  const lengthSizesRaw = allCategorySizes.filter(
    (categorySize) =>
      categorySize.categoryId === newCard.categoryId &&
      !categorySize.isCustomSize &&
      categorySize.type === SizeTypeEnum.length
  );
  const lengthSizes = lengthSizesRaw.map((size) => {
    return { id: size.id, title: `${size.value} мм` };
  });

  const caliberSizesRaw = allCategorySizes.filter(
    (categorySize) =>
      categorySize.categoryId === newCard.categoryId &&
      !categorySize.isCustomSize &&
      categorySize.type === SizeTypeEnum.caliber
  );
  const caliberSizes = caliberSizesRaw.map((size) => {
    return { id: size.id, title: `${size.value} мм` };
  });

  const selectedHeightId = heightSizes.find((heightSize) => heightSize.id === newCard.heightId);
  const selectedWidthId = widthSizes.find((widthSize) => widthSize.id === newCard.widthId);
  const selectedLengthId = lengthSizes.find((lengthSize) => lengthSize.id === newCard.lengthId);
  const selectedCaliberId = caliberSizes.find((caliberSizes) => caliberSizes.id === newCard.caliberId);

  const onChangeWidthSelector = (id: number) => {
    dispatch(setNewCardProductWidthId(id));
    newCard.customWidth && dispatch(setNewCardProductCustomWidth(undefined));
  };

  const onChangeHeightSelector = (id: number) => {
    dispatch(setNewCardProductHeightId(id));
    newCard.customHeight && dispatch(setNewCardProductCustomHeight(undefined));
  };

  const onChangeLengthSelector = (id: number) => {
    dispatch(setNewCardProductLengthId(id));
    newCard.customLength && dispatch(setNewCardProductCustomLength(undefined));
  };

  const onChangeCaliberSelector = (id: number) => {
    dispatch(setNewCardProductCaliberId(id));
    newCard.customCaliber && dispatch(setNewCardProductCustomCaliber(undefined));
  };

  return (
    <div className={classes.container}>
      <CheckIndicator
        title={'Размеры'}
        checked={!!newCard.categoryId && !!newCard.subCategoryId && !!newCard.productMaterialId}
      />
      <div className={classes.rowContainer}>
        {newCard.categoryId === 6 ? (
          <SectionSelector
            title={'Диаметр'}
            options={caliberSizes}
            selectedOption={selectedCaliberId}
            customOptionTitle={'Другой размер'}
            onChangeSelector={onChangeCaliberSelector}
          />
        ) : (
          <>
            <SectionSelector
              title={'Толщина'}
              options={heightSizes}
              selectedOption={selectedHeightId}
              customOptionTitle={'Другой размер'}
              onChangeSelector={onChangeHeightSelector}
            />
            <SectionSelector
              title={'Ширина'}
              options={widthSizes}
              selectedOption={selectedWidthId}
              customOptionTitle={'Другой размер'}
              onChangeSelector={onChangeWidthSelector}
            />
          </>
        )}
        <SectionSelector
          title={'Длинна'}
          options={lengthSizes}
          selectedOption={selectedLengthId}
          customOptionTitle={'Другой размер'}
          onChangeSelector={onChangeLengthSelector}
        />
      </div>
    </div>
  );
};

export default SizesSection;
