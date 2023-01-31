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
  date: string;
  score?: string[];
  league: string;
  location: string;
  link: string;
  teams: { logo: string; name: string }[];
  key?: string;
}

export interface IMatchesList {
  matches: IMatchesCard[];
}

export type TMatchesRanking = {
  position: number;
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
};

export type TBEMatch = {
  id: number;
  dateTime: string;
  link: string;
  editionId: number;
  championshipId: number;
  club_firstId: number;
  club_secondId: number;
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
  createdAt: string;
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
