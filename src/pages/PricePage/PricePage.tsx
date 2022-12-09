import React from 'react';
import classes from './PricePage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import PricePageMainPart from './PricePageMainPart/PricePageMainPart';
import PriceSelectors from './PricePageMainPart/PriceSelectors/PriceSelectors';

const PricePage: React.FC = () => {
  return (
    <div className={classes.container}>
      <LeftColumn>
        <PriceSelectors />
      </LeftColumn>
      <PricePageMainPart />
    </div>
  );
};

export default PricePage;
