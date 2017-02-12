import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import wsHandler from '../wsHandler';

export default function configureStore(initialState, history) {
  const logger = createLogger();

  const composeEnhencer = composeWithDevTools({
    name: 'Dominion UI', actionsBlacklist: ['@@redux-form/REGISTER_FIELD', '@@redux-form/UNREGISTER_FIELD']
  });

  return createStore(
    rootReducer,
    initialState,
    composeEnhencer(applyMiddleware(wsHandler(), routerMiddleware(history), thunk, logger))
  );
}
