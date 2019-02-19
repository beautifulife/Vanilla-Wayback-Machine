import { connect } from 'react-redux';
import { setChatList } from '../actions';
import ArchiveLists from '../components/ArchiveLists';

const mapStateToProps = (state) => {
};

const mapDispatchToProps = dispatch => ({
  onInit: () => {
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchiveLists);
