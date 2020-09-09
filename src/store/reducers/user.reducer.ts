import { UserState } from '../../models/state.model';
import { UserActions, UserActionsTypes, LoginAction, ConnectAction, UpdateGnomesAction, ChangePageAction } from '../../models/actions/user-actions.model';
import { Cities } from '../../models/data/city.model';

const defaultState: UserState = {
  currentUser: undefined,
  isAdmin: false,
  connectionsIds: [],
  cityFilter: Cities.Brastlewark,
  currentPageIndexFilter: 0,
  totalPages: 0,
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
    case UserActionsTypes.changePage:
      const changePageAction = action as ChangePageAction;
      return {
        ...state,
        currentPageIndexFilter: changePageAction.currentPageIndexFilter,
        totalPages: changePageAction.totalPages ? changePageAction.totalPages : state.totalPages
      };
    default:
      return state;
  }
}