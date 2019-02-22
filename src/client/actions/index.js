import * as Types from './actionTypes';

export const addDatesToCalendar = (requestUrl, datesOfArchives) => ({
  type: Types.ADD_DATES_TO_CALENDAR,
  requestUrl,
  datesOfArchives
});

export const setWebPage = (requestUrl, pageSource) => ({
  type: Types.SET_WEB_PAGE,
  requestUrl,
  pageSource
});

export const pickDate = pickedDate => ({
  type: Types.PICK_DATE,
  pickedDate
});

export const resetState = () => ({
  type: Types.RESET_ALL
});

export const chooseArchiveDate = choosedDate => ({
  type: Types.CHOOSE_ARCHIVE_DATE,
  choosedDate,
});

export const registerUrl = registerUrl => ({
  type: Types.REGISTER_URL,
  registeredUrl
});
