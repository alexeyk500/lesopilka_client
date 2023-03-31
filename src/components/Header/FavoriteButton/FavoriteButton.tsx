import React from 'react';
import classes from './FavoriteButton.module.css';
import starIco from '../../../img/starIcoGray.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import useLoginUser from '../../../hooks/useLoginUser';
import { selectorUser } from '../../../store/userSlice';
import { setCatalogSearchParams } from '../../../store/productSlice';
import { PageEnum } from '../../AppRouter/AppRouter';

const FavoriteButton: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const user = useAppSelector(selectorUser);
  const loginUser = useLoginUser(PageEnum.FavoriteProductPage);

  const onClickFavoriteProducts = () => {
    if (user) {
      dispatch(setCatalogSearchParams(searchParams.toString()));
      navigate(PageEnum.FavoriteProductPage);
    } else {
      loginUser();
    }
  };

  return (
    <button className={classes.container} onClick={onClickFavoriteProducts}>
      <img className={classes.ico} src={starIco} alt="button selected" />
    </button>
  );
};

export default FavoriteButton;
