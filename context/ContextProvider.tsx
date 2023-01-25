import { combineComponents } from './ContextCombiner';
import { TabProvider } from './ContextTab';

const providers = [TabProvider];

export const AppContextProvider = combineComponents(...providers);
