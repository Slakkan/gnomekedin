import { User } from './user.model';

export enum Cities {
  Brastlewark = "Brastlewark"
}

export interface City {
  [cityname: string]: User[]
}

