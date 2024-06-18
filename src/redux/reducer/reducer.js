import { initialState } from '../state/state';

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
export { reducer };
