import React from 'react';
import cartIco from '../../../img/cartIco.svg';
import classes from './BasketButton.module.css';
import { PageEnum } from '../../AppRouter/AppRouter';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { selectorUser } from '../../../store/userSlice';
import { setCatalogSearchParams } from '../../../store/productSlice';
import useLoginUser from '../../../hooks/useLoginUser';

const BasketButton: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const user = useAppSelector(selectorUser);
  const loginUser = useLoginUser(PageEnum.BasketPage);

  const onClickBasket = () => {
    if (user) {
      dispatch(setCatalogSearchParams(searchParams.toString()));
      navigate(PageEnum.BasketPage);
    } else {
      loginUser();
    }
  };

  return (
    <button className={classes.container} onClick={onClickBasket}>
      <img className={classes.ico} src={cartIco} alt="button cart" />
    </button>
  );
};

export default BasketButton;
