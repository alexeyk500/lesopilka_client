import React, { useCallback, useEffect } from 'react';
import classes from './CardControlAndInfo.module.css';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { EditCardSectionsEnum, PageTypeEnum, QueryEnum } from '../../../types/types';
import CheckBoxEllipse from '../../../components/commonComponents/CheckBoxEllipse/CheckBoxEllipse';
import { selectorUser } from '../../../store/userSlice';
import { getBackwardRouteToManufacturerCatalog } from '../../../utils/functions';
import {
  deleteProductThunk,
  selectorCatalogSearchParams,
  selectorEditProduct,
  selectorProductsSaving,
  setCatalogSearchParams,
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
import { getPriceProductsThunk, selectorPriceEditProductId, setPriceEditProductId } from '../../../store/priceSlice';
import { PageEnum } from '../../../components/AppRouter/AppRouter';
import LicensesMonitor from '../../../components/commonComponents/LicensesMonitor/LicensesMonitor';
import { formatUTC } from '../../../utils/dateTimeFunctions';
import { getManufacturerLicensesInfoThunk } from '../../../store/manLicensesSlice';

const CardControlAndInfo: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);
  const editProduct = useAppSelector(selectorEditProduct);
  const isSaving = useAppSelector(selectorProductsSaving);
  const priceEditProductId = useAppSelector(selectorPriceEditProductId);
  const catalogSearchParams = useAppSelector(selectorCatalogSearchParams);

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
    dispatch(setCatalogSearchParams(undefined));
    dispatch(setPriceEditProductId(undefined));
    navigate(getBackwardRoute);
  };

  const returnToPrice = () => {
    navigate(PageEnum.ManufacturerPricePage);
  };

  const onCloseDeleteCardPopUp = (result?: boolean | FormData) => {
    if (result) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        dispatch(deleteProductThunk({ token, productId: editProduct.id })).then(() => {
          returnToCatalog();
        });
      }
    }
  };

  const onClickDeleteBtn = () => {
    showPortalPopUp({
      popUpContent: <DeleteCardForm product={editProduct} />,
      onClosePopUp: onCloseDeleteCardPopUp,
      titleConfirmBtn: 'Удалить',
      customClassBottomBtnGroup: classes.customClassBottomBtnGroup,
      isDeletePopUp: true,
    });
  };

  const checkConditions = () => {
    const isCompleteCatalogSection = checkCatalogSection(editProduct);
    if (!isCompleteCatalogSection) {
      getInfoPopUp(EditCardSectionsEnum.lumber);
      return false;
    }
    const isCompleteSizesSection = checkSizesSection(editProduct);
    if (!isCompleteSizesSection) {
      getInfoPopUp(EditCardSectionsEnum.sizes);
      return false;
    }
    const isCompleteSortAndSepticSection = checkSortAndSepticSection(editProduct);
    if (!isCompleteSortAndSepticSection) {
      getInfoPopUp(EditCardSectionsEnum.sortAndSeptic);
      return false;
    }
    const isCompleteCheckImagesSection = checkImagesSection(editProduct);
    if (!isCompleteCheckImagesSection) {
      getInfoPopUp(EditCardSectionsEnum.images);
      return false;
    }
    const isCompleteDescriptionSection = checkDescriptionSection(editProduct);
    if (!isCompleteDescriptionSection) {
      getInfoPopUp(EditCardSectionsEnum.description);
      return false;
    }
    const isCompleteCodeSection = checkCodeSection(editProduct);
    if (!isCompleteCodeSection) {
      getInfoPopUp(EditCardSectionsEnum.code);
      return false;
    }
    const isCompletePriceSection = checkPriceSection(editProduct);
    if (!isCompletePriceSection) {
      getInfoPopUp(EditCardSectionsEnum.price);
      return false;
    }
    return true;
  };

  const updatePriceList = useCallback(() => {
    if (user?.manufacturer?.id) {
      const searchParams = new URLSearchParams();
      searchParams.append(QueryEnum.ManufacturerId, user.manufacturer.id.toString());
      searchParams.append(QueryEnum.PageType, PageTypeEnum.pricePage);
      dispatch(getPriceProductsThunk(searchParams));
    }
  }, [dispatch, user?.manufacturer?.id]);

  useEffect(() => {
    updatePriceList();
  }, [updatePriceList]);

  const onClosePopUpUnPublish = () => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    const publicationDate = null;
    if (token) {
      const updateData = {
        productId: editProduct.id,
        publicationDate,
      };
      dispatch(updateProductThunk({ token, updateData })).then(() => {
        dispatch(getManufacturerLicensesInfoThunk({ token }));
      });
    }
  };

  const onClosePopUpPublish = () => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    const publicationDate = new Date().toISOString();
    if (token && publicationDate) {
      const updateData = {
        productId: editProduct.id,
        publicationDate,
      };
      dispatch(updateProductThunk({ token, updateData })).then(() => {
        dispatch(getManufacturerLicensesInfoThunk({ token }));
      });
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
          <ProductCard product={editProduct} isManufacturerProductCard isPreview />
        </div>
        <div className={classes.saveBtnSection}>
          <div className={classes.infoSaveContainer}>
            <div className={classes.title}>{isSaving ? 'Сохранение...' : 'Сохранено:'}</div>
            <div className={classes.info}>{formatUTC(editProduct.editionDate)}</div>
          </div>
        </div>
        <div className={classes.publicationContainer}>
          <CheckBoxEllipse
            title={!!editProduct.publicationDate ? 'Опубликовано:' : 'Опубликовать:'}
            checked={!!editProduct.publicationDate}
            onSelect={onSelectHandler}
          />
          <div className={classes.info}>{formatUTC(editProduct.publicationDate)}</div>
        </div>
        <div className={classes.btnDeleteContainer}>
          <ButtonComponent title={'Удалить'} buttonType={ButtonType.RED} onClick={onClickDeleteBtn} />
        </div>
      </div>

      <div className={classes.licensesMonitorContainer}>
        <LicensesMonitor />
      </div>

      <div className={classes.btnReadyContainer}>
        {priceEditProductId ? (
          <ButtonComponent title={'В прайс'} onClick={returnToPrice} />
        ) : (
          <ButtonComponent title={'В каталог'} onClick={returnToCatalog} />
        )}
      </div>
    </div>
  );
};

export default CardControlAndInfo;
