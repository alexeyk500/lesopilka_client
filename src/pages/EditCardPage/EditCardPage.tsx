import React, { useEffect } from 'react';
import classes from './EditCardPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import CardControlAndInfo from './CardControlAndInfo/CardControlAndInfo';
import EditCardMainPart from './EditCardMainPart/EditCardMainPart';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { getProductThunk } from '../../store/productSlice';

const EditCardPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const productId = Number(id);
    productId && dispatch(getProductThunk(productId));
  }, [dispatch, id]);

  return (
    <div className={classes.container}>
      <LeftColumn title={'Карточка товара'}>
        <CardControlAndInfo />
      </LeftColumn>
      <EditCardMainPart />
    </div>
  );
};

export default EditCardPage;
