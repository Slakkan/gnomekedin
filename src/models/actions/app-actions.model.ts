import { Action } from 'redux';

export type AppActions = NotifyAction;

export enum AppActionsTypes {
  notify = "NOTIFY"
};

export interface NotifyAction extends Action {
  message: string;
  isActive: boolean;
};
