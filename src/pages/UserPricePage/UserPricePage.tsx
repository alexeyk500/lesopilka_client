import React from 'react';
import classes from './UserPricePage.module.css';
import LeftColumn from '../../components/LeftColumn/LeftColumn';
import PricePageMainPart from '../PricePage/PricePageMainPart/PricePageMainPart';
import UserPriceSelectors from './UserPriceSelectors/UserPriceSelectors';

const UserPricePage: React.FC = () => {
  return (
    <div className={classes.container}>
      <LeftColumn title={'Прайс-лист\nпроизводителя'}>
        <UserPriceSelectors />
      </LeftColumn>
      <PricePageMainPart />
    </div>
  );
};

export default UserPricePage;
