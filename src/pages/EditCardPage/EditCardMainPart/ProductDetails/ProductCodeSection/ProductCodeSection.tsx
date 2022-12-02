import React, { useEffect, useState } from 'react';
import classes from './ProductCodeSection.module.css';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import SectionContainer from '../SectionContainer/SectionContainer';
import { selectorEditCard, updateProductThunk } from '../../../../../store/productSlice';
import { DEBOUNCE_TIME } from '../../../../../utils/constants';
import useDebouncedFunction from '../../../../../hooks/useDebounceFunction';
import { EditCardSectionsEnum, ProductCardType } from '../../../../../types/types';

export const checkCodeSection = (editCard: ProductCardType) => {
  return !!editCard.productCode?.length;
};

const ProductCodeSection = () => {
  const dispatch = useAppDispatch();
  const editCard = useAppSelector(selectorEditCard);
  const [code, setCode] = useState<string | undefined>(undefined);

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newCode = event.currentTarget.value ? event.currentTarget.value : undefined;
    if (newCode) {
      setCode(newCode);
      const updateData = { productId: editCard.id, code: newCode };
      debounceUpdateCode(updateData);
    } else {
      setCode('');
      const updateData = { productId: editCard.id, code: null };
      debounceUpdateCode(updateData);
    }
  };

  useEffect(() => {
    setCode(editCard.productCode);
  }, [editCard.productCode]);

  const debounceUpdateCode = useDebouncedFunction(
    (updateData) => {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token && updateData) {
        dispatch(updateProductThunk({ token, updateData }));
      }
    },
    DEBOUNCE_TIME,
    true
  );

  const isCompleteCodeSection = checkCodeSection(editCard);

  return (
    <SectionContainer title={EditCardSectionsEnum.code} completeCondition={isCompleteCodeSection} blurCondition={false}>
      <div className={classes.contentContainer}>
        <div className={classes.title}>Укажите артикул товара согласно своей внутренней системы учета</div>
        <input className={classes.customSizeInput} value={code || ''} onChange={onChangeInput} type="text" />
      </div>
    </SectionContainer>
  );
};

export default ProductCodeSection;
