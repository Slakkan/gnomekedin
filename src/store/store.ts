import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/user.reducer';
import appReducer from './reducers/app.reducer'

const reducer = combineReducers({userReducer, appReducer})

export const store = createStore(reducer, applyMiddleware(thunk));

// TODO: delete these lines as they are meant to test the store and should not be part of the final code.
store.subscribe(() => console.log('Gnomes in this page: ',store.getState().userReducer.gnomes));