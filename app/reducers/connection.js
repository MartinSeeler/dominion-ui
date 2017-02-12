import {createAction} from 'redux-actions';

export const types = {
  CONNECT: 'CONNECT',
  CONNECT_SUCCESS: 'CONNECT_SUCCESS',
  CONNECT_FAILURE: 'CONNECT_FAILURE'
};
export const actions = {
  connect: createAction(types.CONNECT, (host, username) => ({host, username}))
};

const initialState = {
  host: '',
  username: '',
  connected: false,
  isConnecting: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CONNECT:
      return state;
    default:
      return state;
  }
};
