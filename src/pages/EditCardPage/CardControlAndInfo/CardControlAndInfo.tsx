import React from 'react';
import classes from './CardControlAndInfo.module.css';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { ProductCardDataType } from '../../../types/types';
import { selectorProductMaterials, selectorProductSorts, selectorSubCategories } from '../../../store/catalogSlice';
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
  const allMaterials = useAppSelector(selectorProductMaterials);
  const allSorts = useAppSelector(selectorProductSorts);
  const catalogSearchParams = useAppSelector(selectorCatalogSearchParams);

  const subCategory = subCategoriesStore.find((subCategory) => subCategory.id === editCard.subCategoryId);
  const material = allMaterials.find((material) => material.id === editCard.productMaterialId);
  const sort = allSorts.find((sort) => sort.id === editCard.sortId);

  const productCardData: ProductCardDataType = {
    id: editCard.id,
    material: material ? material.title : '',
    sort: sort ? sort.title : '',
    subCategoryTile: subCategory ? subCategory.title : '',
    image: editCard.images ? (editCard.images.length > 0 ? editCard.images[0] : undefined) : undefined,
    isSeptic: editCard.isSeptic,
    height: editCard.height,
    width: editCard.width,
    caliber: editCard.caliber,
    length: editCard.length,
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
      navigate(`/manufacturer/?${catalogSearchParams}`);
    } else {
      if (user?.manufacturer?.id) {
        user?.manufacturer?.id && navigate(`/manufacturer/?mid=${user?.manufacturer?.id}`);
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
          <ProductCard productCardData={productCardData} isManufacturerProductCard isPreview />
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
