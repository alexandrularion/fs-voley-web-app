import { combineComponents } from './ContextCombiner';
import { SponsorsProvider } from './ContextSponsors';
import { TabProvider } from './ContextTab';
import { UsersProvider } from './ContextUsers';

const providers = [TabProvider, SponsorsProvider, UsersProvider];

export const AppContextProvider = combineComponents(...providers);
