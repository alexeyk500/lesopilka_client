import React, { useEffect, useState } from 'react';
import SectionSelector from '../../../../../../components/commonComponents/SectionSelector/SectionSelector';
import { CategorySizeType, OptionsType, SizeTypeEnum } from '../../../../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks';
import { selectorCategorySizes } from '../../../../../../store/catalogSlice';
import { selectorEditCard, updateProductThunk } from '../../../../../../store/productSlice';
import useDebouncedFunction from '../../../../../../hooks/useDebounceFunction';
import { DEBOUNCE_TIME } from '../../../../../../utils/constants';

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

type PropsType = {
  title: string;
  sizeType: SizeTypeEnum;
};

const SizeSelector: React.FC<PropsType> = ({ title, sizeType }) => {
  const dispatch = useAppDispatch();
  const editCard = useAppSelector(selectorEditCard);
  const allCategorySizes = useAppSelector(selectorCategorySizes);

  const [isOpenCustomInput, setIsOpenCustomInput] = useState<boolean>(false);
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

  const options: OptionsType[] = getSizeOptions(allCategorySizes, editCard.categoryId, sizeType);
  let selectedOptionId: OptionsType | undefined;
  // if (sizeType === SizeTypeEnum.height) {
  //   selectedOptionId = options.find((size) => size.id === editCard.heightId);
  // } else if (sizeType === SizeTypeEnum.width) {
  //   selectedOptionId = options.find((size) => size.id === editCard.widthId);
  // } else if (sizeType === SizeTypeEnum.length) {
  //   selectedOptionId = options.find((size) => size.id === editCard.lengthId);
  // } else if (sizeType === SizeTypeEnum.caliber) {
  //   selectedOptionId = options.find((size) => size.id === editCard.caliberId);
  // }

  // useEffect(() => {
  //   if (editCard.height) {
  //     setIsOpenCustomInput(false);
  //   } else {
  //
  //       if (isOpenCustomInput) {
  //         setIsOpenCustomInput(true);
  //       } else {
  //         setIsOpenCustomInput(false);
  //       }
  //   }
  //   setCustomInputValue(editCard.customHeightValue);
  // }, [editCard, isOpenCustomInput]);

  const onChangeSelector = (id: number) => {
    if (id > 0) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      const categorySize = allCategorySizes.find((size) => size.id === id);
      if (token && categorySize) {
        const updateData = {
          productId: editCard.id,
          sizeType,
          sizeValue: categorySize.value,
        };
        dispatch(updateProductThunk({ token, updateData }));
      }
      setIsOpenCustomInput(false);
      setCustomInputValue(undefined);
    }
    if (id === -1) {
      setIsOpenCustomInput(true);
    }
  };

  const onChangeCustomValue = (value: string | undefined) => {
    setCustomInputValue(value);
    const updateData = {
      productId: editCard.id,
      sizeType,
      sizeValue: value ? value : null,
    };
    debounceUpdateCustomSize(updateData);
  };

  return (
    <SectionSelector
      title={title}
      options={options}
      selectedOption={selectedOptionId}
      onChangeSelector={onChangeSelector}
      isCustomSize={isOpenCustomInput}
      customSizeValue={customInputValue}
      onChangeCustomSize={onChangeCustomValue}
    />
  );
};

export default SizeSelector;
