import * as Types from './actionTypes';

export const initializePageSource = () => ({
  type: Types.INITIALIZE_PAGE_SOURCE,
  pageSource: ''
});

export const initLoader = () => ({
  type: Types.INIT_LOADER,
  loading: true
});

export const loadPageSource = (requestUrl, pageSource) => ({
  type: Types.LOAD_PAGE_SOURCE,
  requestUrl,
  pageSource
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

export const terminateLoader = () => ({
  type: Types.TERMINATE_LOADER,
  loading: false
});
