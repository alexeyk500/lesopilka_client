import React from 'react';
import classes from './CatalogButton.module.css';
import catalogIcoGray from '../../../img/catalogIcoGray.svg';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/hooks';
import { selectorCatalogSearchParams } from '../../../store/productSlice';
import { PageEnum } from '../../AppRouter/AppRouter';

const CatalogButton: React.FC = () => {
  const navigate = useNavigate();
  const catalogSearchParams = useAppSelector(selectorCatalogSearchParams);

  const onClickGoToCatalog = () => {
    if (catalogSearchParams) {
      navigate(`${PageEnum.MainPage}?${catalogSearchParams}`);
    } else {
      navigate(PageEnum.MainPage);
    }
  };

  return (
    <button className={classes.container} onClick={onClickGoToCatalog}>
      <img className={classes.ico} src={catalogIcoGray} alt="button catalog" />
    </button>
  );
};

export default CatalogButton;
