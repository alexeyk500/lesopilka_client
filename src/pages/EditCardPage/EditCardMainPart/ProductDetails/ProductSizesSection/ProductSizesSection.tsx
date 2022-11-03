import React from 'react';
import classes from './ProductSizesSection.module.css';
import SectionSelector from '../../../../../components/commonComponents/SectionSelector/SectionSelector';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import {
  selectorProductCard,
  setProductCardProductCaliberId,
  setProductCardProductCustomCaliber,
  setProductCardProductCustomHeight,
  setProductCardProductCustomLength,
  setProductCardProductCustomWidth,
  setProductCardProductHeightId,
  setProductCardProductLengthId,
  setProductCardProductWidthId,
} from '../../../../../store/productCardSlice';
import { selectorCategorySizes } from '../../../../../store/catalogSlice';
import { CategorySizeType, OptionsType, SizeTypeEnum, ProductCardType } from '../../../../../types/types';
import classNames from 'classnames';
import SectionContainer from '../SectionContainer/SectionContainer';

export const getSizesSectionIndicator = (productCard: ProductCardType) => {
  if (productCard.categoryId === 6) {
    const result =
      ((productCard.caliberId && productCard.caliberId > 0) ||
        (productCard.caliberId === -1 && productCard.customCaliber)) &&
      ((productCard.lengthId && productCard.lengthId > 0) || (productCard.lengthId === -1 && productCard.customLength));
    return Boolean(result);
  }
  const result =
    ((productCard.heightId && productCard.heightId > 0) || (productCard.heightId === -1 && productCard.customHeight)) &&
    ((productCard.widthId && productCard.widthId > 0) || (productCard.widthId === -1 && productCard.customWidth)) &&
    ((productCard.lengthId && productCard.lengthId > 0) || (productCard.lengthId === -1 && productCard.customLength));
  return Boolean(result);
};

const getSizeOptions = (sizes: CategorySizeType[], categoryId: number | undefined, sizeType: SizeTypeEnum) => {
  const filteredSizes = sizes.filter(
    (categorySize) =>
      categorySize.categoryId === categoryId && !categorySize.isCustomSize && categorySize.type === sizeType
  );
  const optionsFromSizes = filteredSizes.map((size) => {
    return { id: size.id, title: `${size.value} мм` };
  });
  const options: OptionsType[] = [];
  options.push({ id: 0, title: '' });
  options.push(...optionsFromSizes);
  options.push({ id: -1, title: 'Другой размер' });
  return options;
};

const ProductSizesSection = () => {
  const dispatch = useAppDispatch();
  const productCard = useAppSelector(selectorProductCard);
  const allCategorySizes = useAppSelector(selectorCategorySizes);

  const heightSizes = getSizeOptions(allCategorySizes, productCard.categoryId, SizeTypeEnum.height);
  const widthSizes = getSizeOptions(allCategorySizes, productCard.categoryId, SizeTypeEnum.width);
  const lengthSizes = getSizeOptions(allCategorySizes, productCard.categoryId, SizeTypeEnum.length);
  const caliberSizes = getSizeOptions(allCategorySizes, productCard.categoryId, SizeTypeEnum.caliber);

  const selectedHeightId = heightSizes.find((heightSize) => heightSize.id === productCard.heightId);
  const selectedWidthId = widthSizes.find((widthSize) => widthSize.id === productCard.widthId);
  const selectedLengthId = lengthSizes.find((lengthSize) => lengthSize.id === productCard.lengthId);
  const selectedCaliberId = caliberSizes.find((caliberSizes) => caliberSizes.id === productCard.caliberId);

  const onChangeWidthSelector = (id: number) => {
    dispatch(setProductCardProductWidthId(id));
    productCard.customWidth && dispatch(setProductCardProductCustomWidth(undefined));
  };

  const onChangeHeightSelector = (id: number) => {
    dispatch(setProductCardProductHeightId(id));
    productCard.customHeight && dispatch(setProductCardProductCustomHeight(undefined));
  };

  const onChangeLengthSelector = (id: number) => {
    dispatch(setProductCardProductLengthId(id));
    productCard.customLength && dispatch(setProductCardProductCustomLength(undefined));
  };

  const onChangeCaliberSelector = (id: number) => {
    dispatch(setProductCardProductCaliberId(id));
    productCard.customCaliber && dispatch(setProductCardProductCustomCaliber(undefined));
  };

  const onChangeCustomHeight = (value: string | undefined) => {
    dispatch(setProductCardProductCustomHeight(value));
  };

  const onChangeCustomWidth = (value: string | undefined) => {
    dispatch(setProductCardProductCustomWidth(value));
  };

  const onChangeCustomLength = (value: string | undefined) => {
    dispatch(setProductCardProductCustomLength(value));
  };

  const onChangeCustomCaliber = (value: string | undefined) => {
    dispatch(setProductCardProductCustomCaliber(value));
  };

  return (
    <SectionContainer title={'Размеры'} completeCondition={getSizesSectionIndicator(productCard)} blurCondition={false}>
      <div
        className={classNames(classes.rowContainer, {
          [classes.rowContainerSlim]:
            productCard.widthId === -1 || productCard.heightId === -1 || productCard.lengthId === -1,
        })}
      >
        {productCard.categoryId === 6 ? (
          <SectionSelector
            title={'Диаметр'}
            options={caliberSizes}
            selectedOption={selectedCaliberId}
            onChangeSelector={onChangeCaliberSelector}
            customSize={productCard.customCaliber}
            onChangeCustomSize={onChangeCustomCaliber}
          />
        ) : (
          <>
            <SectionSelector
              title={'Толщина'}
              options={heightSizes}
              selectedOption={selectedHeightId}
              onChangeSelector={onChangeHeightSelector}
              customSize={productCard.customHeight}
              onChangeCustomSize={onChangeCustomHeight}
            />
            <SectionSelector
              title={'Ширина'}
              options={widthSizes}
              selectedOption={selectedWidthId}
              onChangeSelector={onChangeWidthSelector}
              customSize={productCard.customWidth}
              onChangeCustomSize={onChangeCustomWidth}
            />
          </>
        )}
        <SectionSelector
          title={'Длинна'}
          options={lengthSizes}
          selectedOption={selectedLengthId}
          onChangeSelector={onChangeLengthSelector}
          customSize={productCard.customLength}
          onChangeCustomSize={onChangeCustomLength}
        />
      </div>
    </SectionContainer>
  );
};

export default ProductSizesSection;
