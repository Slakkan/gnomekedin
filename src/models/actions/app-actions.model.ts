import { Action } from 'redux';

export type AppActions = NotifyAction | SetBoardLoading;

export enum AppActionsTypes {
  notify = "NOTIFY",
  setBoardLoading = "SET_BOARD_LOADING"
};

export interface NotifyAction extends Action {
  message: string;
  isActive: boolean;
};

export interface SetBoardLoading extends Action {
  isBoardLoading: boolean;
};
