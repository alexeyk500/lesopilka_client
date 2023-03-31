import React from 'react';
import { ProductType } from '../../../../types/types';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import { setCatalogSearchParams } from '../../../../store/productSlice';
import { PageEnum } from '../../../../components/AppRouter/AppRouter';
import useShowDetailProductCardPopUp from '../../../../hooks/useShowDetailProductCardPopUp';
import { useAppDispatch } from '../../../../hooks/hooks';
import { useNavigate, useSearchParams } from 'react-router-dom';

type PropsType = {
  product: ProductType;
  isManufacturerPage: boolean;
};

const ProductListItem: React.FC<PropsType> = ({ product, isManufacturerPage }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const showDetailProductCardPopUp = useShowDetailProductCardPopUp(product);

  const onClick = () => {
    if (isManufacturerPage) {
      dispatch(setCatalogSearchParams(searchParams.toString()));
      navigate(`${PageEnum.EditProduct}/${product.id}`);
    } else {
      showDetailProductCardPopUp();
    }
  };

  return <ProductCard product={product} onClick={onClick} isManufacturerProductCard={isManufacturerPage} />;
};

export default ProductListItem;
