import { BlogArticleProvider } from './ContextBlogArticle';
import { ChampionshipsProvider } from './ContextChampionship';
import { ClubsProvider } from './ContextClub';
import { combineComponents } from './ContextCombiner';
import { HistoriesProvider } from './ContextHistory';
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
  HistoriesProvider,
  BlogArticleProvider,
];

export const AppContextProvider = combineComponents(...providers);
