import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import './App.scss';

import MainSearch from './MainSearch';
import SearchResultsContainer from '../containers/SearchResultsContainer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      toWebUrl: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleChange(ev) {
    this.setState({
      inputValue: ev.currentTarget.value
    });
  }

  handleSubmit(ev) {
    const { inputValue } = this.state;

    ev.preventDefault();

    if (inputValue) {
      this.setState({
        toWebUrl: true
      });
    }
  }

  render() {
    const { inputValue } = this.state;

    // const renderHeader = () => {
      // if (!match.params.url) {
        // return (
        //   <h1 className="App__header__title main">
        //     <Link to="/">Vanilla_Archive</Link>
        //   </h1>
        // );
      // }

      // return (
      //   <Fragment>
          // <h1 className="App__header__title">
          //   <Link to="/">Vanilla_Archive</Link>
          // </h1>
          // <div className="App__header__wrapper">
          //   <form className="App__header__form" onSubmit={this.handleSubmit}>
          //     <input
          //       type="text"
          //       value={inputValue}
          //       placeholder="Type URL"
          //       className="App__header__form__text"
          //       onChange={this.handleChange}
          //     />
          //     <input type="submit" value="GO" className="App__header__form__submit" />
          //   </form>
          // </div>
      //   </Fragment>
      // );
    // };

    return (
      <Router>
        <div className="App">
          <header className="App__header">
            <h1 className="App__header__title">
              <Link to="/">Vanilla_Archive</Link>
            </h1>
            <div className="App__header__wrapper">
              <form className="App__header__form" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  value={inputValue}
                  placeholder="Type URL"
                  className="App__header__form__text"
                  onChange={this.handleChange}
                />
                <input type="submit" value="GO" className="App__header__form__submit" />
              </form>
            </div>
          </header>
          <div className="App__body">
            <Fragment>
              <Switch>
                <Redirect exact from="/" to="/web" />
                <Route path="/web/:url" component={SearchResultsContainer} />
                <Route exact path="/web" component={MainSearch} />
              </Switch>
            </Fragment>
          </div>
          <footer className="App__footer">terms of service</footer>
        </div>
      </Router>
    );
  }
}
