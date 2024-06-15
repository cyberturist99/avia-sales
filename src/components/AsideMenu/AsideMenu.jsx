import React from 'react';
import { Checkbox } from 'antd';
import { connect } from 'react-redux';

import {
  toggleFilter,
  toggleAllFilters,
  toggleAll,
  fetchTickets,
  fetchSearchId
} from '../../store.js';

import classes from './AsideMenu.module.scss';

const AsideMenu = ({ filters, onToggleFilter, onToggleAllFilters, toggleAll }) => {
  const { all, none, oneTransfer, twoTransfer, threeTransfer } = filters;

  const handleToggleAllFilters = () => {
    onToggleAllFilters();
  };
  let checkboxAll = false;
  const handleToggleFilter = (name) => {
    const allFiltersExceptCurrentAreOn = Object.keys(filters)
      .filter((key) => key !== 'all' && key !== name)
      .every((key) => filters[key]);

    if (Object.values(filters).every((el) => el) && name !== 'all') {
      checkboxAll = true;
    }

    if (checkboxAll) {
      toggleAll(name);
    }
    if (allFiltersExceptCurrentAreOn && filters.all && !checkboxAll) {
      onToggleAllFilters();
    } else if (filters.all && !checkboxAll) {
      onToggleAllFilters();
    }

    if (!checkboxAll) onToggleFilter(name);
  };

  return (
    <>
      <div className={classes['filter-list']}>
        <span className={classes['filter-list__title']}>количество пересадок</span>
        <div className={classes['filter-list__item']}>
          <Checkbox checked={all} onChange={handleToggleAllFilters}>
            Все
          </Checkbox>
        </div>
        <div className={classes['filter-list__item']}>
          <Checkbox checked={none} onChange={() => handleToggleFilter('none')}>
            Без пересадок
          </Checkbox>
        </div>
        <div className={classes['filter-list__item']}>
          <Checkbox checked={oneTransfer} onChange={() => handleToggleFilter('oneTransfer')}>
            1 пересадка
          </Checkbox>
        </div>
        <div className={classes['filter-list__item']}>
          <Checkbox checked={twoTransfer} onChange={() => handleToggleFilter('twoTransfer')}>
            2 пересадки
          </Checkbox>
        </div>
        <div className={classes['filter-list__item']}>
          <Checkbox checked={threeTransfer} onChange={() => handleToggleFilter('threeTransfer')}>
            3 пересадки
          </Checkbox>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    filters: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleFilter: (name) => {
      dispatch(toggleFilter(name));
    },
    onToggleAllFilters: () => {
      dispatch(toggleAllFilters());
    },
    toggleAll: (name) => {
      dispatch(toggleAll(name));
    },
    onFetchSearchId: () => {
      dispatch(fetchSearchId());
    },
    onFetchTickets: (searchId) => {
      dispatch(fetchTickets(searchId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AsideMenu);
