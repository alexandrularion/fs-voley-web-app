import { ChampionshipsProvider } from './ContextChampionship';
import { ClubsProvider } from './ContextClub';
import { combineComponents } from './ContextCombiner';
import { MatchesProvider } from './ContextMatch';
import { SponsorsProvider } from './ContextSponsors';
import { TabProvider } from './ContextTab';
import { TeamCategoriesProvider } from './ContextTeamCategory';
import { TeamCoachesProvider } from './ContextTeamCoaches';
import { TeamEditionsProvider } from './ContextTeamEdition';
import { TeamPlayersProvider } from './ContextTeamPlayers';
import { UsersProvider } from './ContextUsers';

const providers = [
  ChampionshipsProvider,
  ClubsProvider,
  MatchesProvider,
  TabProvider,
  SponsorsProvider,
  UsersProvider,
  TeamPlayersProvider,
  TeamCategoriesProvider,
  TeamEditionsProvider,
  TeamCoachesProvider,
];

export const AppContextProvider = combineComponents(...providers);
