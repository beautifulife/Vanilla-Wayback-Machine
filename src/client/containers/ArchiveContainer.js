import { connect } from 'react-redux';
import Archive from '../components/Archive';
import {
  initLoader,
  searchArchivedUrl,
  searchInitialUrl,
  searchInvalidUrl,
  loadPageSource,
  terminateLoader
} from '../actions';

const mapStateToProps = (state) => {
  const { datesOfArchives, loading, pageSource, requestUrl } = state;

  return {
    datesOfArchives,
    pageSource,
    loading,
    requestUrl
  };
};

const mapDispatchToProps = dispatch => ({
  onInit: (searchUrl, moment) => {
    dispatch(initLoader());

    fetch(`/api/archives/${searchUrl}`)
      .then(res => res.json())
      .then((res) => {
        console.log(res);
        if (res.message === 'ok') {
          dispatch(searchArchivedUrl(res.requestUrl, res.datesOfArchives));
        } else if (res.message === 'empty') {
          dispatch(searchInitialUrl(res.requestUrl));
        } else {
          dispatch(searchInvalidUrl(res.requestUrl));
        }

        dispatch(terminateLoader());
      })
      .catch(err => console.log(err));

    fetch(`/api/archives/${searchUrl}/${moment}`)
      .then(res => res.json())
      .then((res) => {
        console.log(res);
        if (res.message === 'ok') {
          dispatch(loadPageSource(res.requestUrl, res.archive.html));
        }
      })
      .catch(err => console.log(err));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Archive);
