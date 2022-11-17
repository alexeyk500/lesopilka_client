import React, { useEffect, useState } from 'react';
import classes from './ProductSizesSection.module.css';
import SectionSelector from '../../../../../components/commonComponents/SectionSelector/SectionSelector';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorCategorySizes } from '../../../../../store/catalogSlice';
import { CategorySizeType, OptionsType, SizeTypeEnum, ProductCardType } from '../../../../../types/types';
import classNames from 'classnames';
import SectionContainer from '../SectionContainer/SectionContainer';
import { clearEditCard, selectorEditCard, updateProductThunk } from '../../../../../store/productSlice';
import UseDebouncedFunction from '../../../../../hooks/UseDebounceFunction';
import { CALIBER_PRODUCT_CATEGORIES, DEBOUNCE_TIME } from '../../../../../utils/constants';

export const getSizesSectionIndicator = (productCard: ProductCardType) => {
  if (productCard.categoryId && CALIBER_PRODUCT_CATEGORIES.includes(productCard.categoryId)) {
    const result =
      ((productCard.caliberId && productCard.caliberId > 0) || productCard.customCaliberValue) &&
      ((productCard.lengthId && productCard.lengthId > 0) || productCard.customLengthValue);
    return Boolean(result);
  }
  const result =
    (productCard.heightId || productCard.customHeightValue) &&
    ((productCard.widthId && productCard.widthId > 0) || productCard.customWidthValue) &&
    ((productCard.lengthId && productCard.lengthId > 0) || productCard.customLengthValue);
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
  const editCard = useAppSelector(selectorEditCard);
  const allCategorySizes = useAppSelector(selectorCategorySizes);

  const [isOpenCustomHeight, setIsOpenCustomHeight] = useState<boolean>(false);
  const [customHeightValue, setCustomHeightValue] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (editCard.heightId) {
      setIsOpenCustomHeight(false);
    } else {
      if (editCard.customHeightValue) {
        setIsOpenCustomHeight(true);
      } else {
        if (isOpenCustomHeight) {
          setIsOpenCustomHeight(true);
        } else {
          setIsOpenCustomHeight(false);
        }
      }
    }
    setCustomHeightValue(editCard.customHeightValue);
  }, [editCard, isOpenCustomHeight]);

  const [isOpenCustomWidth, setIsOpenCustomWidth] = useState<boolean>(false);
  const [customWidthValue, setCustomWidthValue] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (editCard.widthId) {
      setIsOpenCustomWidth(false);
    } else {
      if (editCard.customWidthValue) {
        setIsOpenCustomWidth(true);
      } else {
        if (isOpenCustomWidth) {
          setIsOpenCustomWidth(true);
        } else {
          setIsOpenCustomWidth(false);
        }
      }
    }
    setCustomWidthValue(editCard.customWidthValue);
  }, [editCard, isOpenCustomWidth]);

  const [isOpenCustomLength, setIsOpenCustomLength] = useState<boolean>(false);
  const [customLengthValue, setCustomLengthValue] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (editCard.lengthId) {
      setIsOpenCustomLength(false);
    } else {
      if (editCard.customLengthValue) {
        setIsOpenCustomLength(true);
      } else {
        if (isOpenCustomLength) {
          setIsOpenCustomLength(true);
        } else {
          setIsOpenCustomLength(false);
        }
      }
    }
    setCustomLengthValue(editCard.customLengthValue);
  }, [editCard, isOpenCustomLength]);

  const [isOpenCustomCaliber, setIsOpenCustomCaliber] = useState<boolean>(false);
  const [customCaliberValue, setCustomCaliberValue] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (editCard.caliberId) {
      setIsOpenCustomCaliber(false);
    } else {
      if (editCard.customCaliberValue) {
        setIsOpenCustomCaliber(true);
      } else {
        if (isOpenCustomCaliber) {
          setIsOpenCustomCaliber(true);
        } else {
          setIsOpenCustomCaliber(false);
        }
      }
    }
    setCustomCaliberValue(editCard.customCaliberValue);
  }, [editCard, isOpenCustomCaliber]);

  const heightSizes = getSizeOptions(allCategorySizes, editCard.categoryId, SizeTypeEnum.height);
  const widthSizes = getSizeOptions(allCategorySizes, editCard.categoryId, SizeTypeEnum.width);
  const lengthSizes = getSizeOptions(allCategorySizes, editCard.categoryId, SizeTypeEnum.length);
  const caliberSizes = getSizeOptions(allCategorySizes, editCard.categoryId, SizeTypeEnum.caliber);

  const selectedHeightId = heightSizes.find((heightSize) => heightSize.id === editCard.heightId);
  const selectedWidthId = widthSizes.find((widthSize) => widthSize.id === editCard.widthId);
  const selectedLengthId = lengthSizes.find((lengthSize) => lengthSize.id === editCard.lengthId);
  const selectedCaliberId = caliberSizes.find((caliberSizes) => caliberSizes.id === editCard.caliberId);

  const debounceUpdateCustomSize = UseDebouncedFunction(
    (updateData) => {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token && updateData) {
        dispatch(updateProductThunk({ token, updateData }));
      }
    },
    DEBOUNCE_TIME,
    true
  );

  useEffect(() => {
    return () => {
      dispatch(clearEditCard());
    };
  }, [dispatch]);

  const onChangeHeightSelector = (id: number) => {
    if (id > 0) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        const updateData = {
          productId: editCard.id,
          categorySizeId: id,
        };
        dispatch(updateProductThunk({ token, updateData }));
      }
      setIsOpenCustomHeight(false);
      setCustomHeightValue(undefined);
    }
    if (id === -1) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        const updateData = {
          productId: editCard.id,
          resetCategorySizeType: SizeTypeEnum.height,
        };
        dispatch(updateProductThunk({ token, updateData })).then(() => {
          setIsOpenCustomHeight(true);
        });
      }
    }
  };

  const onChangeWidthSelector = (id: number) => {
    if (id > 0) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        const updateData = {
          productId: editCard.id,
          categorySizeId: id,
        };
        dispatch(updateProductThunk({ token, updateData }));
      }
      setIsOpenCustomWidth(false);
      setCustomWidthValue(undefined);
    }
    if (id === -1) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        const updateData = {
          productId: editCard.id,
          resetCategorySizeType: SizeTypeEnum.width,
        };
        dispatch(updateProductThunk({ token, updateData })).then(() => {
          setIsOpenCustomWidth(true);
        });
      }
    }
  };

  const onChangeLengthSelector = (id: number) => {
    if (id > 0) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        const updateData = {
          productId: editCard.id,
          categorySizeId: id,
        };
        dispatch(updateProductThunk({ token, updateData }));
      }
      setIsOpenCustomLength(false);
      setCustomLengthValue(undefined);
    }
    if (id === -1) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        const updateData = {
          productId: editCard.id,
          resetCategorySizeType: SizeTypeEnum.length,
        };
        dispatch(updateProductThunk({ token, updateData })).then(() => {
          setIsOpenCustomLength(true);
        });
      }
    }
  };

  const onChangeCaliberSelector = (id: number) => {
    if (id > 0) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        const updateData = {
          productId: editCard.id,
          categorySizeId: id,
        };
        dispatch(updateProductThunk({ token, updateData }));
      }
      setIsOpenCustomCaliber(false);
      setCustomCaliberValue(undefined);
    }
    if (id === -1) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        const updateData = {
          productId: editCard.id,
          resetCategorySizeType: SizeTypeEnum.caliber,
        };
        dispatch(updateProductThunk({ token, updateData })).then(() => {
          setIsOpenCustomCaliber(true);
        });
      }
    }
  };

  const onChangeCustomHeight = (value: string | undefined) => {
    setCustomHeightValue(value);
    let updateData;
    if (value) {
      updateData = {
        productId: editCard.id,
        customSizeType: SizeTypeEnum.height,
        customSizeValue: value,
      };
    } else {
      updateData = {
        productId: editCard.id,
        resetCategorySizeType: SizeTypeEnum.height,
      };
    }
    debounceUpdateCustomSize(updateData);
  };

  const onChangeCustomWidth = (value: string | undefined) => {
    setCustomWidthValue(value);
    let updateData;
    if (value) {
      updateData = {
        productId: editCard.id,
        customSizeType: SizeTypeEnum.width,
        customSizeValue: value,
      };
    } else {
      updateData = {
        productId: editCard.id,
        resetCategorySizeType: SizeTypeEnum.width,
      };
    }
    debounceUpdateCustomSize(updateData);
  };

  const onChangeCustomLength = (value: string | undefined) => {
    setCustomLengthValue(value);
    let updateData;
    if (value) {
      updateData = {
        productId: editCard.id,
        customSizeType: SizeTypeEnum.length,
        customSizeValue: value,
      };
    } else {
      updateData = {
        productId: editCard.id,
        resetCategorySizeType: SizeTypeEnum.length,
      };
    }
    debounceUpdateCustomSize(updateData);
  };

  const onChangeCustomCaliber = (value: string | undefined) => {
    setCustomCaliberValue(value);
    let updateData;
    if (value) {
      updateData = {
        productId: editCard.id,
        customSizeType: SizeTypeEnum.caliber,
        customSizeValue: value,
      };
    } else {
      updateData = {
        productId: editCard.id,
        resetCategorySizeType: SizeTypeEnum.caliber,
      };
    }
    debounceUpdateCustomSize(updateData);
  };

  return (
    <SectionContainer title={'Размеры'} completeCondition={getSizesSectionIndicator(editCard)} blurCondition={false}>
      <div
        className={classNames(classes.rowContainer, {
          [classes.rowContainerSlim]: editCard.widthId === -1 || editCard.heightId === -1 || editCard.lengthId === -1,
        })}
      >
        {editCard.categoryId && CALIBER_PRODUCT_CATEGORIES.includes(editCard.categoryId) ? (
          <SectionSelector
            title={'Диаметр'}
            options={caliberSizes}
            selectedOption={selectedCaliberId}
            onChangeSelector={onChangeCaliberSelector}
            isCustomSize={isOpenCustomCaliber}
            customSizeValue={customCaliberValue}
            onChangeCustomSize={onChangeCustomCaliber}
          />
        ) : (
          <>
            <SectionSelector
              title={'Толщина'}
              options={heightSizes}
              selectedOption={selectedHeightId}
              onChangeSelector={onChangeHeightSelector}
              isCustomSize={isOpenCustomHeight}
              customSizeValue={customHeightValue}
              onChangeCustomSize={onChangeCustomHeight}
            />
            <SectionSelector
              title={'Ширина'}
              options={widthSizes}
              selectedOption={selectedWidthId}
              onChangeSelector={onChangeWidthSelector}
              isCustomSize={isOpenCustomWidth}
              customSizeValue={customWidthValue}
              onChangeCustomSize={onChangeCustomWidth}
            />
          </>
        )}
        <SectionSelector
          title={'Длинна'}
          options={lengthSizes}
          selectedOption={selectedLengthId}
          onChangeSelector={onChangeLengthSelector}
          isCustomSize={isOpenCustomLength}
          customSizeValue={customLengthValue}
          onChangeCustomSize={onChangeCustomLength}
        />
      </div>
    </SectionContainer>
  );
};

export default ProductSizesSection;
