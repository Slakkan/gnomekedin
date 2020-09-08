import { AppState } from '../../models/state.model';
import { AppActions, AppActionsTypes, NotifyAction } from '../../models/actions/app-actions.model';

const defaultState: AppState = {
  currentNotification: '',
  isNotificationActive: false
}

export default function appReducer(state: AppState = defaultState, action: AppActions): AppState {
  switch (action.type) {
    case AppActionsTypes.notify:
      const notifyAction = action as NotifyAction;
      return {
        ...state,
        isNotificationActive: notifyAction.isActive,
        currentNotification: notifyAction.message
      };
    default:
      return state;
  }
}