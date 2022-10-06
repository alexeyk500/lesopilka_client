import React from 'react';
import classes from './SubCategorySection.module.css';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorSubCategories } from '../../../../../store/catalogSlice';
import { selectorNewCard, setSubCategoryId } from '../../../../../store/newCardSlice';
import CheckIndicator from '../../../../../components/commonComponents/CheckIndicator/CheckIndicator';
import Selector from '../../../../../components/commonComponents/Selector/Selector';
import classNames from 'classnames';

const SubCategorySection: React.FC = () => {
  const dispatch = useAppDispatch();
  const subCategoriesStore = useAppSelector(selectorSubCategories);
  const newCard = useAppSelector(selectorNewCard);
  const subCategories = subCategoriesStore.filter(
    (subCategory) => newCard.categoryId === subCategory.categoryId
  );

  const onChangeSelector = (id: number) => {
    dispatch(setSubCategoryId(id));
  };

  return (
    <div className={classNames(classes.container, { [classes.blurAndOpacity]: !newCard.categoryId })}>
      <CheckIndicator title={'Тип'} checked={!!newCard.subCategoryId} />
      <div className={classes.rowContainer}>
        {newCard.categoryId ? (
          <div className={classes.selectorContainer}>
            <Selector
              hasNullChoice
              options={subCategories}
              customClassName={classes.selector}
              onChange={onChangeSelector}
            />
          </div>
        ) : (
          <div className={classes.placeHolderContainer}>
            <div className={classes.placeHolderTitle}>Пиломатериал не выбран</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubCategorySection;
