import { TTeamEdition } from '../team/Interfaces';

export type TSearchMatches = {
  championship?: string;
  edition?: string;
};
export interface IMatchesHeader {
  setSearch?: React.Dispatch<React.SetStateAction<TSearchMatches>>;
  areFiltrablesVisible?: boolean;
  isUsedInAdminPage?: boolean;
  isUsedInMatchPage?: boolean;
  isUsedInChampionshipPage?: boolean;
  isUsedInClubsPage?: boolean;
}

export interface IMatchesCard extends TSearchMatches {
  match: TMatch;
  isUsedOnHomePage?: boolean;
}

export type TMatchesRanking = {
  position: number;
  club: string;
  image: string;
  points: number;
  played: number;
  wins: number;
  losings: number;
  winnedSets: number;
  losedSets: number;
  winnedPoints: number;
  losedPoints: number;
};

export type TMatch = {
  id: number;
  dateTime: string;
  link: string;
  editionId: number;
  championshipId: number;
  clubOneId: number;
  clubTwoId: number;
  createdAt: string;
  championship?: TMatchChampionship;
  edition?: TTeamEdition;
  clubFirst?: TMatchClub;
  clubSecond?: TMatchClub;
  scoreClubTwo?: number;
  scoreClubOne?: number;
  location: string;
  key?: string;
};

export type TBEMatch = {
  id: number;
  dateTime: string;
  link: string;
  editionId: number;
  championshipId: number;
  club_firstId: number;
  club_secondId: number;
  score_first: number;
  score_second: number;
  location: string;
  createdAt?: string;
};

export type TMatchChampionship = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  key?: string;
};

export type TMatchClub = {
  id: number;
  title: string;
  image: string;
  championshipId: number;
  championship?: TMatchChampionship;
  createdAt?: string;
  key?: string;
};

export interface IMatchesPage {
  data: TMatch[];
}

export interface IChampionshipsPage {
  data: TMatchChampionship[];
}

export interface IClubsPage {
  data: TMatchClub[];
}

export interface IFutureMatchesPage {
  data: TMatch[];
}

export interface IRankingMatchesPage {
  data: TMatchesRanking[];
}
