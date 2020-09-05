import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/user.reducer';
import { loginRequest } from './actions/user.actions';

export const store = createStore(userReducer, applyMiddleware(thunk));

// TODO: delete these three lines as they are meant to test the store and should not be part of the final code.
console.log('Initial State: ',store.getState());
store.subscribe(() => console.log('State Changed: ',store.getState()));
store.dispatch<any>(loginRequest('admin', 'admin'));