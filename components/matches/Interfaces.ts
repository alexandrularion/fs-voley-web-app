export type TSearchMatches = {
  championship?: string;
  edition?: string;
};
export interface IMatchesHeader {
  setSearch: React.Dispatch<React.SetStateAction<TSearchMatches>>;
  areFiltrablesVisible?: boolean;
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
