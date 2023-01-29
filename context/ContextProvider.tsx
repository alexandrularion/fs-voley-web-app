import { combineComponents } from './ContextCombiner';
import { SponsorsProvider } from './ContextSponsors';
import { TabProvider } from './ContextTab';
import { TeamPlayersProvider } from './ContextTeamPlayers';
import { UsersProvider } from './ContextUsers';

const providers = [TabProvider, SponsorsProvider, UsersProvider, TeamPlayersProvider];

export const AppContextProvider = combineComponents(...providers);
