import React from 'react';
import classes from './LeftColumnContent.module.css';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorProductCard } from '../../../store/productCardSlice';
import { ProductCardDataType } from '../../../types/types';
import {
  selectorCategorySizes,
  selectorProductMaterials,
  selectorProductSorts,
  selectorSubCategories,
} from '../../../store/catalogSlice';
import CheckBoxEllipse from '../../../components/commonComponents/CheckBoxEllipse/CheckBoxEllipse';
import ButtonComponent from '../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { selectorUser } from '../../../store/userSlice';
import { getPrice } from '../../../utils/functions';

const LeftColumnContent: React.FC = () => {
  const user = useAppSelector(selectorUser);
  const productCard = useAppSelector(selectorProductCard);
  const subCategoriesStore = useAppSelector(selectorSubCategories);
  const allCategorySizes = useAppSelector(selectorCategorySizes);
  const allMaterials = useAppSelector(selectorProductMaterials);
  const allSorts = useAppSelector(selectorProductSorts);

  const subCategory = subCategoriesStore.find((subCategory) => subCategory.id === productCard.subCategoryId);
  const material = allMaterials.find((material) => material.id === productCard.productMaterialId);
  const sort = allSorts.find((sort) => sort.id === productCard.sortId);

  let width: string | undefined;
  if (productCard.customWidth) {
    width = productCard.customWidth;
  } else {
    width = allCategorySizes.find((categorySize) => categorySize.id === productCard.widthId)?.value || undefined;
  }

  let height: string | undefined;
  if (productCard.customHeight) {
    height = productCard.customHeight;
  } else {
    height = allCategorySizes.find((categorySize) => categorySize.id === productCard.heightId)?.value || undefined;
  }

  let caliber: string | undefined;
  if (productCard.customCaliber) {
    caliber = productCard.customCaliber;
  } else {
    caliber = allCategorySizes.find((categorySize) => categorySize.id === productCard.caliberId)?.value || undefined;
  }

  let length;
  if (productCard.customLength) {
    length = productCard.customLength;
  } else {
    length = allCategorySizes.find((categorySize) => categorySize.id === productCard.lengthId)?.value || '';
  }

  const productCardData: ProductCardDataType = {
    manufacturer: user?.manufacturer || {
      id: 0,
      inn: '',
      title: '',
      phone: '',
      address: {
        id: 0,
        region: { id: 0, title: '' },
        location: { id: 0, title: '' },
        street: '',
        building: '',
        office: '',
      },
    },
    material: material ? material.title : '',
    sort: sort ? sort.title : '',
    subCategoryTile: subCategory ? subCategory.title : '',
    image: productCard.images.length > 0 ? productCard.images[0] : undefined,
    isSeptic: productCard.isSeptic,
    width,
    height,
    caliber,
    length,
    price: productCard.price ? getPrice(productCard.price) : '',
  };

  return (
    <>
      <div className={classes.title}>Карточка Товара</div>
      <div className={classes.cardContainer}>
        <ProductCard productCardData={productCardData} />
      </div>
      <div className={classes.saveBtnSection}>
        <div className={classes.infoSaveContainer}>
          <div className={classes.saveBtnTitle}>Сохранено:</div>
          <div className={classes.saveBtnDate}>14 октября 2022 в 17:50</div>
        </div>
        <div className={classes.saveBtnContainer}>
          <ButtonComponent title={'Сохранить'} onClick={() => {}} />
        </div>
      </div>
      <div className={classes.publicationContainer}>
        <CheckBoxEllipse title={'Опубликовано:'} checked={false} onSelect={() => {}} />
      </div>
    </>
  );
};

export default LeftColumnContent;
