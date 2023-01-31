import { useContext, useState, createContext, Dispatch, SetStateAction } from 'react';
import { TMatchChampionship } from '../components/matches/Interfaces';
import { ICommonCtx } from './Interfaces';

const ContextChampionship = createContext<{ championships: TMatchChampionship[]; setChampionships: Dispatch<SetStateAction<TMatchChampionship[]>> }>({
  championships: [],
  setChampionships: () => () => [],
});

export const ChampionshipsProvider: React.FC<ICommonCtx> = ({ children }) => {
  const [championships, setChampionships] = useState<TMatchChampionship[]>([]);
  const value = { championships, setChampionships };

  return <ContextChampionship.Provider {...{ value }}>{children}</ContextChampionship.Provider>;
};

export const useChampionships = () => {
  const context = useContext(ContextChampionship);
  if (context === undefined) {
    throw new Error('useChampionships must be used within a ChampionshipsProvider');
  }
  return context;
};
