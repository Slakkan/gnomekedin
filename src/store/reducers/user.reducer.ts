import { UserState } from '../../models/state.model';
import { UserActions, UserActionsTypes, LoginAction, ConnectAction } from '../../models/user-actions.model';

const defaultState: UserState = {
  currentUser: undefined,
  isAdmin: false,
  connectionsIds: []
};

export default function userReducer(state: UserState = defaultState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionsTypes.login:
      const loginAction = action as LoginAction
      return {
        ...state,
        currentUser: loginAction.currentUser,
        isAdmin: loginAction.isAdmin
      };
    case UserActionsTypes.connect:
      const connectAction = action as ConnectAction
      return {
        ...state,
        connectionsIds: [...state.connectionsIds, connectAction.userId]
      }
    default:
      return state;
  }
}