import React from 'react';
import classes from "../PricePage/PricePage.module.css";
import LeftColumn from "../../components/LeftColumn/LeftColumn";
import BasketPageSelectors from "./BasketPageSelectors/BasketPageSelectors";
import BasketPageMainPart from "./BasketPageMainPart/BasketPageMainPart";

const BasketPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <LeftColumn>
        <BasketPageSelectors />
      </LeftColumn>
      <BasketPageMainPart />
    </div>
  );
};

export default BasketPage;
