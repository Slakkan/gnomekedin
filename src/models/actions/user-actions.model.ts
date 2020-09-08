import { Action } from 'redux';

import { User } from '../data/user.model';

// User Actions
export type UserActions = LoginAction | ConnectAction | UpdateGnomesAction;

export enum UserActionsTypes {
  login = "LOGIN",
  connect = "CONNECT",
  getGnomes = "GET_GNOMES"
};

export interface LoginAction extends Action {
  currentUser: User;
  isAdmin: boolean;
};

export interface ConnectAction extends Action {
  userId: string;
};


export interface UpdateGnomesAction extends Action {
  gnomes: User[]
};