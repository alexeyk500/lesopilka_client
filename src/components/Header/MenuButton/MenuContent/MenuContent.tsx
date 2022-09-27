import React from 'react';
import classes from './MenuContent.module.css';
import PurchasesSection from "./PurchasesSection/PurchasesSection";
import SalesSection from "./SalesSection/SalesSection";
import PersonalSection from "./PersonalSection/PersonalSection";
import FavoritesSection from "./FavoritesSection/FavoritesSection";
import ReferenceSection from "./ReferenceSection/ReferenceSection";

const MenuContent: React.FC = () => {
  return (
    <div className={classes.container}>
      <PurchasesSection />
      <SalesSection />
      <FavoritesSection />
      <PersonalSection />
      <ReferenceSection />
    </div>
  )
};

export default MenuContent;
