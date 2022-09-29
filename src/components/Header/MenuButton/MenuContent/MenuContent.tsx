import React from 'react';
import classes from './MenuContent.module.css';
import PurchasesSection from './PurchasesSection/PurchasesSection';
import SalesSection from './SalesSection/SalesSection';
import PersonalSection from './PersonalSection/PersonalSection';
import FavoritesSection from './FavoritesSection/FavoritesSection';
import ReferenceSection from './ReferenceSection/ReferenceSection';

type PropsType = {
  closeMenuContent: () => void;
};

const MenuContent: React.FC<PropsType> = ({ closeMenuContent }) => {
  return (
    <div className={classes.container}>
      <PurchasesSection closeMenuContent={closeMenuContent} />
      <SalesSection closeMenuContent={closeMenuContent} />
      <FavoritesSection />
      <PersonalSection />
      <ReferenceSection />
    </div>
  );
};

export default MenuContent;
