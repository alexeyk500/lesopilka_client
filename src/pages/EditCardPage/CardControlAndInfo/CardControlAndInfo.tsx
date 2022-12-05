import React from 'react';
import classes from './CardControlAndInfo.module.css';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { EditCardSectionsEnum, ProductCardDataType } from '../../../types/types';
import { selectorProductMaterials, selectorProductSorts, selectorSubCategories } from '../../../store/catalogSlice';
import CheckBoxEllipse from '../../../components/commonComponents/CheckBoxEllipse/CheckBoxEllipse';
import { selectorUser } from '../../../store/userSlice';
import { formatUTC, formatPrice, getBackwardRouteToManufacturerCatalog } from '../../../utils/functions';
import {
  deleteProductThunk,
  selectorCatalogSearchParams,
  selectorEditCard,
  selectorProductsSaving,
  updateProductThunk,
} from '../../../store/productSlice';
import ButtonComponent, { ButtonType } from '../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { showPortalPopUp } from '../../../components/PortalPopUp/PortalPopUp';
import DeleteCardForm from '../DeleteCardForm/DeleteCardForm';
import classNames from 'classnames';
import { checkCatalogSection } from '../EditCardMainPart/ProductDetails/ProductCatalogSection/ProductCatalogSection';
import { checkSizesSection } from '../EditCardMainPart/ProductDetails/ProductSizesSection/ProductSizesSection';
import { checkSortAndSepticSection } from '../EditCardMainPart/ProductDetails/ProductSortAndSepticSection/ProductSortAndSepticSection';
import { checkImagesSection } from '../EditCardMainPart/ProductDetails/ProductImagesSection/ProductImagesSection';
import { checkDescriptionSection } from '../EditCardMainPart/ProductDetails/ProductDescription/ProductDescription';
import { checkCodeSection } from '../EditCardMainPart/ProductDetails/ProductCodeSection/ProductCodeSection';
import { checkPriceSection } from '../EditCardMainPart/ProductDetails/ProductPriceSection/ProductPriceSection';

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
    isDried: editCard.isDried,
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

  const getInfoPopUp = (sectionTitle: string) => {
    return showPortalPopUp({
      popUpContent: (
        <div className={classNames(classes.fillSectionPopUp)}>
          {'Заполните раздел '}
          <span className={classes.sectionTitle}>{`"${sectionTitle}"`}</span>
          {' в карточке товара'}
        </div>
      ),
      titleConfirmBtn: 'Понятно',
      oneCenterConfirmBtn: true,
      customClassBottomBtnGroup: classes.oneCenterBtn,
    });
  };

  const returnToCatalog = () => {
    const getBackwardRoute = getBackwardRouteToManufacturerCatalog(user?.manufacturer?.id, catalogSearchParams);
    navigate(getBackwardRoute);
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

  const checkConditions = () => {
    const isCompleteCatalogSection = checkCatalogSection(editCard);
    if (!isCompleteCatalogSection) {
      getInfoPopUp(EditCardSectionsEnum.lumber);
      return false;
    }
    const isCompleteSizesSection = checkSizesSection(editCard);
    if (!isCompleteSizesSection) {
      getInfoPopUp(EditCardSectionsEnum.sizes);
      return false;
    }
    const isCompleteSortAndSepticSection = checkSortAndSepticSection(editCard);
    if (!isCompleteSortAndSepticSection) {
      getInfoPopUp(EditCardSectionsEnum.sortAndSeptic);
      return false;
    }
    const isCompleteCheckImagesSection = checkImagesSection(editCard);
    if (!isCompleteCheckImagesSection) {
      getInfoPopUp(EditCardSectionsEnum.images);
      return false;
    }
    const isCompleteDescriptionSection = checkDescriptionSection(editCard);
    if (!isCompleteDescriptionSection) {
      getInfoPopUp(EditCardSectionsEnum.description);
      return false;
    }
    const isCompleteCodeSection = checkCodeSection(editCard);
    if (!isCompleteCodeSection) {
      getInfoPopUp(EditCardSectionsEnum.code);
      return false;
    }
    const isCompletePriceSection = checkPriceSection(editCard);
    if (!isCompletePriceSection) {
      getInfoPopUp(EditCardSectionsEnum.price);
      return false;
    }
    return true;
  };

  const onClosePopUpUnPublish = () => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    const publicationDate = null;
    if (token) {
      const updateData = {
        productId: editCard.id,
        publicationDate,
      };
      dispatch(updateProductThunk({ token, updateData }));
    }
  };

  const onClosePopUpPublish = () => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    const publicationDate = new Date().toISOString();
    if (token && publicationDate) {
      const updateData = {
        productId: editCard.id,
        publicationDate,
      };
      dispatch(updateProductThunk({ token, updateData }));
    }
  };

  const onSelectHandler = (isChecked?: boolean) => {
    if (isChecked) {
      showPortalPopUp({
        popUpContent: <div className={classNames(classes.publishPopUp)}>{`Снять карточку с публикации?`}</div>,
        titleConfirmBtn: 'Снять',
        onClosePopUp: (result) => {
          result && onClosePopUpUnPublish();
        },
      });
    } else {
      const isConditionsChecked = checkConditions();
      if (isConditionsChecked) {
        showPortalPopUp({
          popUpContent: <div className={classNames(classes.publishPopUp)}>{`Опубликовать карточку?`}</div>,
          titleConfirmBtn: 'Публикация',
          customClassBottomBtnGroup: classes.customClassBottomBtnGroupLogout,
          onClosePopUp: (result) => {
            result && onClosePopUpPublish();
          },
        });
      }
    }
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
          <CheckBoxEllipse
            title={!!editCard.publicationDate ? 'Опубликовано:' : 'Опубликовать:'}
            checked={!!editCard.publicationDate}
            onSelect={onSelectHandler}
          />
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
