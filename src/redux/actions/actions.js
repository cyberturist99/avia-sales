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

export { fetchSearchId, fetchTickets, toggleFilter, toggleAllFilters, toggleAll };
