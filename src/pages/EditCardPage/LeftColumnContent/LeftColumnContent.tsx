import React from 'react';
import classes from './LeftColumnContent.module.css';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { useAppSelector } from '../../../hooks/hooks';
import { ProductCardDataType } from '../../../types/types';
import {
  selectorCategorySizes,
  selectorProductMaterials,
  selectorProductSorts,
  selectorSubCategories,
} from '../../../store/catalogSlice';
import CheckBoxEllipse from '../../../components/commonComponents/CheckBoxEllipse/CheckBoxEllipse';
import { selectorUser } from '../../../store/userSlice';
import { formatUTC, getPrice } from '../../../utils/functions';
import { selectorEditCard, selectorProductsSaving } from '../../../store/productSlice';

const LeftColumnContent: React.FC = () => {
  const user = useAppSelector(selectorUser);
  const editCard = useAppSelector(selectorEditCard);
  const isSaving = useAppSelector(selectorProductsSaving);
  const subCategoriesStore = useAppSelector(selectorSubCategories);
  const allCategorySizes = useAppSelector(selectorCategorySizes);
  const allMaterials = useAppSelector(selectorProductMaterials);
  const allSorts = useAppSelector(selectorProductSorts);

  const subCategory = subCategoriesStore.find((subCategory) => subCategory.id === editCard.subCategoryId);
  const material = allMaterials.find((material) => material.id === editCard.productMaterialId);
  const sort = allSorts.find((sort) => sort.id === editCard.sortId);

  let width: string | undefined;
  if (editCard.customWidth) {
    width = editCard.customWidth;
  } else {
    width = allCategorySizes.find((categorySize) => categorySize.id === editCard.widthId)?.value || undefined;
  }

  let height: string | undefined;
  if (editCard.customHeight) {
    height = editCard.customHeight;
  } else {
    height = allCategorySizes.find((categorySize) => categorySize.id === editCard.heightId)?.value || undefined;
  }

  let caliber: string | undefined;
  if (editCard.customCaliber) {
    caliber = editCard.customCaliber;
  } else {
    caliber = allCategorySizes.find((categorySize) => categorySize.id === editCard.caliberId)?.value || undefined;
  }

  let length;
  if (editCard.customLength) {
    length = editCard.customLength;
  } else {
    length = allCategorySizes.find((categorySize) => categorySize.id === editCard.lengthId)?.value || '';
  }

  const productCardData: ProductCardDataType = {
    id: editCard.id,
    material: material ? material.title : '',
    sort: sort ? sort.title : '',
    subCategoryTile: subCategory ? subCategory.title : '',
    image: editCard.images.length > 0 ? editCard.images[0] : undefined,
    isSeptic: editCard.isSeptic,
    width,
    height,
    caliber,
    length,
    price: editCard.price ? getPrice(editCard.price) : '',
    editionDate: editCard.editionDate,
    publicationDate: editCard.publicationDate,
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
  };

  return (
    <>
      <div className={classes.title}>Карточка Товара</div>
      <div className={classes.cardContainer}>
        <ProductCard productCardData={productCardData} isManufacturerProductCard />
      </div>
      <div className={classes.saveBtnSection}>
        <div className={classes.infoSaveContainer}>
          <div className={classes.title}>{isSaving ? 'Сохранение...' : 'Сохранено:'}</div>
          <div className={classes.info}>{formatUTC(editCard.editionDate)}</div>
        </div>
      </div>
      <div className={classes.publicationContainer}>
        <CheckBoxEllipse title={'Опубликовано:'} checked={false} onSelect={() => {}} />
        <div className={classes.info}>{formatUTC(editCard.publicationDate)}</div>
      </div>
    </>
  );
};

export default LeftColumnContent;
