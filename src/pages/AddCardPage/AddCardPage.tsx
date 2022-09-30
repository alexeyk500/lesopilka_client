import React from 'react';
import classes from './AddCardPage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import LeftColumnContent from './LeftColumnContent/LeftColumnContent';
import AddCardMainPart from './AddCardMainPart/AddCardMainPart';

const AddCardPage = () => {

  return (
    <div className={classes.container}>
      <LeftColumn>
        <LeftColumnContent />
      </LeftColumn>
      <AddCardMainPart />
    </div>
  );
};

export default AddCardPage;
