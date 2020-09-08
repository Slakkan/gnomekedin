import { timer, from } from 'rxjs';
import { ThunkAction } from 'redux-thunk';

import { UserActionsTypes as UserActionTypes, LoginAction, ConnectAction, UpdateGnomesAction } from '../../models/actions/user-actions.model';
import { User } from '../../models/data/user.model';
import { UserState, GlobalState } from '../../models/state.model';
import { mockUser } from '../../tests/mocks/users.mock';
import { paginate } from '../../shared/paginator.utility';
import { appConfig } from '../../settings/app.settings';
import { notify, createNotification } from './app.actions';
import { CONNECTION_ERROR } from '../../settings/constants.settings';
import { NotifyAction } from '../../models/actions/app-actions.model';
import { fetchImages } from '../../shared/images.utility';

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

export function updateGnomes(gnomes: User[]): UpdateGnomesAction {
  return {
    type: UserActionTypes.getGnomes,
    gnomes
  };
}

// ASYNCHRONOUS
export function loginRequest(username: string, passowrd: string): ThunkAction<void, UserState, null, LoginAction> {
  return (dispatch) => {
    // We don't have a backend yet so we are simulating a delay and mocking the response
    timer(2000).subscribe(() => {
      const isAdmin = username === 'admin' && passowrd === 'admin';
      dispatch(login(mockUser, isAdmin));
    });
  };
}

export function getGnomesData(): ThunkAction<void, GlobalState, null, any> {
  return (dispatch, getState) => {
    from(fetch('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json')
      .then(res => res.json())
    )
      .subscribe(res => {
        // Filters
        const gnomesInCity: User[] = res[getState().userReducer.cityFilter];
        const gnomesInPage: User[] = paginate(gnomesInCity, appConfig.gnomesPerPage, getState().userReducer.CurrentPageFilter);

        // Processing
        // Fix profession format
        const gnomeProfessionsFormatted = gnomesInPage.map(gnome => {
          const professions = gnome.professions.map(profession => profession.trim().toUpperCase())
          return {...gnome, professions}
        })

        const thumbnailUrls = gnomeProfessionsFormatted.map(gnome => gnome.thumbnail);
        fetchImages(thumbnailUrls).subscribe((thumbnailLocalUrls) => {
          const gnomes = gnomeProfessionsFormatted.map((gnome, index) => ({ ...gnome, thumbnail: thumbnailLocalUrls[index] }));
          dispatch(updateGnomes(gnomes));
        });
      },
        (error: Error) => {
          if (error.message.includes('Failed to fetch')) {
            dispatch(createNotification(CONNECTION_ERROR));
          }
        });
  };
}