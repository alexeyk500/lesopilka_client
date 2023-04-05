import React from 'react';
import classes from './RulesPage.module.css';
import MainColumn from '../../components/MainColumn/MainColumn';
import RuleItem from './RuleItem/RuleItem';

import rulesTemplate from '../../templates/rules.json';

const RulesPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <MainColumn noScroll>
        <div className={classes.title}>Правила пользования площадкой</div>
        <div className={classes.contentContainer}>
          {rulesTemplate.rules.map((rule, ind) => (
            <RuleItem key={ind} rule={rule} />
          ))}
        </div>
      </MainColumn>
    </div>
  );
};

export default RulesPage;
