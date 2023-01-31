import { useContext, useState, createContext, Dispatch, SetStateAction } from 'react';
import { TMatch } from '../components/matches/Interfaces';
import { ICommonCtx } from './Interfaces';

const ContextMatch = createContext<{ matches: TMatch[]; setMatches: Dispatch<SetStateAction<TMatch[]>> }>({
  matches: [],
  setMatches: () => () => [],
});

export const MatchesProvider: React.FC<ICommonCtx> = ({ children }) => {
  const [matches, setMatches] = useState<TMatch[]>([]);
  const value = { matches, setMatches };

  return <ContextMatch.Provider {...{ value }}>{children}</ContextMatch.Provider>;
};

export const useMatches = () => {
  const context = useContext(ContextMatch);
  if (context === undefined) {
    throw new Error('useMatches must be used within a MatchesProvider');
  }
  return context;
};
