export type TSearchMatches = {
  championship?: string;
  edition?: string;
};
export interface IMatchesHeader {
  setSearch?: React.Dispatch<React.SetStateAction<TSearchMatches>>;
  areFiltrablesVisible?: boolean;
  isUsedInAdminPage?: boolean;
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
