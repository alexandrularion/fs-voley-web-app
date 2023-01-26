import { TTableFilter } from '../shared/Interfaces';

export type TBEUser = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
};

export type TUser = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export interface IUsersTable {
  filter?: TTableFilter;
}
