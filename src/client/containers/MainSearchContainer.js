import { connect } from 'react-redux';
import MainSearch from '../components/MainSearch';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  onSubmit: (inputValue) => {
    console.log(inputValue);
    fetch(`/api/archives/${inputValue}`)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch(err => console.log(err));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSearch);
