import { timer, from } from 'rxjs';
import { ThunkAction } from 'redux-thunk';

import { UserActionsTypes as UserActionTypes, LoginAction, ConnectAction, UpdateGnomesAction, ChangePageAction } from '../../models/actions/user-actions.model';
import { User } from '../../models/data/user.model';
import { UserState, GlobalState } from '../../models/state.model';
import { mockUser } from '../../tests/mocks/users.mock';
import { paginate } from '../../shared/paginator.utility';
import { appConfig } from '../../settings/app.settings';
import { createNotification, setBoardLoading } from './app.actions';
import { CONNECTION_ERROR } from '../../settings/constants.settings';
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

export function changePage(currentPageIndexFilter: number = 0, totalPages?: number): ChangePageAction {
  return {
    type: UserActionTypes.changePage,
    currentPageIndexFilter,
    totalPages
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

export function getGnomesData(page: number, firstLoad?: boolean): ThunkAction<void, GlobalState, null, any> {
  return (dispatch, getState) => {
    from(fetch('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json')
      .then(res => res.json())
    )
      .subscribe(res => {
        // Inizializations
        dispatch(setBoardLoading(true))

        // Filters
        const gnomesInCity: User[] = res[getState().userReducer.cityFilter];
        const gnomesInPage: User[] = paginate(gnomesInCity, appConfig.gnomesPerPage, page);

        // First Load
        if (firstLoad) {
          const lastSessionsPage = localStorage.getItem('lastSessionsPage');
          const totalPages = Math.floor(gnomesInCity.length / appConfig.gnomesPerPage);
          if (lastSessionsPage) {
            dispatch(changePage(+lastSessionsPage, totalPages));
          } else {
            dispatch(changePage(0, totalPages));
          }
        }

        // Processing
        // Fix profession format
        const gnomeProfessionsFormatted = gnomesInPage.map(gnome => {
          const professions = gnome.professions.map(profession => profession.trim().toUpperCase());
          return { ...gnome, professions };
        });

        // Save last visited page
        localStorage.setItem('lastSessionsPage', page.toString());

        // Fetch thumbnail images
        const thumbnailUrls = gnomeProfessionsFormatted.map(gnome => gnome.thumbnail);
        fetchImages(thumbnailUrls).subscribe((thumbnailLocalUrls) => {
          console.log(gnomesInPage, gnomeProfessionsFormatted)
          const gnomes = gnomeProfessionsFormatted.map((gnome, index) => ({ ...gnome, thumbnail: thumbnailLocalUrls[index] }));
          dispatch(updateGnomes(gnomes));
          dispatch(setBoardLoading(false))
        });
      },
        (error: Error) => {
          if (error.message.includes('Failed to fetch')) {
            dispatch(createNotification(CONNECTION_ERROR));
            dispatch(setBoardLoading(false))
          }
        });
  };
}