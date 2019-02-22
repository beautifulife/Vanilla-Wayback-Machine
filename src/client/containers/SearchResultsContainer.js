import { connect } from 'react-redux';
import SearchResults from '../components/SearchResults';
import {
  registerUrl,
  searchArchivedUrl,
  searchInitialUrl,
  searchInvalidUrl
} from '../actions';

const mapStateToProps = (state) => {
  const {
    archivedDate,
    datesOfArchives,
    isValidUrl,
    registeredUrl,
    requestUrl,
    searchUrl
  } = state;

  return {
    archivedDate,
    datesOfArchives,
    isValidUrl,
    registeredUrl,
    requestUrl,
    searchUrl
  };
};

const mapDispatchToProps = dispatch => ({
  onInit: (searchUrl) => {
    console.log(searchUrl);
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
      })
      .catch(err => console.log(err));
  },
  onRegisterClick: (url) => {
    fetch(`/api/archives/${url}`, {
      method: 'post'
    })
      .then(res => res.json())
      .then((res) => {
        if (res.message === 'ok') {
          dispatch((registerUrl(res.archivedDate, res.registeredUrl)));
        }
      });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
