import React from 'react';
import classes from './PriceSelectors.module.css';
import IconButton from '../../../../components/commonComponents/IconButton/IconButton';

import downloadIco from '../../../../img/downloadFileWhiteIco.svg';

import ButtonsSection from '../../../../components/commonComponents/ButtonsSection/ButtonsSection';
import CheckBoxSquare from '../../../../components/commonComponents/CheckBoxSquare/CheckBoxSquare';
import CheckBoxSection from '../../../../components/commonComponents/CheckBoxSection/CheckBoxSection';
import LicensesMonitor from '../../../../components/commonComponents/LicensesMonitor/LicensesMonitor';
import ButtonComponent from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { checkIsManufacturerPage, getBackwardRouteToManufacturerCatalog } from '../../../../utils/functions';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorUser } from '../../../../store/userSlice';
import { selectorCatalogSearchParams } from '../../../../store/productSlice';
import { PriceSelectedTypeEnum } from '../../../../types/types';
import {
  selectorPriceProducts,
  selectorPriceReturnTo,
  selectorSelectedPriceType,
  setPriceDownLoading,
  setPriceReturnTo,
  setSelectedType,
} from '../../../../store/priceSlice';
import { PageEnum } from '../../../../components/AppRouter/AppRouter';
import { serverApi } from '../../../../api/serverApi';

const getReturnInfo = (returnTo?: string) => {
  if (returnTo?.includes(PageEnum.BasketPage)) {
    return { title: 'В корзину', url: returnTo };
  } else if (returnTo?.includes(PageEnum.NewOrder)) {
    return { title: 'В заказ', url: returnTo };
  }
  return { title: 'В каталог', url: returnTo ? returnTo : PageEnum.RootPage };
};

const PriceSelectors: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);
  const products = useAppSelector(selectorPriceProducts);
  const selectedPriceType = useAppSelector(selectorSelectedPriceType);
  const catalogSearchParams = useAppSelector(selectorCatalogSearchParams);
  const returnTo = useAppSelector(selectorPriceReturnTo);
  const isManufacturerPage = checkIsManufacturerPage(location);

  const productsCount = products.length;
  const publishedProductsCount = products.filter((product) => product.publicationDate).length;

  const returnInfo = getReturnInfo(returnTo);

  const onSelect = (id: number) => {
    if (id === 1) {
      dispatch(setSelectedType(PriceSelectedTypeEnum.published));
    } else if (id === 2) {
      dispatch(setSelectedType(PriceSelectedTypeEnum.draft));
    } else if (id === 3) {
      dispatch(setSelectedType(PriceSelectedTypeEnum.all));
    }
  };

  const onClickDownload = async () => {
    if (user?.manufacturer?.id) {
      dispatch(setPriceDownLoading(true));
      const response = await serverApi.getPricePDF(user.manufacturer.id);
      const blob = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank_');
      dispatch(setPriceDownLoading(false));
    }
    // window.open('http://localhost:5500/api/price/9', '_blank');
  };

  const returnToCatalog = () => {
    const getBackwardRoute = getBackwardRouteToManufacturerCatalog(user?.manufacturer?.id, catalogSearchParams);
    navigate(getBackwardRoute);
  };
  const onClickReadyBtn = () => {
    returnToCatalog();
  };

  const onClickReturnTo = () => {
    dispatch(setPriceReturnTo(PageEnum.RootPage));
    navigate(returnInfo.url);
  };

  return (
    <div className={classes.container}>
      {isManufacturerPage && (
        <CheckBoxSection title={'Товары'}>
          <CheckBoxSquare
            id={1}
            title={'Опубликованные'}
            checked={selectedPriceType === PriceSelectedTypeEnum.published}
            onSelect={onSelect}
            amount={publishedProductsCount}
          />
          <CheckBoxSquare
            id={2}
            title={'Черновики'}
            checked={selectedPriceType === PriceSelectedTypeEnum.draft}
            onSelect={onSelect}
            amount={productsCount - publishedProductsCount}
          />
          <CheckBoxSquare
            id={3}
            title={'Все'}
            checked={selectedPriceType === PriceSelectedTypeEnum.all}
            onSelect={onSelect}
            amount={productsCount}
          />
        </CheckBoxSection>
      )}
      <ButtonsSection title={'Прайс'}>
        <IconButton
          ico={downloadIco}
          title={'Скачать'}
          customIconClasses={classes.downloadIco}
          onClick={onClickDownload}
        />
        {/*{isManufacturerPage && (*/}
        {/*  <>*/}
        {/*    <IconButton ico={getLinkIco} title={'Ссылка'} customIconClasses={classes.getLinkIco} />*/}
        {/*    <IconButton ico={printIco} title={'Печать'} />*/}
        {/*  </>*/}
        {/*)}*/}
      </ButtonsSection>
      {isManufacturerPage && (
        <>
          {/*<ButtonsSection title={'Цены'}>*/}
          {/*  <IconButton ico={downloadPrice} title={'Загрузить'} customIconClasses={classes.downloadPrice} />*/}
          {/*</ButtonsSection>*/}
          <LicensesMonitor />
        </>
      )}
      {isManufacturerPage ? (
        <div className={classes.btnReadyContainer}>
          <ButtonComponent title={'В каталог'} onClick={onClickReadyBtn} />
        </div>
      ) : (
        <div className={classes.btnReadyContainer}>
          <ButtonComponent title={returnInfo.title} onClick={onClickReturnTo} />
        </div>
      )}
    </div>
  );
};

export default PriceSelectors;
