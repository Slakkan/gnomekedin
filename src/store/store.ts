import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/user.reducer';
import appReducer from './reducers/app.reducer'

const reducer = combineReducers({userReducer, appReducer})

export const store = createStore(reducer, applyMiddleware(thunk));
