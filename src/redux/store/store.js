import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';

import {
  fetchSearchId,
  fetchTickets,
  toggleFilter,
  toggleAllFilters,
  toggleAll
} from '../actions/actions';
import { reducer } from '../reducer/reducer';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
      })
    : compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export { store, toggleFilter, toggleAllFilters, toggleAll, fetchTickets, fetchSearchId };
