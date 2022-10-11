import React from 'react';
import classes from './ProductSizesSection.module.css';
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
import { CardType, CategorySizeType, SelectOptionsType, SizeTypeEnum } from '../../../../../types/types';
import classNames from 'classnames';
import SectionContainer from '../SectionContainer/SectionContainer';

export const getSizesSectionIndicator = (newCard: CardType) => {
  if (newCard.categoryId === 6) {
    const result =
      ((newCard.caliberId && newCard.caliberId > 0) || (newCard.caliberId === -1 && newCard.customCaliber)) &&
      ((newCard.lengthId && newCard.lengthId > 0) || (newCard.lengthId === -1 && newCard.customLength));
    return Boolean(result);
  }
  const result =
    ((newCard.heightId && newCard.heightId > 0) || (newCard.heightId === -1 && newCard.customHeight)) &&
    ((newCard.widthId && newCard.widthId > 0) || (newCard.widthId === -1 && newCard.customWidth)) &&
    ((newCard.lengthId && newCard.lengthId > 0) || (newCard.lengthId === -1 && newCard.customLength));
  return Boolean(result);
};

const getOptions = (sizes: CategorySizeType[], categoryId: number | undefined, sizeType: SizeTypeEnum) => {
  const filteredSizes = sizes.filter(
    (categorySize) =>
      categorySize.categoryId === categoryId && !categorySize.isCustomSize && categorySize.type === sizeType
  );
  const optionsFromSizes = filteredSizes.map((size) => {
    return { id: size.id, title: `${size.value} мм` };
  });
  const options: SelectOptionsType[] = [];
  options.push({ id: 0, title: '' });
  options.push(...optionsFromSizes);
  options.push({ id: -1, title: 'Другой размер' });
  return options;
};

const ProductSizesSection = () => {
  const dispatch = useAppDispatch();
  const newCard = useAppSelector(selectorNewCard);
  const allCategorySizes = useAppSelector(selectorCategorySizes);

  const heightSizes = getOptions(allCategorySizes, newCard.categoryId, SizeTypeEnum.height);
  const widthSizes = getOptions(allCategorySizes, newCard.categoryId, SizeTypeEnum.width);
  const lengthSizes = getOptions(allCategorySizes, newCard.categoryId, SizeTypeEnum.length);
  const caliberSizes = getOptions(allCategorySizes, newCard.categoryId, SizeTypeEnum.caliber);

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

  const onChangeCustomHeight = (value: string | undefined) => {
    dispatch(setNewCardProductCustomHeight(value));
  };

  const onChangeCustomWidth = (value: string | undefined) => {
    dispatch(setNewCardProductCustomWidth(value));
  };

  const onChangeCustomLength = (value: string | undefined) => {
    dispatch(setNewCardProductCustomLength(value));
  };

  const onChangeCustomCaliber = (value: string | undefined) => {
    dispatch(setNewCardProductCustomCaliber(value));
  };

  return (
    <SectionContainer title={'Размеры'} completeCondition={getSizesSectionIndicator(newCard)} blurCondition={false}>
      <div
        className={classNames(classes.rowContainer, {
          [classes.rowContainerSlim]: newCard.widthId === -1 || newCard.heightId === -1 || newCard.lengthId === -1,
        })}
      >
        {newCard.categoryId === 6 ? (
          <SectionSelector
            title={'Диаметр'}
            options={caliberSizes}
            selectedOption={selectedCaliberId}
            onChangeSelector={onChangeCaliberSelector}
            customSize={newCard.customCaliber}
            onChangeCustomSize={onChangeCustomCaliber}
          />
        ) : (
          <>
            <SectionSelector
              title={'Толщина'}
              options={heightSizes}
              selectedOption={selectedHeightId}
              onChangeSelector={onChangeHeightSelector}
              customSize={newCard.customHeight}
              onChangeCustomSize={onChangeCustomHeight}
            />
            <SectionSelector
              title={'Ширина'}
              options={widthSizes}
              selectedOption={selectedWidthId}
              onChangeSelector={onChangeWidthSelector}
              customSize={newCard.customWidth}
              onChangeCustomSize={onChangeCustomWidth}
            />
          </>
        )}
        <SectionSelector
          title={'Длинна'}
          options={lengthSizes}
          selectedOption={selectedLengthId}
          onChangeSelector={onChangeLengthSelector}
          customSize={newCard.customLength}
          onChangeCustomSize={onChangeCustomLength}
        />
      </div>
    </SectionContainer>
  );
};

export default ProductSizesSection;
