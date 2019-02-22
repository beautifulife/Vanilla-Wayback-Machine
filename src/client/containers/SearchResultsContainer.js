import { connect } from 'react-redux';
import SearchResults from '../components/SearchResults';
import { addDatesToCalendar, registerUrl } from '../actions';

const mapStateToProps = (state) => {
  console.log(state);
  const { searchUrl, requestUrl, datesOfArchives } = state;

  return {
    searchUrl,
    requestUrl,
    datesOfArchives,
  };
};

const mapDispatchToProps = dispatch => ({
  onInit: (searchUrl) => {
    console.log(searchUrl);
    fetch(`/api/archives/${searchUrl}`)
      .then(res => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 'ok') {
          dispatch(addDatesToCalendar(res.requestUrl, res.datesOfArchives));
        } else {
          dispatch(addDatesToCalendar(res.requestUrl, []));
        }
      })
      .catch(err => console.log(err));
  },
  onRegisterClick: (url) => {
    fetch(`/api/archives/${url}`, {
      method: 'post',
    })
      .then(res => res.json())
      .then((res) => {
        if (res.status === 'ok') {
          dispatch((registerUrl(res.registeredUrl)));
        }
      });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
