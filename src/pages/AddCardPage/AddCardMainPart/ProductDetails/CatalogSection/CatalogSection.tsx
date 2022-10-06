import React from 'react';
import classes from './CatalogSection.module.css';
import CheckIndicator from '../../../../../components/commonComponents/CheckIndicator/CheckIndicator';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorCategories, selectorProductMaterials, selectorSubCategories } from '../../../../../store/catalogSlice';
import {
  clearNewCard,
  selectorNewCard,
  setNewCardCategoryId,
  setNewCardProductMaterialId,
  setNewCardSubCategoryId,
} from '../../../../../store/newCardSlice';
import SectionSelector from '../../../../../components/commonComponents/SectionSelector/SectionSelector';

const CatalogSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const newCard = useAppSelector(selectorNewCard);
  const categories = useAppSelector(selectorCategories);
  const subCategoriesStore = useAppSelector(selectorSubCategories);
  const productMaterials = useAppSelector(selectorProductMaterials);

  const subCategories = subCategoriesStore.filter((subCategory) => newCard.categoryId === subCategory.categoryId);
  const selectedCategory = categories.find((category) => category.id === newCard.categoryId);
  const selectedSubCategory = subCategories.find((subCategory) => subCategory.id === newCard.subCategoryId);
  const selectedProductMaterials = productMaterials.find(
    (productMaterial) => productMaterial.id === newCard.productMaterialId
  );

  const onChangeCategorySelector = (id: number) => {
    dispatch(clearNewCard());
    dispatch(setNewCardCategoryId(id));
  };

  const onChangeSubCategorySelector = (id: number) => {
    dispatch(setNewCardSubCategoryId(id));
  };

  const onChangeMaterialSelector = (id: number) => {
    dispatch(setNewCardProductMaterialId(id));
  };

  return (
    <div className={classes.container}>
      <CheckIndicator
        title={'Пиломатериал'}
        checked={!!newCard.categoryId && !!newCard.subCategoryId && !!newCard.productMaterialId}
      />
      <div className={classes.rowContainer}>
        <SectionSelector
          title={'Раздел Каталога'}
          options={categories}
          selectedOption={selectedCategory}
          onChangeSelector={onChangeCategorySelector}
        />
        <SectionSelector
          title={'Тип Пиломатериала'}
          options={subCategories}
          selectedOption={selectedSubCategory}
          onChangeSelector={onChangeSubCategorySelector}
        />
        <SectionSelector
          title={'Порода древесины'}
          options={productMaterials}
          selectedOption={selectedProductMaterials}
          onChangeSelector={onChangeMaterialSelector}
        />
      </div>
    </div>
  );
};

export default CatalogSection;
