import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/app';
// import ChildOnlyWrapper from './pages/common/components/child-wrapper';
// import {UserAuthWrapper} from 'redux-auth-wrapper';
// import {routerActions} from 'react-router-redux';
import Connect from './pages/connect/containers/connect';
// import Game from './pages/game/game';

// const authWrapper = UserAuthWrapper;
/* const onlyWhenInGame = authWrapper({
 authSelector: state => state.game, // how to get the user state
 // authenticatingSelector: state => state.auth.isAuthenticating,
 redirectAction: routerActions.replace, // the redux action to dispatch for redirect
 wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check,
 predicate: game => game.isConnected,
 allowRedirectBack: true
 }); */

export default (
    <Route path="/" component={App}>
      <IndexRoute component={Connect}/>
      <Route path="/connect" component={Connect}/>
    </Route>
);
