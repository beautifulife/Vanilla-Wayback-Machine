import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  onInit: () => {
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
