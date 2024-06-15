import React from 'react';

import classes from './Tabs.module.scss';

function Tabs({ setSelectedTab, selectedTab }) {
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <ul className={classes['tabs-wrapper']}>
      <li className={classes['tabs-wrapper__item']}>
        <button
          className={`${classes.button} ${classes.first} ${selectedTab === 'самый дешевый' ? classes.active : ''}`}
          onClick={() => handleTabClick('самый дешевый')}
        >
          самый дешевый
        </button>
      </li>
      <li className={classes['tabs-wrapper__item']}>
        <button
          className={`${classes.button} ${classes.second} ${selectedTab === 'самый быстрый' ? classes.active : ''}`}
          onClick={() => handleTabClick('самый быстрый')}
        >
          самый быстрый
        </button>
      </li>
    </ul>
  );
}

export default Tabs;
