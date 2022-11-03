import React from 'react';
import classNames from 'classnames';
import classes from './SectionContainer.module.css';
import CheckIndicator from '../../../../../components/commonComponents/CheckIndicator/CheckIndicator';

type PropsType = {
  title: string;
  completeCondition: boolean;
  children: React.ReactNode;
  blurCondition?: boolean;
};

const SectionContainer: React.FC<PropsType> = ({ title, completeCondition, blurCondition, children }) => {
  return (
    <div className={classNames(classes.container, { [classes.blurAndOpacity]: blurCondition })}>
      <CheckIndicator title={title} checked={completeCondition} />
      {children}
    </div>
  );
};

export default SectionContainer;
