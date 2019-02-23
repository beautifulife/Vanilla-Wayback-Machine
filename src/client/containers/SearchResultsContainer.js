import { connect } from 'react-redux';
import SearchResults from '../components/SearchResults';
import {
  initLoader,
  registerUrl,
  searchArchivedUrl,
  searchInitialUrl,
  searchInvalidUrl,
  terminateLoader
} from '../actions';

const mapStateToProps = (state) => {
  const {
    archivedDate,
    datesOfArchives,
    isValidUrl,
    loading,
    registeredUrl,
    requestUrl,
    searchUrl
  } = state;

  return {
    archivedDate,
    datesOfArchives,
    isValidUrl,
    loading,
    registeredUrl,
    requestUrl,
    searchUrl
  };
};

const mapDispatchToProps = dispatch => ({
  onInit: (searchUrl) => {
    dispatch(initLoader());

    fetch(`/api/archives/${searchUrl}`)
      .then(res => res.json())
      .then((res) => {
        if (res.message === 'ok') {
          dispatch(searchArchivedUrl(res.requestUrl, res.datesOfArchives));
        } else if (res.message === 'empty') {
          dispatch(searchInitialUrl(res.requestUrl));
        } else {
          dispatch(searchInvalidUrl(res.requestUrl));
        }

        dispatch(terminateLoader());
      })
      .catch((err) => {
        console.error(err);
        dispatch(terminateLoader());
      });
  },
  onRegisterClick: (url) => {
    dispatch(initLoader());
    
    fetch(`/api/archives/${url}`, {
      method: 'post'
    })
      .then(res => res.json())
      .then((res) => {
        if (res.message === 'ok') {
          dispatch((registerUrl(res.archivedDate, res.registeredUrl)));
        }

        dispatch(terminateLoader());
      })
      .catch((err) => {
        console.error(err);
        dispatch(terminateLoader());
      });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
