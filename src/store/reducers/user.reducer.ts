import { UserState } from '../../models/state.model';
import { UserActions, UserActionsTypes, LoginAction, ConnectAction, UpdateGnomesAction } from '../../models/actions/user-actions.model';
import { Cities } from '../../models/data/city.model';

const defaultState: UserState = {
  currentUser: undefined,
  isAdmin: false,
  connectionsIds: [],
  cityFilter: Cities.Brastlewark,
  CurrentPageFilter: 0,
  gnomes: []
};

export default function userReducer(state: UserState = defaultState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionsTypes.login:
      const loginAction = action as LoginAction;
      return {
        ...state,
        currentUser: loginAction.currentUser,
        isAdmin: loginAction.isAdmin
      };
    case UserActionsTypes.connect:
      const connectAction = action as ConnectAction;
      return {
        ...state,
        connectionsIds: [...state.connectionsIds, connectAction.userId]
      };
    case UserActionsTypes.getGnomes:
      const getGnomesAction = action as UpdateGnomesAction;
      return {
        ...state,
        gnomes: getGnomesAction.gnomes
      };
    default:
      return state;
  }
}