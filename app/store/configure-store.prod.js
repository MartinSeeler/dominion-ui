import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {routerMiddleware} from 'react-router-redux';
import wsHandler from '../wsHandler';

export default function configureStore(initialState, history) {
  const logger = createLogger();

  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(wsHandler(), routerMiddleware(history), thunk, logger))
  );
}
