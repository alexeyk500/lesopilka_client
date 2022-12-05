import React, { useEffect, useState } from 'react';
import classes from './ProductCodeSection.module.css';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import SectionContainer from '../SectionContainer/SectionContainer';
import { selectorEditProduct, updateProductThunk } from '../../../../../store/productSlice';
import { DEBOUNCE_TIME } from '../../../../../utils/constants';
import useDebouncedFunction from '../../../../../hooks/useDebounceFunction';
import { EditCardSectionsEnum, ProductType } from '../../../../../types/types';

export const checkCodeSection = (product: ProductType) => {
  return !!product.code?.length;
};

const ProductCodeSection = () => {
  const dispatch = useAppDispatch();
  const editProduct = useAppSelector(selectorEditProduct);
  const [code, setCode] = useState<string | undefined>(undefined);

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newCode = event.currentTarget.value ? event.currentTarget.value : undefined;
    if (newCode) {
      setCode(newCode);
      const updateData = { productId: editProduct.id, code: newCode };
      debounceUpdateCode(updateData);
    } else {
      setCode('');
      const updateData = { productId: editProduct.id, code: null };
      debounceUpdateCode(updateData);
    }
  };

  useEffect(() => {
    setCode(editProduct.code);
  }, [editProduct.code]);

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

  const isCompleteCodeSection = checkCodeSection(editProduct);

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
