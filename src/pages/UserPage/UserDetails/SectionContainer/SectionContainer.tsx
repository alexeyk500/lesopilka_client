import React from 'react';
import classes from "./SectionContainer.module.css";

type PropsType = {
  title: string;
  children: React.ReactNode;
};

const SectionContainer: React.FC <PropsType> = ({title, children}) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{title}</div>
      <div className={classes.bottomLine} />
      {children}
    </div>
  );
};

export default SectionContainer;
