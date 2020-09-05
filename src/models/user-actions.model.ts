import { Action } from 'redux';

import { User } from './user.model';

// User Actions
export type UserActions = LoginAction | ConnectAction;

export enum UserActionsTypes {
  login = "LOGIN",
  connect = "CONNECT"
};

export interface LoginAction extends Action {
  currentUser: User;
  isAdmin: boolean;
};

export interface ConnectAction extends Action {
  userId: string;
};
