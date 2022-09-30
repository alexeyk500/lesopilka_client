import React from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { selectorCatalogIsLoading } from '../../store/catalogSlice';
import classes from './SalesPage.module.css';
import Preloader from '../../components/Preloader/Preloader';
import Catalog from '../../components/Catalog/Catalog';
import SalesMainPart from './SalesMainPart/SalesMainPart';
import LeftColumn from '../../components/LeftColumn/LeftColumn';

const SalesPage = () => {
  const isLoading = useAppSelector(selectorCatalogIsLoading);
  return (
    <div className={classes.container}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <LeftColumn>
            <Catalog />
          </LeftColumn>
          <SalesMainPart />
        </>
      )}
    </div>
  );
};

export default SalesPage;
