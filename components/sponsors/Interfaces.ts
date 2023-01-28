import { TTableFilter } from '../shared/Interfaces';

export type TSponsor = {
  id?: number;
  logo: string;
  title: string;
  site: string;
  startDate: string;
  endDate: string;
  key?: string;
};

export type TBESponsor = {
  id?: number;
  title: string;
  image_url: string;
  date_start: string;
  date_end: string;
  website: string;
};

export interface ISponsorsCard extends TSponsor {}

export interface ISponsorsHeader {
  isUsedInAdminPage?: boolean;
}

export interface ISponsorsList {
  filter?: TTableFilter;
}
