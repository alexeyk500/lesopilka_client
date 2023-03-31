import React from 'react';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import { ProductType } from '../../../../types/types';
import useShowDetailProductCardPopUp from '../../../../hooks/useShowDetailProductCardPopUp';

type PropsType = {
  product: ProductType;
};

const FavoriteProductsListItem: React.FC<PropsType> = ({ product }) => {
  const showDetailProductCardPopUp = useShowDetailProductCardPopUp(product);

  const onClick = () => {
    showDetailProductCardPopUp();
  };

  return <ProductCard key={product.id} product={product} onClick={onClick} />;
};

export default FavoriteProductsListItem;
