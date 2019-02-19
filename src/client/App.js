import React, { Component } from 'react';
import vanillaCodingLogo from './vanilla_coding.png';
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
    const { username } = this.state;
    return (
      <div>
        {username ? <h1>{`Hello ${username.toUpperCase()}`}</h1> : <h1>Loading.. please wait!</h1>}
        <img src={vanillaCodingLogo} alt="Vanilla Coding" />
      </div>
    );
  }
}
