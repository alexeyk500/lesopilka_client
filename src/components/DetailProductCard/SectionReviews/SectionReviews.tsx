import React from 'react';
import classes from './SectionReviews.module.css';

type PropsType = {
  reviews?: string | undefined;
};

const SectionReviews: React.FC<PropsType> = ({ reviews }) => {
  return (
    <div className={classes.container}>
      <div className={classes.contentContainer}>{reviews ? reviews : 'Отзывов о товаре пока нет'}</div>
    </div>
  );
};

export default SectionReviews;
