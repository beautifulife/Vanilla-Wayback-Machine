import React, { Component, Fragment } from 'react';
import './ArchiveLists.scss';

class ArchiveLists extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { onInit } = this.props;
  }

  render() {
    return (
      <div className="ArchiveLists">
        ArchiveLists
      </div>
    );
  }
}

export default ArchiveLists;
