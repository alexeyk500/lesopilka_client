import React, { useEffect } from 'react';
import classes from './EditCardPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import LeftColumnContent from './LeftColumnContent/LeftColumnContent';
import EditCardMainPart from './EditCardMainPart/EditCardMainPart';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { getProductThunk } from '../../store/productSlice';

const EditCardPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    id && dispatch(getProductThunk(id));
  }, [dispatch, id]);

  return (
    <div className={classes.container}>
      <LeftColumn>
        <LeftColumnContent />
      </LeftColumn>
      <EditCardMainPart />
    </div>
  );
};

export default EditCardPage;
