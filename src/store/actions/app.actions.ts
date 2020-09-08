import { ThunkAction } from 'redux-thunk';

import { NotifyAction, AppActionsTypes } from '../../models/actions/app-actions.model';
import { AppState } from '../../models/state.model';
import { appConfig } from '../../settings/app.settings';
import { timer } from 'rxjs';

// SYNCHRONOUS
export function notify(message: string, isActive: boolean): NotifyAction {
  return {
    type: AppActionsTypes.notify,
    message,
    isActive
  };
};

// ASYNCHRONOUS
export function createNotification(message: string): ThunkAction<void, AppState, null, NotifyAction> {
  return (dispatch) => {
    // Create the message
    dispatch(notify(message, true));
    // After notificationDurationInMs destroy the message
    timer(appConfig.notificationDurationInMs).subscribe(() => dispatch(notify(message, false)));
  };
}

