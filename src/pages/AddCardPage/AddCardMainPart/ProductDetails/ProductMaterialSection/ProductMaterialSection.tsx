import React from 'react';
import classes from './ProductMaterialSection.module.css';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorProductMaterials } from '../../../../../store/catalogSlice';
import CheckIndicator from '../../../../../components/commonComponents/CheckIndicator/CheckIndicator';
import { selectorNewCard, setNewCardProductMaterialId } from '../../../../../store/newCardSlice';
import Selector from '../../../../../components/commonComponents/Selector/Selector';
import classNames from 'classnames';

const ProductMaterialSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const newCard = useAppSelector(selectorNewCard);
  const productMaterials = useAppSelector(selectorProductMaterials);

  const onChangeSelector = (id: number) => {
    dispatch(setNewCardProductMaterialId(id));
  };

  return (
    <div className={classNames(classes.container, { [classes.blurAndOpacity]: !newCard.subCategoryId })}>
      <CheckIndicator title={'Порода древесины'} checked={!!newCard.productMaterialId} />
      <div className={classes.rowContainer}>
        {newCard.subCategoryId ? (
          <div className={classes.selectorContainer}>
            <Selector
              hasNullChoice
              options={productMaterials}
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

export default ProductMaterialSection;
