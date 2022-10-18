import React from 'react';
import classes from './ProductCard.module.css';
import addCardButton from '../../img/addCardButton.svg';
import { useNavigate } from 'react-router-dom';
import { ProductCardDataType } from '../../types/types';
import noImageIco from './../../img/fotoIco.svg';
import starIco from './../../img/starIco.svg';
import cartIco from './../../img/cartIco.svg';
import dimensionsIco from './../../img/dimensionsIco.svg';
import wareHouseIco from './../../img/wareHouseIco.svg';
import locationIco from './../../img/locationIco.svg';
import rubleIco from './../../img/rubleIco.svg';
import materialIco from './../../img/materialIco.svg';

type PropsType = {
  productCardData?: ProductCardDataType;
  isAddProductCard?: boolean;
};

const ProductCard: React.FC<PropsType> = ({ isAddProductCard, productCardData }) => {
  const navigate = useNavigate();

  const onClick = () => {
    if (isAddProductCard) {
      navigate('/add_card');
    }
  };

  return (
    <div className={classes.container} onClick={onClick}>
      {isAddProductCard ? (
        <div className={classes.addProductCardContainer}>
          <img src={addCardButton} className={classes.addCardButton} alt="add card button" />
          <div className={classes.addCardTitle}>Добавить карточку</div>
        </div>
      ) : (
        <>
          <div className={classes.imageContainer}>
            {productCardData && productCardData.image ? (
              <img src={productCardData ? productCardData.image : undefined} className={classes.img} alt="product" />
            ) : (
              <div className={classes.noImageContainer}>
                <img src={noImageIco} className={classes.noImg} alt="no product" />
                <div>Добавьте изображение</div>
              </div>
            )}
          </div>
          <div className={classes.descriptionContainer}>
            <div className={classes.rowContainerEnd}>
              <div className={classes.subCategoryTile}>{productCardData && productCardData.subCategoryTile}</div>
              <div className={classes.btnGroup}>
                <div className={classes.starIcoContainer}>
                  <img src={starIco} className={classes.starIco} alt="no product" />
                </div>
                <img src={cartIco} className={classes.cartIco} alt="no product" />
              </div>
            </div>
            <div className={classes.delimiter} />

            <div className={classes.rowContainer}>
              <div className={classes.dimensionsIcoContainer}>
                <img src={materialIco} className={classes.materialsIco} alt="materials" />
              </div>
              <div className={classes.dimensionsAndMaterialContainer}>
                <div className={classes.materialTitle}>
                  {productCardData && productCardData.material && productCardData.material}
                </div>
                <div className={classes.sortTitle}>
                  {productCardData && productCardData.sort && productCardData.sort}
                </div>
              </div>
            </div>
            <div className={classes.delimiter} />

            <div className={classes.rowContainer}>
              <div className={classes.rowContainer}>
                <div className={classes.dimensionsIcoContainer}>
                  <img src={dimensionsIco} className={classes.dimensionsIco} alt="dimensions" />
                </div>
                <div className={classes.dimensionsTile}>
                  {productCardData && productCardData.caliber ? (
                    <>
                      {productCardData && productCardData.caliber && productCardData.caliber}

                      {productCardData && productCardData.length && `*${productCardData.length}`}
                    </>
                  ) : (
                    <>
                      {productCardData && productCardData.height && productCardData.height}
                      {productCardData && productCardData.width && `*${productCardData.width}`}
                      {productCardData && productCardData.length && `*${productCardData.length}`}
                    </>
                  )}
                </div>
              </div>
              {productCardData && productCardData.isSeptic ? <div className={classes.isSeptic}>Септирован</div> : null}
            </div>
            <div className={classes.delimiter} />
            <div className={classes.rowContainer}>
              <div className={classes.wareHouseIcoContainer}>
                <img src={wareHouseIco} className={classes.wareHouseIco} alt="dimensions" />
              </div>
              {productCardData &&
                productCardData.manufacturer &&
                productCardData.manufacturer.title &&
                productCardData.manufacturer.title}
            </div>
            <div className={classes.delimiter} />
            <div className={classes.rowContainer}>
              <div className={classes.locationIcoContainer}>
                <img src={locationIco} className={classes.locationIco} alt="dimensions" />
              </div>
              {productCardData && productCardData.location && productCardData.location.title}
            </div>
            <div className={classes.delimiter} />
            <div className={classes.rowContainer}>
              <div className={classes.rubleIcoContainer}>
                <img src={rubleIco} className={classes.rubleIco} alt="dimensions" />
              </div>
              {productCardData && productCardData.price}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
