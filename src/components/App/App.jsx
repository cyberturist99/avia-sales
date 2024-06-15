import React, { useState } from 'react';

import Tabs from '../../components/Tabs/Tabs';
import AsideMenu from '../AsideMenu/AsideMenu';
import Cardlist from '../Cardlist/Cardlist';

import classes from './App.module.scss';
import logo from './logo.svg';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('самый дешевый');
  return (
    <section className={classes['app-Container']}>
      <img className={classes.logo} src={logo}></img>
      <div className={classes['filter-container']}>
        <AsideMenu />
        <div className={classes['tabs-container']}>
          <Tabs setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
          <Cardlist className={classes['card-list']} selectedTab={selectedTab} />
        </div>
      </div>
    </section>
  );
};

export default App;
