import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
