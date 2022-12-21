import React from 'react';
import classes from '../CartButton/CartButton.module.css';
import catalogIcoGray from '../../../img/catalogIcoGray.svg';
import { useNavigate } from 'react-router-dom';
import { PageEnum } from '../../AppRouter/AppRouter';

const CatalogButton: React.FC = () => {
  const navigate = useNavigate();

  const onClickCatalog = () => {
    navigate(PageEnum.RootPage);
  };

  return (
    <button className={classes.container} onClick={onClickCatalog}>
      <img className={classes.ico} src={catalogIcoGray} alt="button catalog" />
    </button>
  );
};

export default CatalogButton;
