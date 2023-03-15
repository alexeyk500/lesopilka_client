import React, { useEffect, useState } from 'react';
import classes from './ManOrderDetails.module.css';
import { AmountTypeEnum, OrderType, ProductType } from '../../../../../types/types';
import InfoTabSelector from '../../../../../components/commonComponents/InfoTabSelector/InfoTabSelector';
import ManDetailsHeader from './ManDetailsHeader/ManDetailsHeader';
import ManDetailsConclusion from './ManDetailsConclusion/ManDetailsConclusion';
import {
  getIsArchivedOrder,
  getIsConfirmationTab,
  getIsConfirmedOrder,
  getProductsAllAmountsType,
} from '../../../../../utils/ordersFunctions';
import ManOrderProductsList from './ManOrderProductsList/ManOrderProductsList';
import { useAppDispatch } from '../../../../../hooks/hooks';
import { confirmManufacturerOrderThunk } from '../../../../../store/manOrdersSlice';
import { showPortalPopUp } from '../../../../../components/PortalPopUp/PortalPopUp';
import { cancelOrderThunk } from '../../../../../store/ordersSlice';
import ManDetailsDeliveryConfirmation from './ManDetailsDeliveryConfirmation/ManDetailsDeliveryConfirmation';

type PropsType = {
  order: OrderType;
  updateOrders: () => void;
};

const getIsShowNoDivergenceInOrder = (products: ProductType[], amountType: AmountTypeEnum) => {
  if (amountType === AmountTypeEnum.inDivergence) {
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (product.amountInDivergence && product.amountInDivergence > 0) {
        return false;
      }
    }
    return true;
  }
  return false;
};

const ManOrderDetails: React.FC<PropsType> = ({ order, updateOrders }) => {
  const dispatch = useAppDispatch();
  const [amountType, setAmountType] = useState(AmountTypeEnum.inConfirmation);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [confirmedDeliveryPrice, setConfirmedDeliveryPrice] = useState<number | null>(order.order.deliveryPrice);
  const [confirmationProducts, setConfirmationProducts] = useState<ProductType[] | undefined>(undefined);

  useEffect(() => {
    if (freeDelivery) {
      setConfirmedDeliveryPrice(null);
    }
  }, [freeDelivery]);

  const productsStore = getProductsAllAmountsType(order);
  const products = confirmationProducts ? confirmationProducts : productsStore;
  const isShowNoDivergenceInOrder = getIsShowNoDivergenceInOrder(products, amountType);

  const isConfirmedOrder = getIsConfirmedOrder(order);
  const isConfirmationTab = getIsConfirmationTab(amountType);
  const isArchivedOrder = getIsArchivedOrder(order);

  const isSetConfirmationProducts = isConfirmationTab && !isConfirmedOrder && !isArchivedOrder && !confirmationProducts;

  useEffect(() => {
    if (isSetConfirmationProducts) {
      const transformedProducts = products.map((product) => {
        return { ...product, amountInConfirmation: product.amountInOrder, amountInDivergence: 0 };
      });
      setConfirmationProducts(transformedProducts);
    }
  }, [products, setConfirmationProducts, isSetConfirmationProducts]);

  const onConfirmClick = () => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (confirmationProducts && token) {
      const orderId = order.order.id;
      const requestProducts = confirmationProducts.map((product) => {
        return { productId: product.id, amount: product.amountInConfirmation ?? 0 };
      });
      dispatch(confirmManufacturerOrderThunk({ orderId, requestProducts, token })).then(() => {
        updateOrders();
      });
    }
  };

  const onRejectClick = () => {
    showPortalPopUp({
      popUpContent: <div className={classes.infoPopUpText}>{'\nПодтвердите свой отказ\nот поставки заказа\n\n\n'}</div>,
      titleConfirmBtn: 'Отказаться',
      customClassBottomBtnGroup: classes.customPopUpBottomBtnGroup,
      onClosePopUp: (result?: boolean | FormData | undefined) => {
        if (result) {
          rejectOrder();
        }
      },
    });
  };

  const rejectOrder = () => {
    const token = localStorage.getItem(process.env.REACT_APP_APP_ACCESS_TOKEN!);
    if (order.order.id && token) {
      dispatch(cancelOrderThunk({ orderId: order.order.id, isOrderForManufacturer: true, token })).then(() => {
        updateOrders();
      });
    }
  };

  return (
    <div className={classes.container}>
      <InfoTabSelector infoTab={amountType} setInfoTab={setAmountType} isOrderForManufacturer />
      {isShowNoDivergenceInOrder ? (
        <div className={classes.noDivergenceTitle}>Расхождений в Подтверждении и Заказе нет</div>
      ) : (
        <>
          <ManDetailsHeader
            order={order}
            infoTab={amountType}
            onConfirmClick={onConfirmClick}
            onRejectClick={onRejectClick}
            confirmedDeliveryPrice={confirmedDeliveryPrice}
          />
          <div className={classes.delimiter} />
          <ManOrderProductsList
            order={order}
            products={products}
            amountType={amountType}
            setConfirmationProducts={setConfirmationProducts}
          />
          <div className={classes.delimiter} />
          <ManDetailsConclusion products={products} amountType={amountType} />
          {isConfirmationTab && (
            <ManDetailsDeliveryConfirmation
              order={order}
              freeDelivery={freeDelivery}
              setFreeDelivery={setFreeDelivery}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ManOrderDetails;
