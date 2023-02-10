import React from 'react';
import classes from './InfoTabSelector.module.css';
import classNames from 'classnames';
import { AmountTypeEnum } from '../../../../../../../types/types';

type PropsType = {
  infoTab: AmountTypeEnum;
  setInfoTab: (value: AmountTypeEnum) => void;
};

const InfoTabSelector: React.FC<PropsType> = ({ infoTab, setInfoTab }) => {
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

  return (
    <div className={classes.container}>
      <div className={classes.selectorsRow}>
        <div
          className={classNames(classes.tab, { [classes.activeTab]: infoTab === AmountTypeEnum.inOrder })}
          onClick={setInfoTabOrder}
        >
          {AmountTypeEnum.inOrder}
        </div>
        <div
          className={classNames(classes.tab, { [classes.activeTab]: infoTab === AmountTypeEnum.inConfirmation })}
          onClick={setInfoTabConfirmation}
        >
          {AmountTypeEnum.inConfirmation}
        </div>
        <div
          className={classNames(classes.tab, { [classes.activeTab]: infoTab === AmountTypeEnum.inDivergence })}
          onClick={setInfoTabDivergence}
        >
          {AmountTypeEnum.inDivergence}
        </div>
      </div>
      <div className={classes.tabDelimiter} />
    </div>
  );
};

export default InfoTabSelector;
