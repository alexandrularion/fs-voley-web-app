import { useContext, useState, createContext, Dispatch, SetStateAction } from 'react';
import { ITab } from '../components/shared/Interfaces';
import { ICommonCtx } from './Interfaces';

const TabContext = createContext<{ tab: ITab | undefined; setTab: Dispatch<SetStateAction<ITab | undefined>> }>({
  tab: undefined,
  setTab: () => () => null,
});

export const TabProvider: React.FC<ICommonCtx> = ({ children }) => {
  const [tab, setTab] = useState<ITab>();
  const value = { tab, setTab };

  return <TabContext.Provider {...{ value }}>{children}</TabContext.Provider>;
};

export const useTab = () => {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error('useRunningMode must be used within a TabProvider');
  }
  return context;
};
