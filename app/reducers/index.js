import {routerReducer as routing} from 'react-router-redux';
import {reducer as notificationsReducer} from 'reapop';
import {reducer as form} from 'redux-form';
import {combineReducers} from 'redux';
import game from './connection';

export default combineReducers({
  form,
  notifications: notificationsReducer(),
  routing,
  game
});
