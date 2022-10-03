import React, { useEffect, useState } from 'react';
import classes from './ProductMaterialSection.module.css';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorProductMaterials } from '../../../../../store/catalogSlice';
import CheckIndicator from '../../../../../components/commonComponents/CheckIndicator/CheckIndicator';
import CheckBoxBlue from '../../../../../components/commonComponents/CheckBoxBlue/CheckBoxBlue';
import { selectorNewCard, setProductMaterialId } from '../../../../../store/newCardSlice';
import Selector from '../../../../../components/Header/Selector/Selector';
import { ProductMaterialType } from '../../../../../types/types';
import classNames from 'classnames';

const options = ['Хвойные породы', 'Лиственные породы'];

const ProductMaterialSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const newCard = useAppSelector(selectorNewCard);
  const productMaterials = useAppSelector(selectorProductMaterials);
  const [materialItems, setMaterialItems] = useState<ProductMaterialType[]>([]);

  const onSelect = (id: string) => {
    dispatch(setProductMaterialId(id));
  };

  const onChangeSelector = (value: string) => {
    if (value === options[0]) {
      const productMaterialsPine = productMaterials.filter((productMaterial) => productMaterial.isPine);
      setMaterialItems(productMaterialsPine);
      dispatch(setProductMaterialId(undefined));
    } else {
      const productMaterialsNoPine = productMaterials.filter((productMaterial) => !productMaterial.isPine);
      setMaterialItems(productMaterialsNoPine);
      dispatch(setProductMaterialId(undefined));
    }
  };

  useEffect(() => {
    const productMaterialsPine = productMaterials.filter((productMaterial) => productMaterial.isPine);
    setMaterialItems(productMaterialsPine);
  }, [productMaterials]);

  return (
    <div className={classes.container}>
      <CheckIndicator title={'Порода древесины'} checked={!!newCard.productMaterialId} />
      <div className={classes.rowContainer}>
        <div className={classes.selectorContainer}>
          <Selector options={options} customClassName={classes.selector} onChange={onChangeSelector} />
        </div>
        <div className={classNames(classes.optionsContainer, { [classes.narrowContainer]: materialItems.length <= 6 })}>
          {materialItems.map((productMaterial) => {
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
