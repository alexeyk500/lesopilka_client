import React, { useEffect } from 'react';
import OrderToManufacturer from '../../../BasketPage/BasketPageMainPart/BasketList/OrderToManufacturer/OrderToManufacturer';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorUser } from '../../../../store/userSlice';
import { getBasketProductsThunk, selectorBasketProducts } from '../../../../store/basketSlice';
import { filterProductsByManufacturerId } from '../../../../utils/productFunctions';
import { useParams } from 'react-router-dom';
import SectionContainer from '../../../EditCardPage/EditCardMainPart/ProductDetails/SectionContainer/SectionContainer';
import { ProductType } from '../../../../types/types';

export const checkOrderContentSection = (products: ProductType[]) => {
  return products.length > 0;
};

const OrderContentSection: React.FC = () => {
  const { mid } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);
  const basketProducts = useAppSelector(selectorBasketProducts);
  const productsByManufacturerId = filterProductsByManufacturerId(basketProducts, Number(mid) ?? 0);
  const isSectionCondition = checkOrderContentSection(productsByManufacturerId);

  useEffect(() => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (user && token) {
      dispatch(getBasketProductsThunk(token));
    }
  }, [dispatch, user]);

  return (
    <SectionContainer title={'Заказ поставщику'} completeCondition={isSectionCondition}>
      {productsByManufacturerId.length > 0 && <OrderToManufacturer products={productsByManufacturerId} hideButtons />}
    </SectionContainer>
  );
};

export default OrderContentSection;
