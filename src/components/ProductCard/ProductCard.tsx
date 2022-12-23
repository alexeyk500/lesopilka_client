import React from 'react';
import classes from './ProductCard.module.css';
import addCardButton from '../../img/addCardButton.svg';
import { DriedEnum, ProductType, SepticEnum } from '../../types/types';
import noImageIco from './../../img/fotoIco.svg';
import starIco from '../../img/starIcoBlueStroke.svg';
import cartIco from './../../img/cartIcoBlueStroke.svg';
import cartIcoSelected from './../../img/cartIcoSelected.svg';
import dimensionsIco from './../../img/dimensionsIco.svg';
import wareHouseIco from './../../img/wareHouseIco.svg';
import locationIco from './../../img/locationIco.svg';
import rubleIco from './../../img/rubleIco.svg';
import materialIco from './../../img/materialIco.svg';
import classNames from 'classnames';
import { formatPrice, getProductSizesStr } from '../../utils/functions';
import { useAppDispatch } from '../../hooks/hooks';
import { toggleProductForBasketThunk } from '../../store/basketSlice';
import { showPopUpDeleteProductFromBasket } from '../InfoAndErrorMessageForm/InfoAndErrorMessageForm';

type PropsType = {
  product?: ProductType;
  isAddProductCard?: boolean;
  isManufacturerProductCard?: boolean;
  onClick?: (id: number | undefined) => void;
  isPreview?: boolean;
};

const ProductCard: React.FC<PropsType> = ({
  product,
  isAddProductCard,
  isManufacturerProductCard,
  onClick,
  isPreview,
}) => {
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    if (onClick) {
      onClick(product?.id);
    }
  };

  const isDraftProductCard = !product?.publicationDate && !isAddProductCard && !isPreview;
  const productSizes = getProductSizesStr(product);

  const onClickToBasket = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (product?.id && token) {
      if (product.amountInBasket) {
        showPopUpDeleteProductFromBasket(product, dispatch);
      } else {
        dispatch(toggleProductForBasketThunk({ productId: product.id, token }));
      }
    }
  };

  const onClickToFavorite = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
  };

  return (
    <div className={classes.wrapper} onClick={onClickHandler}>
      <div className={classNames(classes.container, { [classes.notPublished]: isDraftProductCard })}>
        {isAddProductCard ? (
          <div className={classes.addProductCardContainer}>
            <img src={addCardButton} className={classes.addCardButton} alt="add card button" />
            <div className={classes.addCardTitle}>Добавить карточку</div>
          </div>
        ) : (
          <>
            <div className={classNames(classes.imageContainer, { [classes.notPublished]: isDraftProductCard })}>
              {product?.images ? (
                <img src={product.images?.[0] ? product.images[0] : undefined} className={classes.img} alt="product" />
              ) : (
                <div className={classes.noImageContainer}>
                  <img src={noImageIco} className={classes.noImg} alt="no product" />
                  <div>Добавьте изображение</div>
                </div>
              )}
            </div>
            <div className={classes.descriptionContainer}>
              <div className={classes.rowContainerEnd}>
                <div className={classes.subCategoryTile}>{product?.subCategory?.title}</div>
                {!isManufacturerProductCard && (
                  <div className={classes.btnGroup}>
                    <div className={classes.starIcoContainer}>
                      <img src={starIco} className={classes.starIco} onClick={onClickToFavorite} alt="favorite" />
                    </div>
                    <img
                      src={product?.amountInBasket ? cartIcoSelected : cartIco}
                      className={classes.cartIco}
                      onClick={onClickToBasket}
                      alt="to basket"
                    />
                  </div>
                )}
              </div>
              <div className={classes.delimiter} />

              <div className={classes.rowContainer}>
                <div className={classes.dimensionsIcoContainer}>
                  <img src={materialIco} className={classes.materialsIco} alt="materials" />
                </div>
                <div className={classes.dimensionsAndMaterialContainer}>
                  <div className={classes.materialTitle}>{product?.material?.title}</div>
                  <div className={classes.sortTitle}>{product?.sort?.title}</div>
                </div>
              </div>
              <div className={classes.delimiter} />

              <div className={classes.rowContainer}>
                <div className={classes.rowContainer}>
                  <div className={classes.dimensionsIcoContainer}>
                    <img src={dimensionsIco} className={classes.dimensionsIco} alt="dimensions" />
                  </div>
                  <div className={classes.dimensionsTile}>{productSizes}</div>
                </div>
                <div className={classes.optionsContainer}>
                  {product?.isSeptic && !product?.isDried ? (
                    <div className={classes.isSeptic}>{SepticEnum.septic}</div>
                  ) : null}
                  {product?.isDried && !product?.isSeptic ? (
                    <div className={classes.isDried}>{DriedEnum.dried}</div>
                  ) : null}
                  {product?.isDried && product?.isSeptic ? (
                    <>
                      <div className={classes.doubleRow}>{DriedEnum.dried}</div>
                      <div className={classes.doubleRow}>{SepticEnum.septic}</div>
                    </>
                  ) : null}
                </div>
              </div>
              <div className={classes.delimiter} />
              <div className={classes.rowContainer}>
                <div className={classes.wareHouseIcoContainer}>
                  <img src={wareHouseIco} className={classes.wareHouseIco} alt="dimensions" />
                </div>
                {product?.manufacturer?.title}
              </div>
              <div className={classes.delimiter} />
              <div className={classes.rowContainer}>
                <div className={classes.locationIcoContainer}>
                  <img src={locationIco} className={classes.locationIco} alt="dimensions" />
                </div>
                {product?.manufacturer?.address.location.title}
              </div>
              <div className={classes.delimiter} />
              <div className={classes.rowContainer}>
                <div className={classes.rubleIcoContainer}>
                  <img src={rubleIco} className={classes.rubleIco} alt="dimensions" />
                </div>
                {formatPrice(product?.price)}
              </div>
            </div>
          </>
        )}
      </div>
      {isDraftProductCard && <div className={classes.draft}>Черновик</div>}
    </div>
  );
};

export default ProductCard;
