import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import vanillaCodingLogo from './vanilla_coding.png';
import './App.scss';

import MainSearchContainer from '../containers/MainSearchContainer';
import ArchiveListContainer from '../containers/ArchiveListsContainer';
import ArchiveListsContainer from '../containers/ArchiveListsContainer';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };
  }

  componentDidMount() {
    fetch('/api/v1/username')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    const { match } = this.props;
    console.log(match);

    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__header__title">Vanilla_Archive</h1>
        </header>
        <div className="App__body">
          {match && <MainSearchContainer />}
          {match === 'list' && <ArchiveListsContainer />}
        </div>
        <footer className="App__footer">terms of service</footer>
      </div>
    );
  }
}
