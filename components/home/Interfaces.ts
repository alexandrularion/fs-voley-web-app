import { TMatch, TMatchesRanking } from '../matches/Interfaces';
import { TSponsor } from '../sponsors/Interfaces';
import { TTeamPlayer } from '../team/Interfaces';

export interface IHomePage {
  data: {
    sponsors: TSponsor[];
    team: TTeamPlayer[];
    latestMatch: TMatch;
    futureMatch: TMatch;
    ranking: TMatchesRanking[];
  };
}

export interface IHomeMatches {
  latestMatch: TMatch;
  futureMatch: TMatch;
}

export interface IHomeSponsors {
  sponsors: TSponsor[];
}

export interface IHomeTeam {
  team: TTeamPlayer[];
}

export interface IHomeHero {
  ranking: TMatchesRanking[];
}
