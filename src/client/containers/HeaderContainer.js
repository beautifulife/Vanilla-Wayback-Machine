import { connect } from 'react-redux';
import Header from '../components/Header';
import {
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
