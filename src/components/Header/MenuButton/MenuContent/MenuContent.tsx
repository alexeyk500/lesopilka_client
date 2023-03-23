import React from 'react';
import classes from './MenuContent.module.css';
import PurchasesSection from './PurchasesSection/PurchasesSection';
import ManufacturerSection from './ManufacturerSection/ManufacturerSection';
import PersonalSection from './PersonalSection/PersonalSection';
import FavoritesSection from './FavoritesSection/FavoritesSection';
import ReferenceSection from './ReferenceSection/ReferenceSection';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectorUser } from '../../../../store/userSlice';
import MarketingSection from './MarketingSection/MarketingSection';

type PropsType = {
  closeMenuContent: () => void;
};

const MenuContent = React.forwardRef<HTMLDivElement, PropsType>(({ closeMenuContent }, ref) => {
  const user = useAppSelector(selectorUser);

  return (
    <div ref={ref} className={classes.container}>
      <PurchasesSection closeMenuContent={closeMenuContent} />
      {user?.manufacturer?.id && (
        <>
          <ManufacturerSection closeMenuContent={closeMenuContent} />
          <MarketingSection closeMenuContent={closeMenuContent} />
        </>
      )}
      <FavoritesSection />
      <PersonalSection closeMenuContent={closeMenuContent} />
      <ReferenceSection />
    </div>
  );
});

export default MenuContent;
