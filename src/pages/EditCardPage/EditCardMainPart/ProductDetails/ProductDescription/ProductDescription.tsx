import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import SectionContainer from '../SectionContainer/SectionContainer';
import classes from './ProductDescription.module.css';
import { selectorEditCard, updateProductDescriptionThunk } from '../../../../../store/productSlice';
import { DEBOUNCE_TIME } from '../../../../../utils/constants';
import useDebouncedFunction from '../../../../../hooks/useDebounceFunction';

const ProductDescription: React.FC = () => {
  const dispatch = useAppDispatch();
  const editCard = useAppSelector(selectorEditCard);
  const [description, setDescription] = useState<string | undefined>(undefined);

  const onChangeInput: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const newDescription = event.currentTarget.value ? event.currentTarget.value : undefined;
    setDescription(newDescription);
    let updateData;
    if (newDescription) {
      updateData = {
        productId: editCard.id,
        description: newDescription,
      };
    } else {
      updateData = {
        productId: editCard.id,
        description: null,
      };
    }
    debounceUpdateDescription(updateData);
  };

  useEffect(() => {
    setDescription(editCard.description);
  }, [editCard.description]);

  const debounceUpdateDescription = useDebouncedFunction(
    (updateData) => {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token && updateData) {
        dispatch(updateProductDescriptionThunk({ token, updateData }));
      }
    },
    DEBOUNCE_TIME,
    true
  );

  return (
    <SectionContainer title={'Описание'} completeCondition={!!editCard.description?.length} blurCondition={false}>
      <div className={classes.contentContainer}>
        <div className={classes.title}>Добавьте дополнительную информацию о товаре до 1000 символов</div>
        <textarea className={classes.customSizeInput} value={description} onChange={onChangeInput} />
      </div>
    </SectionContainer>
  );
};

export default ProductDescription;
