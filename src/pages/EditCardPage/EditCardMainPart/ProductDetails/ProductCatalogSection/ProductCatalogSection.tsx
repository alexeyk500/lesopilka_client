import React, { useState } from 'react';
import classes from './ProductCatalogSection.module.css';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { selectorCategories, selectorProductMaterials, selectorSubCategories } from '../../../../../store/catalogSlice';
import SectionSelector from '../../../../../components/commonComponents/SectionSelector/SectionSelector';
import { showConfirmPopUp } from '../../../../../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { OnClosePopUpResultType } from '../../../../../components/PortalPopUp/PortalPopUp';
import { EditCardSectionsEnum, OptionsType, ProductType } from '../../../../../types/types';
import SectionContainer from '../SectionContainer/SectionContainer';
import { clearEditProduct, selectorEditProduct, updateProductThunk } from '../../../../../store/productSlice';

const getOptions = (optionsStore: OptionsType[]) => {
  const options: OptionsType[] = [];
  options.push({ id: 0, title: '' });
  options.push(...optionsStore);
  return options;
};

export const checkCatalogSection = (product: ProductType) => {
  return !!product.category && !!product.subCategory && !!product.material;
};

const ProductCatalogSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const editProduct = useAppSelector(selectorEditProduct);
  const categoriesRaw = useAppSelector(selectorCategories);
  const subCategoriesStore = useAppSelector(selectorSubCategories);
  const productMaterialsRaw = useAppSelector(selectorProductMaterials);
  const [formCategoryId, setFormCategoryId] = useState<number | undefined>(undefined);

  const subCategoriesRaw = subCategoriesStore.filter(
    (subCategory) => subCategory.categoryId === (editProduct.category ? editProduct.category?.id : formCategoryId)
  );

  const categories = getOptions(categoriesRaw);
  const subCategories = getOptions(subCategoriesRaw);
  const productMaterials = getOptions(productMaterialsRaw);

  const selectedCategory = categories.find((category) => category.id === editProduct.category?.id);
  const formEditCardCategory = formCategoryId
    ? categories.find((category) => category.id === formCategoryId)
    : undefined;

  const selectedSubCategory = subCategories.find((subCategory) => subCategory.id === editProduct.subCategory?.id);
  const selectedProductMaterial = productMaterials.find(
    (productMaterial) => productMaterial.id === editProduct.material?.id
  );

  const onChangeCategorySelector = (id: number) => {
    const onConfirm = (result: OnClosePopUpResultType) => {
      if (result) {
        dispatch(clearEditProduct());
        const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
        if (token && id) {
          setFormCategoryId(id);
          const updateData = {
            productId: editProduct.id,
            code: null,
            price: null,
            subCategoryId: null,
            productMaterialId: null,
            productSortId: null,
            customHeight: null,
            customWidth: null,
            customLength: null,
            customCaliber: null,
            isSeptic: null,
            publicationDate: null,
            clearCategorySizes: true,
          };
          dispatch(updateProductThunk({ token, updateData }));
        }
      }
    };
    if (editProduct.category) {
      const curCategory = categories.find((category) => category.id === editProduct.category?.id);
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
        productId: editProduct.id,
        subCategoryId: id,
      };
      dispatch(updateProductThunk({ token, updateData }));
    }
  };

  const onChangeMaterialSelector = (id: number) => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token && id) {
      const updateData = {
        productId: editProduct.id,
        productMaterialId: id,
      };
      dispatch(updateProductThunk({ token, updateData }));
    }
  };

  const isCompleteCatalogSection = checkCatalogSection(editProduct);

  return (
    <SectionContainer title={EditCardSectionsEnum.lumber} completeCondition={isCompleteCatalogSection}>
      <div className={classes.rowContainer}>
        <SectionSelector
          title={'Раздел каталога'}
          options={categories}
          selectedOption={selectedCategory ? selectedCategory : formEditCardCategory ? formEditCardCategory : undefined}
          onChangeSelector={onChangeCategorySelector}
          dataTestId={'categorySelector'}
        />
        <SectionSelector
          title={'Тип пиломатериала'}
          options={subCategories}
          selectedOption={selectedSubCategory}
          onChangeSelector={onChangeSubCategorySelector}
          dataTestId={'subCategorySelector'}
        />
        <SectionSelector
          title={'Порода древесины'}
          options={productMaterials}
          selectedOption={selectedProductMaterial}
          onChangeSelector={onChangeMaterialSelector}
          dataTestId={'materialSelector'}
        />
      </div>
    </SectionContainer>
  );
};

export default ProductCatalogSection;
