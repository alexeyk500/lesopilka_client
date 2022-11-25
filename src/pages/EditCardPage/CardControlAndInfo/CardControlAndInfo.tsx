import React from 'react';
import classes from './CardControlAndInfo.module.css';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { ProductCardDataType } from '../../../types/types';
import {
  selectorCategorySizes,
  selectorProductMaterials,
  selectorProductSorts,
  selectorSubCategories,
} from '../../../store/catalogSlice';
import CheckBoxEllipse from '../../../components/commonComponents/CheckBoxEllipse/CheckBoxEllipse';
import { selectorUser } from '../../../store/userSlice';
import { formatUTC, formatPrice } from '../../../utils/functions';
import {
  deleteProductThunk,
  selectorCatalogSearchParams,
  selectorEditCard,
  selectorProductsSaving,
} from '../../../store/productSlice';
import ButtonComponent, { ButtonType } from '../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { showPortalPopUp } from '../../../components/PortalPopUp/PortalPopUp';
import DeleteCardForm from '../DeleteCardForm/DeleteCardForm';

const CardControlAndInfo: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);
  const editCard = useAppSelector(selectorEditCard);
  const isSaving = useAppSelector(selectorProductsSaving);
  const subCategoriesStore = useAppSelector(selectorSubCategories);
  const allCategorySizes = useAppSelector(selectorCategorySizes);
  const allMaterials = useAppSelector(selectorProductMaterials);
  const allSorts = useAppSelector(selectorProductSorts);
  const catalogSearchParams = useAppSelector(selectorCatalogSearchParams);

  const subCategory = subCategoriesStore.find((subCategory) => subCategory.id === editCard.subCategoryId);
  const material = allMaterials.find((material) => material.id === editCard.productMaterialId);
  const sort = allSorts.find((sort) => sort.id === editCard.sortId);

  let width: string | undefined;
  if (editCard.customWidthValue) {
    width = editCard.customWidthValue;
  } else {
    width = allCategorySizes.find((categorySize) => categorySize.id === editCard.widthId)?.value || undefined;
  }

  let height: string | undefined;
  if (editCard.customHeightValue) {
    height = editCard.customHeightValue;
  } else {
    height = allCategorySizes.find((categorySize) => categorySize.id === editCard.heightId)?.value || undefined;
  }

  let caliber: string | undefined;
  if (editCard.customCaliberValue) {
    caliber = editCard.customCaliberValue;
  } else {
    caliber = allCategorySizes.find((categorySize) => categorySize.id === editCard.caliberId)?.value || undefined;
  }

  let length;
  if (editCard.customLengthValue) {
    length = editCard.customLengthValue;
  } else {
    length = allCategorySizes.find((categorySize) => categorySize.id === editCard.lengthId)?.value || '';
  }

  const productCardData: ProductCardDataType = {
    id: editCard.id,
    material: material ? material.title : '',
    sort: sort ? sort.title : '',
    subCategoryTile: subCategory ? subCategory.title : '',
    image: editCard.images ? (editCard.images.length > 0 ? editCard.images[0] : undefined) : undefined,
    isSeptic: editCard.isSeptic,
    width,
    height,
    caliber,
    length,
    price: editCard.price ? formatPrice(editCard.price) : '',
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

  const returnToCatalog = () => {
    if (catalogSearchParams) {
      navigate(`/sales/?${catalogSearchParams}`);
    } else {
      if (user?.manufacturer?.id) {
        user?.manufacturer?.id && navigate(`/sales/?mid=${user?.manufacturer?.id}`);
      } else {
        navigate(`/`);
      }
    }
  };

  const onClickReadyBtn = () => {
    returnToCatalog();
  };

  const onCloseDeleteCardPopUp = (result?: boolean | FormData) => {
    if (result) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        dispatch(deleteProductThunk({ token, productId: editCard.id })).then(() => {
          returnToCatalog();
        });
      }
    }
  };

  const onClickDeleteBtn = () => {
    showPortalPopUp({
      popUpContent: <DeleteCardForm productCardData={productCardData} />,
      onClosePopUp: onCloseDeleteCardPopUp,
      titleConfirmBtn: 'Удалить',
      customClassBottomBtnGroup: classes.customClassBottomBtnGroup,
      isDeletePopUp: true,
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.topPartContainer}>
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
        <div className={classes.btnReadyContainer}>
          <ButtonComponent title={'В каталог'} onClick={onClickReadyBtn} />
        </div>
      </div>
      <div className={classes.btnDeleteContainer}>
        <ButtonComponent title={'Удалить'} buttonType={ButtonType.RED} onClick={onClickDeleteBtn} />
      </div>
    </div>
  );
};

export default CardControlAndInfo;
