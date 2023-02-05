import { useContext, useState, createContext, Dispatch, SetStateAction } from 'react';
import { THistory } from '../components/history/Interfaces';
import { ICommonCtx } from './Interfaces';

const HistoriesContext = createContext<{ histories: THistory[]; setHistories: Dispatch<SetStateAction<THistory[]>> }>({
  histories: [],
  setHistories: () => () => [],
});

export const HistoriesProvider: React.FC<ICommonCtx> = ({ children }) => {
  const [histories, setHistories] = useState<THistory[]>([]);
  const value = { histories, setHistories };

  return <HistoriesContext.Provider {...{ value }}>{children}</HistoriesContext.Provider>;
};

export const useHistories = () => {
  const context = useContext(HistoriesContext);
  if (context === undefined) {
    throw new Error('useHistories must be used within a HistoriesProvider');
  }
  return context;
};
