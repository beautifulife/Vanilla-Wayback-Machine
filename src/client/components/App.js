import React, { Component } from 'react';
// import vanillaCodingLogo from './vanilla_coding.png';
import './App.scss';

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
    const { username, match } = this.state;
    console.log(match);

    return (
      <div>
        <header className="App__header">
          <h1 className="App__header__title">Vanilla_Archive</h1>
        </header>
        <div className="App__body">
          <input type="text" />
        </div>
        <footer className="App__footer">terms of service</footer>
      </div>
    );
  }
}
