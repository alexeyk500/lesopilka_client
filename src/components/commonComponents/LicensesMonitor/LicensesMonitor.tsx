import React from 'react';
import classes from './LicensesMonitor.module.css';
import IconButton from '../IconButton/IconButton';
import buyLicenses from '../../../img/buyLicensesWhiteIco.svg';
import ButtonsSection from '../ButtonsSection/ButtonsSection';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorPriceProducts } from '../../../store/priceSlice';

const LicensesMonitor = () => {
  const licenseCount = 1250;
  const products = useAppSelector(selectorPriceProducts);
  const publishedProductsCount = products.filter((product) => product.publicationDate).length;

  return (
    <ButtonsSection title={'Лицензии'}>
      <div className={classes.infoContainer}>
        <div className={classes.rowContainer}>
          <span className={classes.title}>Позиций опубликовано</span>-
          <span className={classes.amount}>&nbsp;&nbsp;{publishedProductsCount}</span>
        </div>
        <div className={classes.rowContainer}>
          <span className={classes.title}>Куплено лицензий</span>-
          <span className={classes.amount}>&nbsp;&nbsp;{licenseCount}</span>
        </div>
        <div className={classes.delimiter} />
        <div className={classes.rowContainer}>
          <span className={classes.title}>Свободно лицензий</span>-
          <span className={classes.amount}>&nbsp;&nbsp;{licenseCount - publishedProductsCount}</span>
        </div>
      </div>
      <IconButton ico={buyLicenses} title={'Купить лицензии'} customIconClasses={classes.buyLicenses} />
    </ButtonsSection>
  );
};

export default LicensesMonitor;
