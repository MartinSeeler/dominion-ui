import React from 'react';
import functional from 'react-functional';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import routes from '../routes';

const Root = ({store, history}) => {
  return (
    <Provider store={store}>
      <Router history={history} routes={routes}/>
    </Provider>
  );
};

const options = {
  propTypes: {
    store: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
  }
};

export default functional(Root, options);
