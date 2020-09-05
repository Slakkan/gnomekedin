import { User } from './user.model';

export interface UserState {
  currentUser?: User,
  isAdmin?: boolean;
  connectionsIds: string[];
};