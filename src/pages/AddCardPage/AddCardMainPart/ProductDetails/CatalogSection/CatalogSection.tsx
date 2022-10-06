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
import { showConfirmPopUp } from '../../../../../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { OnClosePopUpResultType } from '../../../../../components/PortalPopUp/PortalPopUp';
import { SelectOptionsType } from '../../../../../types/types';

const getOptions = (optionsStore: SelectOptionsType[]) => {
  const options: SelectOptionsType[] = [];
  options.push({ id: 0, title: '' });
  options.push(...optionsStore);
  return options;
};

const CatalogSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const newCard = useAppSelector(selectorNewCard);
  const categoriesRaw = useAppSelector(selectorCategories);
  const subCategoriesStore = useAppSelector(selectorSubCategories);
  const productMaterialsRaw = useAppSelector(selectorProductMaterials);

  const subCategoriesRaw = subCategoriesStore.filter((subCategory) => newCard.categoryId === subCategory.categoryId);

  const categories = getOptions(categoriesRaw);
  const subCategories = getOptions(subCategoriesRaw);
  const productMaterials = getOptions(productMaterialsRaw);

  const selectedCategory = categories.find((category) => category.id === newCard.categoryId);
  const selectedSubCategory = subCategories.find((subCategory) => subCategory.id === newCard.subCategoryId);
  const selectedProductMaterial = productMaterials.find(
    (productMaterial) => productMaterial.id === newCard.productMaterialId
  );

  const onChangeCategorySelector = (id: number) => {
    const onConfirm = (result: OnClosePopUpResultType) => {
      if (result) {
        dispatch(clearNewCard());
        dispatch(setNewCardCategoryId(id));
      }
    };
    if (newCard.categoryId) {
      const curCategory = categories.find((category) => category.id === newCard.categoryId);
      const newCategory = categories.find((category) => category.id === id);
      showConfirmPopUp(
        `Раздела каталога "${curCategory!.title}" \nбудет изменен на \nраздел каталога "${
          newCategory!.title
        }"\n\nПри смене раздела все данные из карточки товара \nбудут удалены`,
        onConfirm
      );
    } else {
      dispatch(setNewCardCategoryId(id));
    }
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
          selectedOption={selectedProductMaterial}
          onChangeSelector={onChangeMaterialSelector}
        />
      </div>
    </div>
  );
};

export default CatalogSection;
