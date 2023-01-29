import { combineComponents } from './ContextCombiner';
import { SponsorsProvider } from './ContextSponsors';
import { TabProvider } from './ContextTab';
import { TeamCategoriesProvider } from './ContextTeamCategory';
import { TeamPlayersProvider } from './ContextTeamPlayers';
import { UsersProvider } from './ContextUsers';

const providers = [TabProvider, SponsorsProvider, UsersProvider, TeamPlayersProvider, TeamCategoriesProvider];

export const AppContextProvider = combineComponents(...providers);
