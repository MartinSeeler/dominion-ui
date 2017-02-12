import React from 'react';
import functional from 'react-functional';
import NotificationSystem from 'reapop';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import theme from 'reapop-theme-wybo';

const _ = require('lodash');

const App = ({children}) => {
  return (
    <div>
      <NotificationSystem theme={theme}/>
      { children }
    </div>
  );
};

const options = {
  propTypes: {
    children: React.PropTypes.object
  },
  componentWillMount: props => {
    const {shouldRedirect, redirectAction, redirectUrl} = props;
    if (shouldRedirect) {
      redirectAction(redirectUrl);
    }
  }
};

const mapStateToProps = (props, ownProps) => {
  const redirectPath = _.get(ownProps.location.query, 'redirect', '');
  return {
    shouldRedirect: redirectPath !== '' && ownProps.location.pathname === '/',
    redirectUrl: redirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    redirectAction: target => dispatch(push(target))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(functional(App, options));
