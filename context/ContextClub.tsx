import { useContext, useState, createContext, Dispatch, SetStateAction } from 'react';
import { TMatchClub } from '../components/matches/Interfaces';
import { ICommonCtx } from './Interfaces';

const ContextClubs = createContext<{ clubs: TMatchClub[]; setClubs: Dispatch<SetStateAction<TMatchClub[]>> }>({
  clubs: [],
  setClubs: () => () => [],
});

export const ClubsProvider: React.FC<ICommonCtx> = ({ children }) => {
  const [clubs, setClubs] = useState<TMatchClub[]>([]);
  const value = { clubs, setClubs };

  return <ContextClubs.Provider {...{ value }}>{children}</ContextClubs.Provider>;
};

export const useClubs = () => {
  const context = useContext(ContextClubs);
  if (context === undefined) {
    throw new Error('useClubs must be used within a ClubsProvider');
  }
  return context;
};
