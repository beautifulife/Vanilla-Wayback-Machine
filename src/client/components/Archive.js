import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import './Archive.scss';

import Frame from 'react-frame-component';

export default class Archive extends Component {
  componentDidMount() {
    const { onInit, match: { params } } = this.props;

    console.log(params);
    onInit(params.url, params.moment);
  }

  render() {
    const { pageSource } = this.props;

    const styles = {
      border: '1px, solid',
      width: '100%',
      height: '100%'
    };

    return (
      <div className="Archive">
        {pageSource && <Frame initialContent={pageSource} style={styles}><div>hello</div></Frame>}
      </div>
    );
  }
}
