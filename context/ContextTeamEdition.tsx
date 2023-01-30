import { useContext, useState, createContext, Dispatch, SetStateAction } from 'react';
import { TTeamEdition } from '../components/team/Interfaces';
import { ICommonCtx } from './Interfaces';

const ContextTeamEdition = createContext<{ teamEditions: TTeamEdition[]; setTeamEditions: Dispatch<SetStateAction<TTeamEdition[]>> }>({
  teamEditions: [],
  setTeamEditions: () => () => [],
});

export const TeamEditionsProvider: React.FC<ICommonCtx> = ({ children }) => {
  const [teamEditions, setTeamEditions] = useState<TTeamEdition[]>([]);
  const value = { teamEditions, setTeamEditions };

  return <ContextTeamEdition.Provider {...{ value }}>{children}</ContextTeamEdition.Provider>;
};

export const useTeamEditions = () => {
  const context = useContext(ContextTeamEdition);
  if (context === undefined) {
    throw new Error('useTeamEditions must be used within a TeamEditionsProvider');
  }
  return context;
};
