import * as Types from '../actions/actionTypes';

const initialState = {
  datesOfArchives: [],
  isValidUrl: true,
  loading: false,
  pageSource: '',
  requestUrl: ''
};

const rootReducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
  case Types.INIT_LOADER:
    newState.loading = action.loading;

    return newState;

  case Types.LOAD_PAGE_SOURCE:
    newState.pageSource = action.pageSource;
    newState.requestUrl = action.requestUrl;

    return newState;

  case Types.PICK_DATE:
    newState.pickedDate = action.pickedDate;

    return newState;

  case Types.REGISTER_URL:
    newState.archivedDate = action.archivedDate;
    newState.registeredUrl = action.registeredUrl;

    return newState;

  case Types.RESET_ALL:
    return initialState;

  case Types.SEARCH_ARCHIVED_URL:
    newState.datesOfArchives = action.datesOfArchives;
    newState.requestUrl = action.requestUrl;

    return newState;

  case Types.SEARCH_INITIAL_URL:
    newState.datesOfArchives = action.datesOfArchives;
    newState.requestUrl = action.requestUrl;

    return newState;

  case Types.SEARCH_INVALID_URL:
    newState.isValidUrl = action.isValidUrl;
    newState.requestUrl = action.requestUrl;

    return newState;

  case Types.TERMINATE_LOADER:
    newState.loading = action.loading;

    return newState;

  default:
    return newState;
  }
};

export default rootReducer;
