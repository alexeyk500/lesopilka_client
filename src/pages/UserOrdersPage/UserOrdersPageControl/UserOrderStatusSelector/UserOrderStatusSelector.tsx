import React from 'react';
import classes from './UserOrderStatusSelector.module.css';
import OrderStatusSelector from '../../../../components/commonComponents/OrderStatusSelector/OrderStatusSelector';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorSelectedOrderStatusId, setSelectedOrderStatusId } from '../../../../store/ordersSlice';
import { orderStatusOptions, userOrderStatusOptionsToolTips } from '../../../../utils/constants';

const userOrderStatusOptions = orderStatusOptions.map((statusOption, ind) => ({
  ...statusOption,
  toolTip: userOrderStatusOptionsToolTips[ind],
}));

const UserOrderStatusSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedOrderStatusId = useAppSelector(selectorSelectedOrderStatusId);
  const onSelectOrderStatusId = (id: number) => {
    dispatch(setSelectedOrderStatusId(id));
  };

  return (
    <div className={classes.container}>
      <OrderStatusSelector
        orderStatusOptions={userOrderStatusOptions}
        selectedOrderStatusId={selectedOrderStatusId}
        onSelectOrderStatusId={onSelectOrderStatusId}
      />
    </div>
  );
};

export default UserOrderStatusSelector;
