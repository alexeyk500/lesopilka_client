import React, { useEffect } from 'react';
import classes from './NewOrderPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import MainColumn from '../../components/MainColumn/MainColumn';
import NewOrderPageControl from './NewOrderPageControl/NewOrderPageControl';
import NewOrderPageMainPart from './NewOrderPageMainPart/NewOrderPageMainPart';
import { useAppDispatch } from '../../hooks/hooks';
import { getDeliveryMethodThunk, getManufacturerPickUpAddress, getPaymentMethodThunk } from '../../store/newOrderSlice';
import {useParams} from "react-router-dom";

const NewOrderPage = () => {
  const { mid } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Number(mid) > 0) {
      dispatch(getPaymentMethodThunk());
      dispatch(getDeliveryMethodThunk());
      dispatch(getManufacturerPickUpAddress(Number(mid)));
    }
  }, [dispatch, mid]);

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
