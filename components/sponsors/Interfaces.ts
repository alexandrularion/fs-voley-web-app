import { TTableFilter } from '../shared/Interfaces';

export type TSponsor = {
  logo: string;
  title: string;
  site: string;
  startDate: string;
  endDate: string;
  key?: string;
};

export interface ISponsorsCard extends TSponsor {}

export interface ISponsorsHeader {
  isUsedInAdminPage?: boolean;
}

export interface ISponsorsList {
  data: TSponsor[];
  filter?: TTableFilter;
}
