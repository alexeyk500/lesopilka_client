import React from 'react';
import classes from './SubCategorySection.module.css';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorSubCategories } from '../../../../../store/catalogSlice';
import { selectorNewCard, setSubCategoryId } from '../../../../../store/newCardSlice';
import CheckIndicator from '../../../../../components/commonComponents/CheckIndicator/CheckIndicator';
import CheckBoxBlue from '../../../../../components/commonComponents/CheckBoxBlue/CheckBoxBlue';

const SubCategorySection: React.FC = () => {
  const dispatch = useAppDispatch();
  const subCategoriesStore = useAppSelector(selectorSubCategories);
  const newCard = useAppSelector(selectorNewCard);
  const subCategories = subCategoriesStore.filter((subCategory) => newCard.categoryId === subCategory.categoryId);

  const onSelect = (id: string) => {
    dispatch(setSubCategoryId(id));
  };

  return (
    <div className={classes.container}>
      <CheckIndicator title={'Тип'} checked={!!newCard.subCategoryId} />
      <div className={classes.optionsContainer}>
        {subCategories.map((subCategory) => {
          return (
            <CheckBoxBlue
              key={subCategory.id}
              id={subCategory.id}
              title={subCategory.title}
              checked={subCategory.id === newCard.subCategoryId}
              onSelect={onSelect}
            />
          );
        })}
      </div>
      {subCategories.length === 0 && (
        <div className={classes.placeHolderContainer}>
          <div className={classes.placeHolderTitle}>Пиломатериал не выбран</div>
        </div>
      )}
    </div>
  );
};

export default SubCategorySection;
