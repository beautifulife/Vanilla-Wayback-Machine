import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AppContainer from '../containers/AppContainer';

const RootRouter = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Switch>
          <Redirect exact path="/" component={AppContainer} />
          <Route path="/archives/:url" component={AppContainer} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
);

export default RootRouter;
