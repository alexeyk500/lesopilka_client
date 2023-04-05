import React from 'react';
import classes from './RuleItem.module.css';
import { RuleType } from '../../../types/types';

type PropsType = {
  rule: RuleType;
};

const RuleItem: React.FC<PropsType> = ({ rule }) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{rule.title}</div>
      {rule.items.map((item, ind) => {
        return (
          <div key={ind} className={classes.ruleItem}>
            - {item.description}
            {item.url && (
              <a href={item.url} className={classes.link}>
                {item.urlDescription}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RuleItem;
