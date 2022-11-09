import React, { useState } from 'react';
import classes from './ProductCatalogSection.module.css';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorCategories, selectorProductMaterials, selectorSubCategories } from '../../../../../store/catalogSlice';
import SectionSelector from '../../../../../components/commonComponents/SectionSelector/SectionSelector';
import { showConfirmPopUp } from '../../../../../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { OnClosePopUpResultType } from '../../../../../components/PortalPopUp/PortalPopUp';
import { OptionsType } from '../../../../../types/types';
import SectionContainer from '../SectionContainer/SectionContainer';
import { selectorEditCard, updateProductThunk } from '../../../../../store/productSlice';

const getOptions = (optionsStore: OptionsType[]) => {
  const options: OptionsType[] = [];
  options.push({ id: 0, title: '' });
  options.push(...optionsStore);
  return options;
};

const ProductCatalogSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const editCard = useAppSelector(selectorEditCard);
  const categoriesRaw = useAppSelector(selectorCategories);
  const subCategoriesStore = useAppSelector(selectorSubCategories);
  const productMaterialsRaw = useAppSelector(selectorProductMaterials);
  const [formCategoryId, setFormCategoryId] = useState<number | undefined>(undefined);

  const subCategoriesRaw = subCategoriesStore.filter(
    (subCategory) => subCategory.categoryId === (editCard.categoryId ? editCard.categoryId : formCategoryId)
  );

  const categories = getOptions(categoriesRaw);
  const subCategories = getOptions(subCategoriesRaw);
  const productMaterials = getOptions(productMaterialsRaw);

  const selectedCategory = categories.find((category) => category.id === editCard.categoryId);
  const formEditCardCategory = formCategoryId
    ? categories.find((category) => category.id === formCategoryId)
    : undefined;

  const selectedSubCategory = subCategories.find((subCategory) => subCategory.id === editCard.subCategoryId);
  const selectedProductMaterial = productMaterials.find(
    (productMaterial) => productMaterial.id === editCard.productMaterialId
  );

  const onChangeCategorySelector = (id: number) => {
    const onConfirm = (result: OnClosePopUpResultType) => {
      if (result) {
        const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
        if (token && id) {
          setFormCategoryId(id);
          const updateData = {
            productId: editCard.id,
            subCategoryId: null,
            productMaterialId: null,
          };
          dispatch(updateProductThunk({ token, updateData }));
        }
      }
    };
    if (editCard.categoryId) {
      const curCategory = categories.find((category) => category.id === editCard.categoryId);
      const newCategory = categories.find((category) => category.id === id);
      showConfirmPopUp(
        `Раздела каталога "${curCategory!.title}" \nбудет изменен на \nраздел каталога "${
          newCategory!.title
        }"\n\nПри смене раздела все данные из карточки товара \nбудут удалены`,
        onConfirm
      );
    } else {
      setFormCategoryId(id);
    }
  };

  const onChangeSubCategorySelector = (id: number) => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token && id) {
      const updateData = {
        productId: editCard.id,
        subCategoryId: id,
      };
      dispatch(updateProductThunk({ token, updateData }));
    }
  };

  const onChangeMaterialSelector = (id: number) => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token && id) {
      const updateData = {
        productId: editCard.id,
        productMaterialId: id,
      };
      dispatch(updateProductThunk({ token, updateData }));
    }
  };

  return (
    <SectionContainer
      title={'Пиломатериал'}
      completeCondition={!!editCard.categoryId && !!editCard.subCategoryId && !!editCard.productMaterialId}
    >
      <div className={classes.rowContainer}>
        <SectionSelector
          title={'Раздел Каталога'}
          options={categories}
          selectedOption={selectedCategory ? selectedCategory : formEditCardCategory ? formEditCardCategory : undefined}
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
