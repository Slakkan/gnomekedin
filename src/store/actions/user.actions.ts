import { timer } from 'rxjs';

import { UserActionsTypes as UserActionTypes, LoginAction, ConnectAction } from '../../models/user-actions.model';
import { User } from '../../models/user.model';
import { ThunkAction } from 'redux-thunk';
import { UserState } from '../../models/state.model';
import { mockUser } from '../../tests/mocks/users.mock';

// SYNCHRONOUS

export function login(currentUser: User, isAdmin: boolean): LoginAction {
  return {
    type: UserActionTypes.login,
    currentUser,
    isAdmin
  };
}

export function connect(userId: string): ConnectAction {
  return {
    type: UserActionTypes.connect,
    userId
  };
}

// ASYNCHRONOUS
export function loginRequest(username: string, passowrd: string): ThunkAction<void, UserState, null, LoginAction> {
  return (dispatch) => {
    // We don't have a backend yet so we are simulating a delay and mocking the response
    timer(2000).subscribe(() => {
      const isAdmin = username === 'admin' && passowrd === 'admin'
      dispatch(login(mockUser, isAdmin));
    });
  };
}