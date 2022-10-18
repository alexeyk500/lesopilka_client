import React from 'react';
import classes from './LeftColumnContent.module.css';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorNewCard } from '../../../store/newCardSlice';
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

const getPrice = (price: string) => {
  const priceInNumber = Number(price.replace(',', '.'));
  const splitPrice = String((Math.round(priceInNumber * 100) / 100).toFixed(2)).split('.');
  return `${splitPrice[0]},${splitPrice[1]}`;
};

const LeftColumnContent: React.FC = () => {
  const user = useAppSelector(selectorUser);
  const newCard = useAppSelector(selectorNewCard);
  const subCategoriesStore = useAppSelector(selectorSubCategories);
  const allCategorySizes = useAppSelector(selectorCategorySizes);
  const allMaterials = useAppSelector(selectorProductMaterials);
  const allSorts = useAppSelector(selectorProductSorts);

  const subCategory = subCategoriesStore.find((subCategory) => subCategory.id === newCard.subCategoryId);
  const material = allMaterials.find((material) => material.id === newCard.productMaterialId);
  const sort = allSorts.find((sort) => sort.id === newCard.sortId);

  let width: string | undefined;
  if (newCard.customWidth) {
    width = newCard.customWidth;
  } else {
    width = allCategorySizes.find((categorySize) => categorySize.id === newCard.widthId)?.value || undefined;
  }

  let height: string | undefined;
  if (newCard.customHeight) {
    height = newCard.customHeight;
  } else {
    height = allCategorySizes.find((categorySize) => categorySize.id === newCard.heightId)?.value || undefined;
  }

  let caliber: string | undefined;
  if (newCard.customCaliber) {
    caliber = newCard.customCaliber;
  } else {
    caliber = allCategorySizes.find((categorySize) => categorySize.id === newCard.caliberId)?.value || undefined;
  }

  let length;
  if (newCard.customLength) {
    length = newCard.customLength;
  } else {
    length = allCategorySizes.find((categorySize) => categorySize.id === newCard.lengthId)?.value || '';
  }

  const productCardData: ProductCardDataType = {
    manufacturer: user?.manufacturer || { inn: '', title: '' },
    manufacturerLocation: user?.manufacturer?.location || { id: 0, title: '' },
    material: material ? material.title : '',
    sort: sort ? sort.title : '',
    subCategoryTile: subCategory ? subCategory.title : '',
    image: newCard.images.length > 0 ? newCard.images[0] : undefined,
    isSeptic: newCard.isSeptic,
    width,
    height,
    caliber,
    length,
    price: newCard.price ? getPrice(newCard.price) : '',
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
