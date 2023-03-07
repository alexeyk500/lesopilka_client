import React from 'react';
import classes from './InfoTabSelector.module.css';
import classNames from 'classnames';
import { AmountTypeEnum } from '../../../types/types';

type PropsType = {
  infoTab: AmountTypeEnum;
  setInfoTab: (value: AmountTypeEnum) => void;
  isOrderForManufacturer?: boolean;
};

const InfoTabSelector: React.FC<PropsType> = ({ infoTab, setInfoTab, isOrderForManufacturer }) => {
  const setInfoTabOrder = () => {
    if (infoTab !== AmountTypeEnum.inOrder) {
      setInfoTab(AmountTypeEnum.inOrder);
    }
  };

  const setInfoTabConfirmation = () => {
    if (infoTab !== AmountTypeEnum.inConfirmation) {
      setInfoTab(AmountTypeEnum.inConfirmation);
    }
  };

  const setInfoTabDivergence = () => {
    if (infoTab !== AmountTypeEnum.inDivergence) {
      setInfoTab(AmountTypeEnum.inDivergence);
    }
  };

  const ConfirmationTab = () => {
    return (
      <div
        className={classNames(classes.tab, { [classes.activeTab]: infoTab === AmountTypeEnum.inConfirmation })}
        onClick={setInfoTabConfirmation}
      >
        {AmountTypeEnum.inConfirmation}
      </div>
    );
  };

  const DivergenceTab = () => {
    return (
      <div
        className={classNames(classes.tab, { [classes.activeTab]: infoTab === AmountTypeEnum.inDivergence })}
        onClick={setInfoTabDivergence}
      >
        {AmountTypeEnum.inDivergence}
      </div>
    );
  };

  const OrderTab = () => {
    return (
      <div
        className={classNames(classes.tab, { [classes.activeTab]: infoTab === AmountTypeEnum.inOrder })}
        onClick={setInfoTabOrder}
      >
        {AmountTypeEnum.inOrder}
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.selectorsRow}>
        {isOrderForManufacturer ? (
          <>
            <ConfirmationTab />
            <OrderTab />
          </>
        ) : (
          <>
            <>
              <OrderTab />
              <ConfirmationTab />
            </>
          </>
        )}
        <DivergenceTab />
      </div>
      <div className={classes.tabDelimiter} />
    </div>
  );
};

export default InfoTabSelector;
