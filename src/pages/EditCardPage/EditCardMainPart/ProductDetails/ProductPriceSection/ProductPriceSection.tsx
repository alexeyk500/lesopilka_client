import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import SectionContainer from '../SectionContainer/SectionContainer';
import classes from './ProductPriceSection.module.css';
import { DEBOUNCE_TIME, regExpForPrice } from '../../../../../utils/constants';
import { selectorEditCard, updateProductThunk } from '../../../../../store/productSlice';
import useDebouncedFunction from '../../../../../hooks/useDebounceFunction';

const ProductPriceSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const editCard = useAppSelector(selectorEditCard);
  const [price, setPrice] = useState<string | undefined>(undefined);

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newPrice = event.currentTarget.value ? event.currentTarget.value : undefined;
    if (newPrice) {
      if (regExpForPrice.test(newPrice)) {
        setPrice(newPrice);
        const updateData = { productId: editCard.id, price: newPrice };
        debounceUpdateCode(updateData);
      }
    } else {
      setPrice('');
      const updateData = { productId: editCard.id, price: null };
      debounceUpdateCode(updateData);
    }
  };

  useEffect(() => {
    setPrice(editCard.price);
  }, [editCard.price]);

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

  return (
    <SectionContainer title={'Цена'} completeCondition={!!editCard.price} blurCondition={false}>
      <div className={classes.contentContainer}>
        <div className={classes.title}>Укажите стоимость одной единицы товара в рублях</div>
        <div className={classes.inputContainer}>
          <input className={classes.customSizeInput} value={price} onChange={onChangeInput} type="text" />
          {'руб'}
        </div>
      </div>
    </SectionContainer>
  );
};

export default ProductPriceSection;
