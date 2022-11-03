import React from 'react';
import classes from './EditCardPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import LeftColumnContent from './LeftColumnContent/LeftColumnContent';
import EditCardMainPart from './EditCardMainPart/EditCardMainPart';

const EditCardPage = () => {
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
