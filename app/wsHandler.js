// import * as WebSocket from 'rxjs/Observable/dom/webSocket';
import * as Rx from 'rxjs';
import {types} from './reducers/connection';
import {createAction} from 'redux-actions';

const msgToSend = new Rx.Subject();

export default () => store => next => action => {
  next(action);
  switch (action.type) {
    case types.CONNECT: {
      console.log('STore', store);
      console.log('CONNECT REQUEST', action);
      const socket = Rx.Observable.webSocket({
        url: `ws://${action.payload.host}/api/connect?name=${encodeURI(action.payload.name)}`,
        resultSelector: e => e.data,
        openObserver: {
          next: () => store.dispatch(createAction(types.CONNECT_SUCCESS)),
          error: e => store.dispatch(createAction(types.CONNECT_FAILURE, e))
        },
        closeObserver: {
          next: () => console.log('close')
        }
      });
      socket.subscribe(msgToSend);
      socket.subscribe(
          msg => store.dispatch(JSON.parse(msg)),
          e => console.error(e),
          () => console.log('complete')
      );

      return;
    }
    default:
      return;
  }
};
