import * as Types from '../actions/actionTypes';

const initialState = {
  requestUrl: '',
  datesOfArchives: [],
  pageSource: ''
};

const rootReducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));

  console.log(action.type);
  switch (action.type) {
  case Types.ADD_DATES_TO_CALENDAR:
    newState.requestUrl = action.requestUrl;
    newState.datesOfArchives = action.datesOfArchives;

    console.log('데이트동작');

    return newState;

  case Types.SET_WEB_PAGE:
    newState.requestUrl = action.requestUrl;
    newState.pageSource = action.pageSource;

    return newState;

  case Types.PICK_DATE:
    newState.pickedDate = action.pickedDate;

    return newState;

  case Types.RESET_ALL:
    return initialState;

  case Types.CHOOSE_ARCHIVE_DATE:
    return newState;

  case Types.REGISTER_URL:
    newState.registeredUrl = action.registeredUrl;

    return newState;

  default:
    return newState;
  }
};

export default rootReducer;
