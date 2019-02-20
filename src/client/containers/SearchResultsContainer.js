import { connect } from 'react-redux';
import SearchResults from '../components/SearchResults';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
