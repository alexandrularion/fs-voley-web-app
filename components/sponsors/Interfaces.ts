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
  setTab: React.Dispatch<React.SetStateAction<number>>;
  tab: number;
}

export interface ISponsorsList {
  sponsors: TSponsor[];
}
