import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AppContainer from '../containers/AppContainer';

const RootRouter = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Switch>
          <Redirect exact from="/" to="/web" />
          <Route path="/web/:url" component={AppContainer} />
          <Route exact path="/web" component={AppContainer} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
);

export default RootRouter;
