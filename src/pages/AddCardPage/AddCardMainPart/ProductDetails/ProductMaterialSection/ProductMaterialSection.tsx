import React from 'react';
import classes from './ProductMaterialSection.module.css';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorProductMaterials } from '../../../../../store/catalogSlice';
import CheckIndicator from '../../../../../components/commonComponents/CheckIndicator/CheckIndicator';
import CheckBoxBlue from '../../../../../components/commonComponents/CheckBoxBlue/CheckBoxBlue';
import { selectorNewCard, setProductMaterialId } from '../../../../../store/newCardSlice';

const ProductMaterialSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const newCard = useAppSelector(selectorNewCard);
  const productMaterials = useAppSelector(selectorProductMaterials);

  const productMaterialsPine = productMaterials.filter((productMaterial) => productMaterial.isPine);
  const productMaterialsNoPine = productMaterials.filter((productMaterial) => !productMaterial.isPine);

  const onSelect = (id: string) => {
    dispatch(setProductMaterialId(id));
  };

  return (
    <div className={classes.container}>
      <CheckIndicator title={'Порода древесины'} checked={!!newCard.productMaterialId} />
      <div className={classes.rowContainer}>
        <div className={classes.subTitle}>Хвойные породы</div>
        <div className={classes.optionsContainer}>
          {productMaterialsPine.map((productMaterial) => {
            return (
              <CheckBoxBlue
                key={productMaterial.id}
                id={productMaterial.id}
                title={productMaterial.material}
                checked={productMaterial.id === newCard.productMaterialId}
                onSelect={onSelect}
              />
            );
          })}
        </div>
      </div>
      <div className={classes.rowContainer}>
        <div className={classes.subTitle}>Лиственные породы</div>
        <div className={classes.optionsContainer}>
          {productMaterialsNoPine.map((productMaterial) => {
            return (
              <CheckBoxBlue
                key={productMaterial.id}
                id={productMaterial.id}
                title={productMaterial.material}
                checked={productMaterial.id === newCard.productMaterialId}
                onSelect={onSelect}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductMaterialSection;
