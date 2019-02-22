import { connect } from 'react-redux';
import Archive from '../components/Archive';
import { setWebPage } from '../actions';

const mapStateToProps = (state) => {
  const { datesOfArchives, pageSource, requestUrl } = state;

  return {
    datesOfArchives,
    pageSource,
    requestUrl
  };
};

const mapDispatchToProps = dispatch => ({
  onInit: (searchUrl, moment) => {
    fetch(`/api/archives/${searchUrl}/${moment}`)
      .then(res => res.json())
      .then((res) => {
        console.log(res);
        if (res.message === 'ok') {
          dispatch(setWebPage(res.requestUrl, res.archive.html));
        } else {
          console.log('데이터 안왔나벼');
          // dispatch(setWebPage());
        }
      })
      .catch(err => console.log(err));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Archive);
