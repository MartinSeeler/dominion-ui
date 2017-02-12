import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {syncHistoryWithStore} from 'react-router-redux';
import {AppContainer} from 'react-hot-loader';
import configureStore from './store/configure-store';
import Root from './containers/root';
import './styles/main.scss';
import {createHistory} from 'history';
import {useRouterHistory} from 'react-router';

const browserHistory = useRouterHistory(createHistory)({
  basename: process.env.BASE_URL
});
const store = configureStore({}, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

render(
    <AppContainer>
      <Root store={store} history={history}/>
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/root', () => {
    const NewRoot = require('./containers/root').default;
    render(
        <AppContainer>
          <NewRoot store={store} history={history}/>
        </AppContainer>,
        document.getElementById('root')
    );
  });
}
