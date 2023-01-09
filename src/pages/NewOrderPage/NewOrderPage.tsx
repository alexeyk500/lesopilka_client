import React, { useEffect } from 'react';
import classes from './NewOrderPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import MainColumn from '../../components/MainColumn/MainColumn';
import NewOrderPageControl from './NewOrderPageControl/NewOrderPageControl';
import NewOrderPageMainPart from './NewOrderPageMainPart/NewOrderPageMainPart';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getDeliveryMethodThunk, getManufacturerPickUpAddress, getPaymentMethodThunk } from '../../store/newOrderSlice';
import { selectorUser } from '../../store/userSlice';

const NewOrderPage = () => {
  const user = useAppSelector(selectorUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.manufacturer?.id && user.manufacturer.id > 0) {
      dispatch(getPaymentMethodThunk());
      dispatch(getDeliveryMethodThunk());
      dispatch(getManufacturerPickUpAddress(user.manufacturer.id));
    }
  }, [dispatch, user?.manufacturer?.id]);

  return (
    <div className={classes.container}>
      <LeftColumn title={`Оформление заказа`}>
        <NewOrderPageControl />
      </LeftColumn>
      <MainColumn>
        <NewOrderPageMainPart />
      </MainColumn>
    </div>
  );
};

export default NewOrderPage;
