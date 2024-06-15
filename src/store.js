import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
      })
    : compose;

const initialState = {
  all: true,
  none: true,
  oneTransfer: true,
  twoTransfer: true,
  threeTransfer: true,
  searchId: null,
  tickets: null
};

const fetchSearchId = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://aviasales-test-api.kata.academy/search');
      const data = await response.json();
      dispatch({ type: 'FETCH_SEARCH_ID_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_SEARCH_ID_FAILURE', payload: error });
    }
  };
};

const fetchTickets = (searchId) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
    );
    const data = await response.json();
    dispatch({ type: 'FETCH_TICKETS_SUCCESS', payload: data.tickets });
    if (data.stop) {
      dispatch({ type: 'FETCH_TICKETS_STOP' });
    }
  } catch (error) {
    dispatch({ type: 'FETCH_TICKETS_FAILURE', payload: error.message });
  }
};

const toggleFilter = (name) => ({
  type: 'TOGGLE_FILTER',
  name
});

const toggleAllFilters = () => ({
  type: 'TOGGLE_ALL_FILTERS'
});
const toggleAll = (name) => ({
  type: 'TOGGLE_All',
  name
});

const reducer = (state = initialState, action) => {
  /* eslint-disable no-case-declarations */
  switch (action.type) {
    case 'TOGGLE_ALL_FILTERS':
      return {
        ...state,
        all: !state.all,
        none: !state.all,
        oneTransfer: !state.all,
        twoTransfer: !state.all,
        threeTransfer: !state.all
      };
    case 'TOGGLE_FILTER':
      const nextState = { ...state, [action.name]: !state[action.name] };

      // проверяем, нужно ли включить или отключить фильтр "all"
      const allFiltersExceptCurrentAreOn = Object.keys(state)
        .filter((key) => key !== 'all' && key !== action.name)
        .every((key) => state[key]);

      if (allFiltersExceptCurrentAreOn) {
        nextState.all = true;
      } else {
        nextState.all = false;
      }

      return nextState;
    case 'TOGGLE_All':
      const nextStatee = { ...state, [action.name]: !state[action.name] };
      nextStatee.all = false;
      return nextStatee;

    case 'FETCH_SEARCH_ID_SUCCESS':
      return { ...state, searchId: action.payload.searchId };

    case 'FETCH_SEARCH_ID_FAILURE':
      return { ...state, errorFetchingId: action.payload };

    case 'FETCH_TICKETS_SUCCESS': {
      return {
        ...state,
        tickets: action.payload
      };
    }

    case 'FETCH_TICKETS_FAILURE': {
      return { ...state, errorFetchingTickets: action.payload };
    }

    default:
      return state;
  }
};

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export { store, toggleFilter, toggleAllFilters, toggleAll, fetchTickets, fetchSearchId };
