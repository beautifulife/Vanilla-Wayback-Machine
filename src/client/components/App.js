import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.scss';
import MainSearch from './MainSearch';
import ArchiveContainer from '../containers/ArchiveContainer';
import HeaderContainer from '../containers/HeaderContainer';
import SearchResultsContainer from '../containers/SearchResultsContainer';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App__header">
          <HeaderContainer />
        </header>
        <div className="App__body">
          <Fragment>
            <Switch>
              <Redirect exact from="/" to="/web" />
              <Route path="/web/:url/:moment" component={ArchiveContainer} />
              <Route path="/web/:url" component={SearchResultsContainer} />
              <Route exact path="/web" component={MainSearch} />
            </Switch>
          </Fragment>
        </div>
        <footer className="App__footer">
          <span>terms of service</span>
        </footer>
      </div>
    </Router>
  );
};

export default App;
