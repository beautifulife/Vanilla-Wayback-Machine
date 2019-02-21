import * as Types from './actionTypes';

export const addDatesToCalendar = (requestUrl, datesOfArchives) => ({
  type: Types.ADD_DATES_TO_CALENDAR,
  requestUrl,
  datesOfArchives
});

export const getWebPage = data => ({
  type: Types.GET_WEB_PAGE,
  url: data.url,
  html: data.html,
  css: data.css,
  date: data.date
});

export const pickDate = pickedDate => ({
  type: Types.PICK_DATE,
  pickedDate
});

export const chooseArchiveDate = choosedDate => ({
  type: Types.CHOOSE_ARCHIVE_DATE,
  choosedDate,
});

export const registerUrl = url => ({
  type: Types.REGISTER_URL,
  url
});
