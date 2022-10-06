import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorCategorySizes } from '../../../../../store/catalogSlice';
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
import classNames from 'classnames';
import classes from './SizeSectionNew.module.css';
import CheckIndicator from '../../../../../components/commonComponents/CheckIndicator/CheckIndicator';
import Selector from '../../../../../components/commonComponents/Selector/Selector';
import { SizeTypeEnum } from '../../../../../types/types';

type PropsType = {
  sizeType: SizeTypeEnum;
};

const onlyDigitRegExp = /^[0-9\b]+$/;

const SizeSectionNew: React.FC<PropsType> = ({ sizeType }) => {
  const dispatch = useAppDispatch();
  const newCard = useAppSelector(selectorNewCard);
  const allCategorySizes = useAppSelector(selectorCategorySizes);

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

  const categorySizesRaw = allCategorySizes.filter(
    (categorySize) =>
      categorySize.categoryId === newCard.categoryId && !categorySize.isCustomSize && categorySize.type === sizeType
  );
  const categorySizes = categorySizesRaw.map((categorySizeRaw) => {
    return { ...categorySizeRaw, title: `${categorySizeRaw.value} мм` };
  });

  const onChangeSelector = (id: number) => {
    if (sizeType === SizeTypeEnum.height) {
      dispatch(setNewCardProductHeightId(id));
      newCard.customHeight && dispatch(setNewCardProductCustomHeight(undefined));
    }
    if (sizeType === SizeTypeEnum.width) {
      dispatch(setNewCardProductWidthId(id));
      newCard.customWidth && dispatch(setNewCardProductCustomWidth(undefined));
    }
    if (sizeType === SizeTypeEnum.length) {
      dispatch(setNewCardProductLengthId(id));
      newCard.customLength && dispatch(setNewCardProductCustomLength(undefined));
    }
    if (sizeType === SizeTypeEnum.caliber) {
      dispatch(setNewCardProductCaliberId(id));
      newCard.customCaliber && dispatch(setNewCardProductCustomCaliber(undefined));
    }
  };

  const showCustomSizeInput =
    sizeType === SizeTypeEnum.height && newCard.heightId === -1
      ? true
      : sizeType === SizeTypeEnum.width && newCard.widthId === -1
      ? true
      : sizeType === SizeTypeEnum.length && newCard.lengthId === -1
      ? true
      : sizeType === SizeTypeEnum.caliber && newCard.caliberId === -1;

  const onChangeCustomSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '' || onlyDigitRegExp.test(e.target.value)) {
      if (sizeType === SizeTypeEnum.height) {
        dispatch(setNewCardProductCustomHeight(e.currentTarget.value));
        // newCard.heightId && dispatch(setProductHeightId(undefined));
      }
      if (sizeType === SizeTypeEnum.width) {
        dispatch(setNewCardProductCustomWidth(e.currentTarget.value));
        // newCard.widthId && dispatch(setProductWidthId(undefined));
      }
      if (sizeType === SizeTypeEnum.length) {
        dispatch(setNewCardProductCustomLength(e.currentTarget.value));
        // newCard.lengthId && dispatch(setProductLengthId(undefined));
      }
      if (sizeType === SizeTypeEnum.caliber) {
        dispatch(setNewCardProductCustomCaliber(e.currentTarget.value));
        // newCard.caliberId && dispatch(setProductCaliberId(undefined));
      }
    }
  };

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

  return (
    <div className={classNames(classes.container, { [classes.blurAndOpacity]: !newCard.productMaterialId })}>
      <CheckIndicator title={sectionTitle} checked={isCheckedIndicator} />
      <div className={classes.rowContainer}>
        {newCard.productMaterialId ? (
          <div className={classes.selectorContainer}>
            <Selector
              hasNullChoice
              options={categorySizes}
              customClassName={classes.selector}
              onChange={onChangeSelector}
              customOptionTitle={'Другой размер'}
            />
          </div>
        ) : (
          <div className={classes.placeHolderContainer}>
            <div className={classes.placeHolderTitle}>Пиломатериал не выбран</div>
          </div>
        )}
        {showCustomSizeInput && (
          <div className={classes.customSizeContainer}>
            {'-'}
            <input
              className={classes.customSizeInput}
              value={customSize || ''}
              onChange={onChangeCustomSize}
              type="text"
            />
            {'мм'}
          </div>
        )}
      </div>
    </div>
  );
};

export default SizeSectionNew;
