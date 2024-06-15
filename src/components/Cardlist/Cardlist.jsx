import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Spin, Alert } from 'antd';

import { fetchSearchId, fetchTickets } from '../../store';
import Card from '../Card/Card';

import classes from './Cardlist.module.scss';

const CardList = ({ tickets, onFetchSearchId, onFetchTickets, searchId, selectedTab }) => {
  console.log(selectedTab);
  const [ticketsCount, setTicketsCount] = useState(5);
  const filterWithoutTransfers = useSelector((state) => state.none);
  const filterOneTransfer = useSelector((state) => state.oneTransfer);
  const filterTwoTransfers = useSelector((state) => state.twoTransfer);
  const filterThreeTransfers = useSelector((state) => state.threeTransfer);

  useEffect(() => {
    onFetchSearchId();
  }, []);

  useEffect(() => {
    if (searchId) {
      onFetchTickets(searchId);
    }
  }, [searchId, onFetchTickets]);
  console.log(tickets);
  let sortedTiketsBySpeed =
    tickets &&
    [...tickets].sort(
      (a, b) =>
        a.segments[0].duration +
        a.segments[1].duration -
        (b.segments[0].duration + b.segments[1].duration)
    );
  let sortedTiketsByPrice = tickets && [...tickets].sort((a, b) => a.price - b.price);
  if (!tickets) {
    return (
      <>
        <Spin size={'large'} className={classes.spinner}></Spin>
        <span className={classes['text-spinner']}>Пожалуйста, подождите билеты загружаются...</span>
      </>
    );
  }
  // фильтр без пересадок
  if (!filterWithoutTransfers && selectedTab === 'самый дешевый') {
    sortedTiketsByPrice = sortedTiketsByPrice.filter(
      (el) => el.segments[0].stops.length !== 0 && el.segments[1].stops.length !== 0
    );
  } else if (!filterWithoutTransfers && selectedTab === 'самый быстрый') {
    sortedTiketsBySpeed = sortedTiketsBySpeed.filter(
      (el) => el.segments[0].stops.length !== 0 && el.segments[1].stops.length !== 0
    );
  }
  // фильтр 1 пересадка
  if (!filterOneTransfer && selectedTab === 'самый дешевый') {
    sortedTiketsByPrice = sortedTiketsByPrice.filter(
      (el) => el.segments[0].stops.length !== 1 && el.segments[1].stops.length !== 1
    );
  } else if (!filterOneTransfer && selectedTab === 'самый быстрый') {
    sortedTiketsBySpeed = sortedTiketsBySpeed.filter(
      (el) => el.segments[0].stops.length !== 1 && el.segments[1].stops.length !== 1
    );
  }
  // фильтр 2 пересадки
  if (!filterTwoTransfers && selectedTab === 'самый дешевый') {
    sortedTiketsByPrice = sortedTiketsByPrice.filter(
      (el) => el.segments[0].stops.length !== 2 && el.segments[1].stops.length !== 2
    );
  } else if (!filterTwoTransfers && selectedTab === 'самый быстрый') {
    sortedTiketsBySpeed = sortedTiketsBySpeed.filter(
      (el) => el.segments[0].stops.length !== 2 && el.segments[1].stops.length !== 2
    );
  }
  // фильтр 3 пересадки
  if (!filterThreeTransfers && selectedTab === 'самый дешевый') {
    sortedTiketsByPrice = sortedTiketsByPrice.filter(
      (el) => el.segments[0].stops.length !== 3 && el.segments[1].stops.length !== 3
    );
  } else if (!filterThreeTransfers && selectedTab === 'самый быстрый') {
    sortedTiketsBySpeed = sortedTiketsBySpeed.filter(
      (el) => el.segments[0].stops.length !== 3 && el.segments[1].stops.length !== 3
    );
  }
  const firstFiveTickets =
    selectedTab === 'самый дешевый'
      ? sortedTiketsByPrice.slice(0, ticketsCount)
      : sortedTiketsBySpeed.slice(0, ticketsCount);
  // const handleShowMoreTickets = (query) => {};

  return (
    <>
      <ul className={classes['card-list']}>
        {firstFiveTickets.length ? (
          firstFiveTickets.map((ticket, index) => <Card key={index} ticket={ticket} />)
        ) : (
          <Alert description="Рейсов, подходящих под заданные фильтры, не найдено"></Alert>
        )}
      </ul>
      {firstFiveTickets.length > 0 && (
        <button
          className={classes['filter-container__button-show-more']}
          onClick={() => setTicketsCount((prev) => prev + 5)}
        >
          показать еще 5 билетов!
        </button>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSearchId: () => {
      dispatch(fetchSearchId());
    },
    onFetchTickets: (searchId) => {
      dispatch(fetchTickets(searchId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
