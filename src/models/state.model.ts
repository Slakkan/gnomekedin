import { User } from './data/user.model';
import { Cities } from './data/city.model';

export interface GlobalState{
  appReducer: AppState;
  userReducer: UserState
}

export interface UserState {
  currentUser?: User,
  isAdmin?: boolean;
  connectionsIds: string[];
  cityFilter: Cities;
  CurrentPageFilter: number;
  gnomes: User[]
};

export interface AppState{
  currentNotification: string;
  isNotificationActive: boolean;
}