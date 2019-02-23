import * as Types from './actionTypes';

export const initLoader = () => ({
  type: Types.INIT_LOADER,
  loading: true
});

export const pickDate = pickedDate => ({
  type: Types.PICK_DATE,
  pickedDate
});

export const registerUrl = (archivedDate, registeredUrl) => ({
  type: Types.REGISTER_URL,
  archivedDate,
  registeredUrl
});

export const resetAll = () => ({
  type: Types.RESET_ALL
});

export const searchArchivedUrl = (requestUrl, datesOfArchives) => ({
  type: Types.SEARCH_ARCHIVED_URL,
  requestUrl,
  datesOfArchives,
  isValidUrl: true
});

export const searchInitialUrl = requestUrl => ({
  type: Types.SEARCH_INITIAL_URL,
  requestUrl,
  datesOfArchives: [],
  isValidUrl: true
});

export const searchInvalidUrl = requestUrl => ({
  type: Types.SEARCH_INVALID_URL,
  requestUrl,
  isValidUrl: false
});

export const setWebPage = (requestUrl, pageSource) => ({
  type: Types.SET_WEB_PAGE,
  requestUrl,
  pageSource
});

export const terminateLoader = () => ({
  type: Types.TERMINATE_LOADER,
  loading: false
});
