import React from 'react';
import classes from './ManOrderStatusSelector.module.css';
import OrderStatusSelector from '../../../../components/commonComponents/OrderStatusSelector/OrderStatusSelector';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { selectorSelectedManOrderStatusId, setSelectedManOrderStatusId } from '../../../../store/manOrdersSlice';
import { manufacturerOrderStatusOptionsToolTips, orderStatusOptions } from '../../../../utils/constants';

const manOrderStatusOptions = orderStatusOptions.map((statusOption, ind) => ({
  ...statusOption,
  toolTip: manufacturerOrderStatusOptionsToolTips[ind],
}));

const ManOrderStatusSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedManOrderStatusId = useAppSelector(selectorSelectedManOrderStatusId);

  const onSelectManOrderStatusId = (id: number) => {
    dispatch(setSelectedManOrderStatusId(id));
  };

  return (
    <div className={classes.container}>
      <OrderStatusSelector
        orderStatusOptions={manOrderStatusOptions}
        selectedOrderStatusId={selectedManOrderStatusId}
        onSelectOrderStatusId={onSelectManOrderStatusId}
      />
    </div>
  );
};

export default ManOrderStatusSelector;
