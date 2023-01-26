import { combineComponents } from './ContextCombiner';
import { SponsorsProvider } from './ContextSponsors';
import { TabProvider } from './ContextTab';

const providers = [TabProvider, SponsorsProvider];

export const AppContextProvider = combineComponents(...providers);
