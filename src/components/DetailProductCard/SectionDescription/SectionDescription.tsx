import React from 'react';
import classes from './SectionDescription.module.css';

type PropsType = {
  description?: string;
};

const SectionDescription: React.FC<PropsType> = ({ description }) => {
  return (
    <div className={classes.container}>
      <div className={classes.contentContainer}>{description ? description : 'Описание продукта - отсутсвует'}</div>
    </div>
  );
};

export default SectionDescription;
