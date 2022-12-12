import React from 'react';
import { ProductType } from '../../../../../types/types';
import classes from './PriceListProductItem.module.css';
import { getProductSizesStr } from '../../../../../utils/functions';
import visibilityIcoOn from '../../../../../img/visibilityIcoOn.svg';
import editBlueIco from '../../../../../img/editBlueIco.svg';
import { PageEnum } from '../../../../../components/AppRouter/AppRouter';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../../hooks/hooks';
import { setPriceEditProductId } from '../../../../../store/priceSlice';
import { getProductThunk } from '../../../../../store/productSlice';
import { isFulfilled } from '@reduxjs/toolkit';
import { showDetailProductCardPopUp } from '../../../../../components/DetailProductCard/DetailProductCard';
import classNames from 'classnames';

type PropsType = {
  product: ProductType;
};

const PriceListProductItem: React.FC<PropsType> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const productSizes = getProductSizesStr(product);

  const onClickEdit = () => {
    dispatch(setPriceEditProductId(product.id));
    navigate(`${PageEnum.EditProduct}/${product.id}`);
  };

  const onClickView = () => {
    dispatch(getProductThunk(product.id)).then((result) => {
      if (isFulfilled(result)) {
        showDetailProductCardPopUp(result.payload);
      }
    });
  };

  return (
    <div className={classNames(classes.container, { [classes.notPublished]: product.publicationDate === undefined })}>
      <div className={classes.infoRow}>
        <div className={classes.sizeContainer}>{productSizes}</div>
        <div className={classes.materialContainer}>{product.material?.title}</div>
        <div className={classes.sortContainer}>{product.sort?.title}</div>
        <div className={classes.codeContainer}>{product.code}</div>
        <div className={classes.priceContainer}>{product.price}</div>
        <div className={classes.actionsContainer}>
          <div className={classes.visibilityIcoContainer} onClick={onClickView}>
            <img className={classes.visibilityIco} src={visibilityIcoOn} alt="view" />
          </div>
          <div className={classes.editIcoContainer} onClick={onClickEdit}>
            <img className={classes.editBlueIco} src={editBlueIco} alt="edit" />
          </div>
        </div>
      </div>
      <div className={classes.delimiter} />
    </div>
  );
};

export default PriceListProductItem;
