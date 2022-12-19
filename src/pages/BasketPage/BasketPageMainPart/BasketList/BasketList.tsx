import React, {useEffect} from 'react';
import classes from "./BasketList.module.css";
import {useAppDispatch, useAppSelector} from "../../../../hooks/hooks";
import {selectorUser} from "../../../../store/userSlice";

const BasketList = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUser);

  useEffect(() => {
    if (user?.manufacturer?.id) {
      // dispatch(getBasketProductsThunk);
      console.log('getBasketProductsThunk')
    }
  }, [dispatch, user]);


  return (
    <div className={classes.container}>
      <div className={classes.priceContentContainer}>
        BasketList
      </div>
    </div>
  );
};

export default BasketList;
