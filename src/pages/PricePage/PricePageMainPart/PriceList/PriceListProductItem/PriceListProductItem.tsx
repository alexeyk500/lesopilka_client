import React from 'react';
import { ProductType } from '../../../../../types/types';
import classes from './PriceListProductItem.module.css';
import { checkIsManufacturerPage, getProductSizesStr } from '../../../../../utils/functions';
import visibilityIcoOn from '../../../../../img/visibilityIcoOn.svg';
import editBlueIco from '../../../../../img/editBlueIco.svg';
import { PageEnum } from '../../../../../components/AppRouter/AppRouter';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { setPriceEditProductId } from '../../../../../store/priceSlice';
import { selectorBasketProducts } from '../../../../../store/productSlice';
import classNames from 'classnames';
import cartIco from '../../../../../img/cartIcoBlueStroke.svg';
import cartIcoSelected from '../../../../../img/cartIcoSelected.svg';
import { showPopUpDeleteProductFromBasket } from '../../../../../components/InfoAndErrorMessageForm/InfoAndErrorMessageForm';
import { toggleProductForBasketThunk } from '../../../../../store/basketSlice';
import useShowDetailProductCardPopUp from '../../../../../hooks/useShowDetailProductCardPopUp';

type PropsType = {
  product: ProductType;
  highlighted?: boolean;
};

const PriceListProductItem: React.FC<PropsType> = ({ product, highlighted }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const basketProducts = useAppSelector(selectorBasketProducts);
  const isManufacturerPage = checkIsManufacturerPage(location);
  const productSizes = getProductSizesStr(product);

  const showDetailProductCardPopUp = useShowDetailProductCardPopUp(product);

  const onClickEdit = () => {
    dispatch(setPriceEditProductId(product.id));
    navigate(`${PageEnum.EditProduct}/${product.id}`);
  };

  const onClickView = () => {
    showDetailProductCardPopUp();
  };

  const isProductInBasket = !!basketProducts.find((basketProduct) => basketProduct.id === product.id);

  const onToggleBasket = () => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (product?.id && token) {
      if (isProductInBasket) {
        showPopUpDeleteProductFromBasket(product, dispatch);
      } else {
        dispatch(toggleProductForBasketThunk({ productId: product.id, token }));
      }
    }
  };

  return (
    <div className={classNames(classes.container, { [classes.notPublished]: product.publicationDate === undefined })}>
      <div className={classNames(classes.infoRow, { [classes.highlighted]: highlighted && isManufacturerPage })}>
        <div className={classes.sizeContainer}>{productSizes}</div>
        <div className={classes.materialContainer}>{product.material?.title}</div>
        <div className={classes.sortContainer}>{product.sort?.title}</div>
        <div className={classes.codeContainer}>{product.code}</div>
        <div className={classes.priceContainer}>{product.price}</div>
        <div className={classes.actionsContainer}>
          <div className={classes.visibilityIcoContainer} onClick={onClickView}>
            <img className={classes.visibilityIco} src={visibilityIcoOn} alt="view" />
          </div>
          {isManufacturerPage ? (
            <div className={classes.editIcoContainer} onClick={onClickEdit}>
              <img className={classes.editBlueIco} src={editBlueIco} alt="edit" />
            </div>
          ) : (
            <div className={classes.toBasketContainer} onClick={onToggleBasket}>
              <img className={classes.basketIco} src={isProductInBasket ? cartIcoSelected : cartIco} alt="to basket" />
            </div>
          )}
        </div>
      </div>
      <div className={classes.delimiter} />
    </div>
  );
};

export default PriceListProductItem;
