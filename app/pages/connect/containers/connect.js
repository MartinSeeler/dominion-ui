import React from 'react';
import {connect} from 'react-redux';
import functional from 'react-functional';
import {push} from 'react-router-redux';
import DocumentTitle from 'react-document-title';
import {Field, reduxForm} from 'redux-form';
// import * as _ from 'lodash';
// const _ = require('lodash');
import {actions} from '../../../reducers/connection';

const required = value => value ? undefined : 'Please enter your username!';

const renderField = ({input, label, placeholder, errorMsg, type, help, meta: {touched, error, warning}}) => (
    <div>
      <label>{errorMsg === undefined ? label : <span className="text-danger">{errorMsg}</span>}</label>
      <input {...input} placeholder={placeholder} className="form-control" type={type}/>
      {(touched && ((error && <small className="form-text text-danger">{error}</small>) || (warning &&
      <span>{warning}</span>))) || <small className="form-text text-muted">{help}</small>}
    </div>
);

const Join = props => {
  const {handleSubmit, submitting, isConnecting, errorMsg} = props;
  return (
      <DocumentTitle title={'Connect to Dominion Server'}>
        <div className="container-fluid">
          <br/>
          <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
            <h1>Connect to Server</h1>
            <hr/>
            <form id="login" onSubmit={handleSubmit}>
              <div className="form-group">
                <Field id="host" name="host"
                       type="text"
                       label="Server IP"
                       errorMsg={errorMsg}
                       help=""
                       component={renderField}
                       validate={[required]}
                       placeholder="127.0.0.1"/>
                <Field id="username" name="username"
                       type="text"
                       label="Player Name"
                       errorMsg={errorMsg}
                       help=""
                       component={renderField}
                       validate={[required]}
                       placeholder="e.g. Mighty Robin Banks"/>
              </div>
              <div className="form-group">
                <button
                    type="submit"
                    disabled={submitting || isConnecting}
                    className="btn btn-outline-primary btn-block">{isConnecting ? 'Connecting...' : 'Connect'}</button>
              </div>
            </form>
          </div>
        </div>
      </DocumentTitle>
  );
};

const options = {
  propTypes: {
    isConnected: React.PropTypes.bool.isRequired,
    isConnecting: React.PropTypes.bool.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },
  componentWillReceiveProps: (props, nextProps) => {
    const {isAuthenticated, redirectUrl, redirectAction} = nextProps;
    const {isAuthenticated: wasAuthenticated} = props;
    if (!wasAuthenticated && isAuthenticated) {
      redirectAction(redirectUrl);
    }
  }
};

const joinForm = reduxForm({
  form: 'join',
  fields: ['host']
})(functional(Join, options));

const mapStateToProps = state => {
  return {
    isConnected: state.game.isConnected,
    isConnecting: state.game.isConnecting,
    initialValues: {
      host: '127.0.0.1:4242',
      username: 'The mighty Bernd'
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: values => {
      console.log('CONNECT SUBMIT', values);
      dispatch(actions.connect(values.host, values.username));
    },
    redirectAction: target => dispatch(push(target))
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(joinForm);
