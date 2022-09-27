import React, {useState} from 'react';
import classes from './PlaceSelector.module.css';

const options = ['Санкт-Петербург', 'Москва', 'Новосибирск', 'Владивосток'];

const PlaceSelector = () => {

  const [selectedValue, setSelectedValue] = useState(options[0])

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.currentTarget.value)
  }

  return (
    <div className={classes.container}>
      <select value={selectedValue} className={classes.select} onChange={onChange}>
        {
          options.map((option, ind)=>{
            return (<option key={ind} value={option}>{option}</option>)
          })
        }
      </select>
    </div>
  );
};

export default PlaceSelector;
