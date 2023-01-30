import { combineComponents } from './ContextCombiner';
import { SponsorsProvider } from './ContextSponsors';
import { TabProvider } from './ContextTab';
import { TeamCategoriesProvider } from './ContextTeamCategory';
import { TeamEditionsProvider } from './ContextTeamEdition';
import { TeamPlayersProvider } from './ContextTeamPlayers';
import { UsersProvider } from './ContextUsers';

const providers = [TabProvider, SponsorsProvider, UsersProvider, TeamPlayersProvider, TeamCategoriesProvider, TeamEditionsProvider];

export const AppContextProvider = combineComponents(...providers);
