import React, { useCallback, useEffect } from 'react';
import classes from './CardControlAndInfo.module.css';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { EditCardSectionsEnum, PageTypeEnum, QueryEnum } from '../../../types/types';
import CheckBoxEllipse from '../../../components/commonComponents/CheckBoxEllipse/CheckBoxEllipse';
import { selectorUser } from '../../../store/userSlice';
import {
  deleteProductThunk,
  productPublicationThunk,
  productStopPublicationThunk,
  selectorEditProduct,
  selectorProductsSaving,
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
import { getPriceProductsThunk, selectorPriceEditProductId } from '../../../store/priceSlice';
import { PageEnum } from '../../../components/AppRouter/AppRouter';
import LicensesMonitor from '../../../components/commonComponents/LicensesMonitor/LicensesMonitor';
import { formatUTC } from '../../../utils/dateTimeFunctions';
import { getManufacturerLicensesInfoThunk } from '../../../store/manLicensesSlice';
import BottomButtonReturnTo, { ReturnToEnum } from '../../../components/BottomButtonReturnTo/BottomButtonReturnTo';

const CardControlAndInfo: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);
  const editProduct = useAppSelector(selectorEditProduct);
  const isSaving = useAppSelector(selectorProductsSaving);
  const priceEditProductId = useAppSelector(selectorPriceEditProductId);

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

  const onCloseDeleteCardPopUp = (result?: boolean | FormData) => {
    if (result) {
      const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
      if (token) {
        dispatch(deleteProductThunk({ token, productId: editProduct.id })).then(() => {
          navigate(PageEnum.ManufacturerPage);
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

  const stopPublicationProduct = () => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token) {
      dispatch(productStopPublicationThunk({ token, productId: editProduct.id })).then(() => {
        dispatch(getManufacturerLicensesInfoThunk({ token }));
      });
    }
  };

  const publicationProduct = () => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (token) {
      dispatch(productPublicationThunk({ token, productId: editProduct.id })).then(() => {
        dispatch(getManufacturerLicensesInfoThunk({ token }));
      });
    }
  };

  const onSelectHandler = (isChecked?: boolean) => {
    if (isChecked) {
      showPortalPopUp({
        popUpContent: <div className={classNames(classes.publishPopUp)}>{`Снять товар с публикации?`}</div>,
        titleConfirmBtn: 'Снять',
        onClosePopUp: (result) => {
          result && stopPublicationProduct();
        },
      });
    } else {
      const isConditionsChecked = checkConditions();
      if (isConditionsChecked) {
        showPortalPopUp({
          popUpContent: <div className={classNames(classes.publishPopUp)}>{`Опубликовать товар?`}</div>,
          titleConfirmBtn: 'Публикация',
          customClassBottomBtnGroup: classes.customClassBottomBtnGroupLogout,
          onClosePopUp: (result) => {
            result && publicationProduct();
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
          <ButtonComponent title={'Удалить'} buttonType={ButtonType.RED_SECONDARY} onClick={onClickDeleteBtn} />
        </div>
      </div>

      <div className={classes.middleSpreadContainer}>
        <LicensesMonitor />
      </div>

      <div className={classes.bottomContainer}>
        {priceEditProductId ? (
          <BottomButtonReturnTo returnTo={ReturnToEnum.price} />
        ) : (
          <BottomButtonReturnTo returnTo={ReturnToEnum.catalog} />
        )}
      </div>
    </div>
  );
};

export default CardControlAndInfo;
