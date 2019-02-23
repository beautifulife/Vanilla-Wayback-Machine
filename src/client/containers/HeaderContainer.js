import { connect } from 'react-redux';
import Header from '../components/Header';
import {
  initializePageSource,
  resetAll,
  searchArchivedUrl,
  searchInitialUrl,
  searchInvalidUrl
} from '../actions';

const mapStateToProps = (state) => {
  const { requestUrl } = state;

  return {
    requestUrl
  };
};

const mapDispatchToProps = dispatch => ({
  onLinkClick: () => {
    dispatch(resetAll());
  },
  onSubmit: (searchUrl) => {
    dispatch(initializePageSource());

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
      })
      .catch(err => console.error(err));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
