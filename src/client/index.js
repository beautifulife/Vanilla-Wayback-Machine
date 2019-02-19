import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import './index.scss';
import rootReducer from './reducers';
import RootRouter from './components/RootRouter';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger))
);

ReactDOM.render(
  <RootRouter store={store} />,
  document.getElementById('root')
);
