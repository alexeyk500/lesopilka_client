import React from 'react';
import classes from './ProductCatalogSection.module.css';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorCategories, selectorProductMaterials, selectorSubCategories } from '../../../../../store/catalogSlice';
import {
  clearProductCard,
  selectorProductCard,
  setProductCardCategoryId,
  setProductCardProductMaterialId,
  setProductCardSubCategoryId,
} from '../../../../../store/productCardSlice';
import SectionSelector from '../../../../../components/commonComponents/SectionSelector/SectionSelector';
import { showConfirmPopUp } from '../../../../../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { OnClosePopUpResultType } from '../../../../../components/PortalPopUp/PortalPopUp';
import { OptionsType } from '../../../../../types/types';
import SectionContainer from '../SectionContainer/SectionContainer';

const getOptions = (optionsStore: OptionsType[]) => {
  const options: OptionsType[] = [];
  options.push({ id: 0, title: '' });
  options.push(...optionsStore);
  return options;
};

const ProductCatalogSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const productCard = useAppSelector(selectorProductCard);
  const categoriesRaw = useAppSelector(selectorCategories);
  const subCategoriesStore = useAppSelector(selectorSubCategories);
  const productMaterialsRaw = useAppSelector(selectorProductMaterials);

  const subCategoriesRaw = subCategoriesStore.filter(
    (subCategory) => productCard.categoryId === subCategory.categoryId
  );

  const categories = getOptions(categoriesRaw);
  const subCategories = getOptions(subCategoriesRaw);
  const productMaterials = getOptions(productMaterialsRaw);

  const selectedCategory = categories.find((category) => category.id === productCard.categoryId);
  const selectedSubCategory = subCategories.find((subCategory) => subCategory.id === productCard.subCategoryId);
  const selectedProductMaterial = productMaterials.find(
    (productMaterial) => productMaterial.id === productCard.productMaterialId
  );

  const onChangeCategorySelector = (id: number) => {
    const onConfirm = (result: OnClosePopUpResultType) => {
      if (result) {
        dispatch(clearProductCard());
        dispatch(setProductCardCategoryId(id));
      }
    };
    if (productCard.categoryId) {
      const curCategory = categories.find((category) => category.id === productCard.categoryId);
      const newCategory = categories.find((category) => category.id === id);
      showConfirmPopUp(
        `Раздела каталога "${curCategory!.title}" \nбудет изменен на \nраздел каталога "${
          newCategory!.title
        }"\n\nПри смене раздела все данные из карточки товара \nбудут удалены`,
        onConfirm
      );
    } else {
      dispatch(setProductCardCategoryId(id));
    }
  };

  const onChangeSubCategorySelector = (id: number) => {
    dispatch(setProductCardSubCategoryId(id));
  };

  const onChangeMaterialSelector = (id: number) => {
    dispatch(setProductCardProductMaterialId(id));
  };

  return (
    <SectionContainer
      title={'Пиломатериал'}
      completeCondition={!!productCard.categoryId && !!productCard.subCategoryId && !!productCard.productMaterialId}
    >
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
    </SectionContainer>
  );
};

export default ProductCatalogSection;
