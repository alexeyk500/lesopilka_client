import React from 'react';
import classes from './InfoTabSelector.module.css';
import classNames from 'classnames';

export enum InfoTabSelectorEnum {
  order = 'Заказ',
  confirmation = 'Подтверждение',
  divergence = 'Расхождения',
}

type PropsType = {
  infoTab: InfoTabSelectorEnum;
  setInfoTab: (value: InfoTabSelectorEnum) => void;
};

const InfoTabSelector: React.FC<PropsType> = ({ infoTab, setInfoTab }) => {
  const setInfoTabOrder = () => {
    if (infoTab !== InfoTabSelectorEnum.order) {
      setInfoTab(InfoTabSelectorEnum.order);
    }
  };

  const setInfoTabConfirmation = () => {
    if (infoTab !== InfoTabSelectorEnum.confirmation) {
      setInfoTab(InfoTabSelectorEnum.confirmation);
    }
  };

  const setInfoTabDivergence = () => {
    if (infoTab !== InfoTabSelectorEnum.divergence) {
      setInfoTab(InfoTabSelectorEnum.divergence);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.selectorsRow}>
        <div
          className={classNames(classes.tab, { [classes.activeTab]: infoTab === InfoTabSelectorEnum.order })}
          onClick={setInfoTabOrder}
        >
          {InfoTabSelectorEnum.order}
        </div>
        <div
          className={classNames(classes.tab, { [classes.activeTab]: infoTab === InfoTabSelectorEnum.confirmation })}
          onClick={setInfoTabConfirmation}
        >
          {InfoTabSelectorEnum.confirmation}
        </div>
        <div
          className={classNames(classes.tab, { [classes.activeTab]: infoTab === InfoTabSelectorEnum.divergence })}
          onClick={setInfoTabDivergence}
        >
          {InfoTabSelectorEnum.divergence}
        </div>
      </div>
      <div className={classes.tabDelimiter} />
    </div>
  );
};

export default InfoTabSelector;
