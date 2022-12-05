import React, { useCallback, useEffect, useState } from 'react';
import SectionSelector from '../../../../../../components/commonComponents/SectionSelector/SectionSelector';
import { CategorySizeType, OptionsType, SizeTypeEnum } from '../../../../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks';
import { selectorCategorySizes } from '../../../../../../store/catalogSlice';
import { selectorEditProduct, updateProductThunk } from '../../../../../../store/productSlice';
import useDebouncedFunction from '../../../../../../hooks/useDebounceFunction';
import { DEBOUNCE_TIME } from '../../../../../../utils/constants';

const getSizeOptions = (sizes: CategorySizeType[], categoryId: number | undefined, sizeType: SizeTypeEnum) => {
  const filteredSizes = sizes.filter(
    (categorySize) =>
      categorySize.categoryId === categoryId && !categorySize.isCustomSize && categorySize.type === sizeType
  );
  const optionsFromSizes = filteredSizes.map((size) => {
    return { id: size.id, title: `${size.value} мм`, value: size.value };
  });
  const options: OptionsType[] = [];
  options.push({ id: 0, title: '', value: '0' });
  options.push(...optionsFromSizes);
  options.push({ id: -1, title: 'Другой размер', value: '-1' });
  return options;
};

type PropsType = {
  title: string;
  sizeType: SizeTypeEnum;
};

const SizeSelector: React.FC<PropsType> = ({ title, sizeType }) => {
  const dispatch = useAppDispatch();
  const editProduct = useAppSelector(selectorEditProduct);
  const allCategorySizes = useAppSelector(selectorCategorySizes);

  const [selectedOption, setSelectedOption] = useState<OptionsType | undefined>(undefined);
  const [isShowCustomSizeInput, setIsShowCustomSizeInput] = useState<boolean>(false);
  const [customInputValue, setCustomInputValue] = useState<string | undefined>(undefined);

  const debounceUpdateCustomSize = useDebouncedFunction(
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
    const options = getSizeOptions(allCategorySizes, editProduct.category?.id, sizeType);
    if (isShowCustomSizeInput) {
      const customOption = options.find((option) => option.id === -1);
      if (customOption) {
        customOption.value = editProduct[sizeType];
      }
      setSelectedOption(customOption);
    } else {
      const foundOption = options.find((option) => option.value === editProduct[sizeType]);
      if (foundOption) {
        setSelectedOption(foundOption);
      } else if (editProduct[sizeType]) {
        const customOption = options.find((option) => option.id === -1);
        if (customOption) {
          customOption.value = editProduct[sizeType];
        }
        setSelectedOption(customOption);
        setCustomInputValue(editProduct[sizeType]);
        setIsShowCustomSizeInput(true);
      }
    }
  }, [editProduct, isShowCustomSizeInput, allCategorySizes, sizeType, setSelectedOption, setCustomInputValue]);

  const onChangeSelector = useCallback(
    (id: number) => {
      if (id > 0) {
        const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
        const categorySize = allCategorySizes.find((size) => size.id === id);
        if (token && categorySize) {
          const updateData = {
            productId: editProduct.id,
            sizeType,
            sizeValue: categorySize.value,
          };
          dispatch(updateProductThunk({ token, updateData })).then(() => {
            setIsShowCustomSizeInput(false);
          });
        }
      }
      if (id === -1) {
        const options = getSizeOptions(allCategorySizes, editProduct.category?.id, sizeType);
        const customOption = options.find((option) => option.id === -1);
        if (customOption) {
          customOption.value = undefined;
        }
        setSelectedOption(customOption);
        const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
        if (token) {
          const updateData = {
            productId: editProduct.id,
            sizeType,
            sizeValue: null,
          };
          dispatch(updateProductThunk({ token, updateData })).then(() => {
            setCustomInputValue(undefined);
            setIsShowCustomSizeInput(true);
          });
        }
      }
    },
    [allCategorySizes, dispatch, editProduct, sizeType]
  );

  const onChangeCustomValue = (value: string | undefined) => {
    setCustomInputValue(value);
    const updateData = {
      productId: editProduct.id,
      sizeType,
      sizeValue: value ? value : null,
    };
    debounceUpdateCustomSize(updateData);
  };

  return (
    <SectionSelector
      title={title}
      options={getSizeOptions(allCategorySizes, editProduct.category?.id, sizeType)}
      selectedOption={selectedOption}
      onChangeSelector={onChangeSelector}
      showCustomSizeInput={isShowCustomSizeInput}
      customSizeInputValue={customInputValue}
      onChangeCustomSize={onChangeCustomValue}
    />
  );
};

export default SizeSelector;
