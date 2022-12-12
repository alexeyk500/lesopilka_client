import React from 'react';
import classes from './PriceSelectors.module.css';
import IconButton from '../../../../components/commonComponents/IconButton/IconButton';

import downloadIco from '../../../../img/downloadFileWhiteIco.svg';
import getLinkIco from '../../../../img/getLinkWhiteIco.svg';
import printIco from '../../../../img/printWhiteIco.svg';
import downloadPrice from '../../../../img/downloadPriceWhiteIco.svg';

import ButtonsSection from '../../../../components/commonComponents/ButtonsSection/ButtonsSection';
import CheckBoxSquare from '../../../../components/commonComponents/CheckBoxSquare/CheckBoxSquare';
import CheckBoxSection from '../../../../components/commonComponents/CheckBoxSection/CheckBoxSection';
import LicensesMonitor from '../../../../components/commonComponents/LicensesMonitor/LicensesMonitor';
import ButtonComponent from '../../../../components/commonComponents/ButtonComponent/ButtonComponent';
import { getBackwardRouteToManufacturerCatalog } from '../../../../utils/functions';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorUser } from '../../../../store/userSlice';
import { selectorCatalogSearchParams } from '../../../../store/productSlice';
import { PriceSelectedTypeEnum } from '../../../../types/types';
import { selectorSelectedPriceType, setSelectedType } from '../../../../store/priceSlice';

const PriceSelectors: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);
  const selectedPriceType = useAppSelector(selectorSelectedPriceType);
  const catalogSearchParams = useAppSelector(selectorCatalogSearchParams);
  const returnToCatalog = () => {
    const getBackwardRoute = getBackwardRouteToManufacturerCatalog(user?.manufacturer?.id, catalogSearchParams);
    navigate(getBackwardRoute);
  };

  const onClickReadyBtn = () => {
    returnToCatalog();
  };

  const onSelect = (id: number) => {
    if (id === 1) {
      dispatch(setSelectedType(PriceSelectedTypeEnum.published));
    } else if (id === 2) {
      dispatch(setSelectedType(PriceSelectedTypeEnum.draft));
    } else if (id === 3) {
      dispatch(setSelectedType(PriceSelectedTypeEnum.all));
    }
  };

  return (
    <div className={classes.container}>
      <CheckBoxSection title={'Товары'}>
        <CheckBoxSquare
          id={1}
          title={'Опубликованные'}
          checked={selectedPriceType === PriceSelectedTypeEnum.published}
          onSelect={onSelect}
        />
        <CheckBoxSquare
          id={2}
          title={'Черновики'}
          checked={selectedPriceType === PriceSelectedTypeEnum.draft}
          onSelect={onSelect}
        />
        <CheckBoxSquare
          id={3}
          title={'Все'}
          checked={selectedPriceType === PriceSelectedTypeEnum.all}
          onSelect={onSelect}
        />
      </CheckBoxSection>
      <ButtonsSection title={'Прайс'}>
        <IconButton ico={downloadIco} title={'Скачать'} customIconClasses={classes.downloadIco} />
        <IconButton ico={getLinkIco} title={'Ссылка'} customIconClasses={classes.getLinkIco} />
        <IconButton ico={printIco} title={'Печать'} />
      </ButtonsSection>
      <ButtonsSection title={'Цены'}>
        <IconButton ico={downloadPrice} title={'Загрузить'} customIconClasses={classes.downloadPrice} />
      </ButtonsSection>
      <LicensesMonitor />
      <div className={classes.btnReadyContainer}>
        <ButtonComponent title={'В каталог'} onClick={onClickReadyBtn} />
      </div>
    </div>
  );
};

export default PriceSelectors;