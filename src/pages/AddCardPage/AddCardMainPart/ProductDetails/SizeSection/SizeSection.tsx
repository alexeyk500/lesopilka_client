import React from 'react';
import CheckIndicator from '../../../../../components/commonComponents/CheckIndicator/CheckIndicator';
import classes from './SizeSection.module.css';
import { SizeTypeEnum } from '../../../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorCategorySizes } from '../../../../../store/catalogSlice';
import CheckBoxBlue from '../../../../../components/commonComponents/CheckBoxBlue/CheckBoxBlue';
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

type PropsType = {
  sizeType: SizeTypeEnum;
};

const onlyDigitRegExp = /^[0-9\b]+$/;

const SizeSection: React.FC<PropsType> = ({ sizeType }) => {
  const dispatch = useAppDispatch();
  const newCard = useAppSelector(selectorNewCard);
  const allCategorySizes = useAppSelector(selectorCategorySizes);

  const categorySizes = allCategorySizes.filter(
    (categorySize) =>
      categorySize.categoryId === newCard.categoryId && !categorySize.isCustomSize && categorySize.type === sizeType
  );

  const sectionTitle =
    sizeType === SizeTypeEnum.height
      ? 'Толщина'
      : sizeType === SizeTypeEnum.width
      ? 'Ширина'
      : sizeType === SizeTypeEnum.length
      ? 'Длинна'
      : sizeType === SizeTypeEnum.caliber
      ? 'Диаметр'
      : 'Ошибка';

  const customSize =
    sizeType === SizeTypeEnum.height
      ? newCard.customHeight
      : sizeType === SizeTypeEnum.width
      ? newCard.customWidth
      : sizeType === SizeTypeEnum.length
      ? newCard.customLength
      : sizeType === SizeTypeEnum.caliber
      ? newCard.customCaliber
      : '';

  const isCheckedIndicator =
    sizeType === SizeTypeEnum.height && (newCard.heightId || newCard.customHeight)
      ? true
      : sizeType === SizeTypeEnum.width && (newCard.widthId || newCard.customWidth)
      ? true
      : sizeType === SizeTypeEnum.length && (newCard.lengthId || newCard.customLength)
      ? true
      : !!(sizeType === SizeTypeEnum.caliber && (newCard.caliberId || newCard.customCaliber));

  const getIsCheckedCheckBox = (id: string) => {
    if (sizeType === SizeTypeEnum.height && newCard.heightId === id) {
      return true;
    }
    if (sizeType === SizeTypeEnum.width && newCard.widthId === id) {
      return true;
    }
    if (sizeType === SizeTypeEnum.length && newCard.lengthId === id) {
      return true;
    }
    if (sizeType === SizeTypeEnum.caliber && newCard.caliberId === id) {
      return true;
    }
    return false;
  };

  const onChangeCustomSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || onlyDigitRegExp.test(e.target.value)) {
      if (sizeType === SizeTypeEnum.height) {
        dispatch(setProductCustomHeight(e.currentTarget.value));
        newCard.heightId && dispatch(setProductHeightId(undefined));
      }
      if (sizeType === SizeTypeEnum.width) {
        dispatch(setProductCustomWidth(e.currentTarget.value));
        newCard.widthId && dispatch(setProductWidthId(undefined));
      }
      if (sizeType === SizeTypeEnum.length) {
        dispatch(setProductCustomLength(e.currentTarget.value));
        newCard.lengthId && dispatch(setProductLengthId(undefined));
      }
      if (sizeType === SizeTypeEnum.caliber) {
        dispatch(setProductCustomCaliber(e.currentTarget.value));
        newCard.caliberId && dispatch(setProductCaliberId(undefined));
      }
    }
  };

  const onSelect = (id: string) => {
    if (sizeType === SizeTypeEnum.height) {
      dispatch(setProductHeightId(id));
      newCard.customHeight && dispatch(setProductCustomHeight(undefined));
    }
    if (sizeType === SizeTypeEnum.width) {
      dispatch(setProductWidthId(id));
      newCard.customWidth && dispatch(setProductCustomWidth(undefined));
    }
    if (sizeType === SizeTypeEnum.length) {
      dispatch(setProductLengthId(id));
      newCard.customLength && dispatch(setProductCustomLength(undefined));
    }
    if (sizeType === SizeTypeEnum.caliber) {
      dispatch(setProductCaliberId(id));
      newCard.customCaliber && dispatch(setProductCustomCaliber(undefined));
    }
  };

  const onInputFocus = () => {
    if (sizeType === SizeTypeEnum.height) {
      newCard.heightId && dispatch(setProductHeightId(undefined));
    }
    if (sizeType === SizeTypeEnum.width) {
      newCard.widthId && dispatch(setProductWidthId(undefined));
    }
    if (sizeType === SizeTypeEnum.length) {
      newCard.lengthId && dispatch(setProductLengthId(undefined));
    }
    if (sizeType === SizeTypeEnum.caliber) {
      newCard.caliberId && dispatch(setProductCaliberId(undefined));
    }
  };

  if (newCard.categoryId === '6' && sizeType !== SizeTypeEnum.caliber && sizeType !== SizeTypeEnum.length) {
    return null;
  }

  return (
    <div className={classes.container}>
      <CheckIndicator title={sectionTitle} checked={isCheckedIndicator} />
      <div className={classes.optionsContainer}>
        {categorySizes.map((categorySize) => {
          return (
            <CheckBoxBlue
              key={categorySize.id}
              id={categorySize.id}
              title={`${categorySize.value} мм`}
              checked={getIsCheckedCheckBox(categorySize.id)}
              onSelect={onSelect}
            />
          );
        })}
        {!!categorySizes.length && (
          <div className={classes.customSizeContainer}>
            {'Другой размер'}
            <input
              className={classes.customSizeInput}
              value={customSize || ''}
              onChange={onChangeCustomSize}
              type="text"
              onFocus={onInputFocus}
            />
            {'мм'}
          </div>
        )}
      </div>
      {!newCard.categoryId && (
        <div className={classes.placeHolderContainer}>
          <div className={classes.placeHolderTitle}>Пиломатериал не выбран</div>
        </div>
      )}
    </div>
  );
};

export default SizeSection;
