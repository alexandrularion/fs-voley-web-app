import { useContext, useState, createContext, Dispatch, SetStateAction } from 'react';
import { TTeamCoach } from '../components/team/Interfaces';
import { ICommonCtx } from './Interfaces';

const ContextTeamCoach = createContext<{ teamCoaches: TTeamCoach[]; setTeamCoaches: Dispatch<SetStateAction<TTeamCoach[]>> }>({
  teamCoaches: [],
  setTeamCoaches: () => () => [],
});

export const TeamCoachesProvider: React.FC<ICommonCtx> = ({ children }) => {
  const [teamCoaches, setTeamCoaches] = useState<TTeamCoach[]>([]);
  const value = { teamCoaches, setTeamCoaches };

  return <ContextTeamCoach.Provider {...{ value }}>{children}</ContextTeamCoach.Provider>;
};

export const useTeamCoaches = () => {
  const context = useContext(ContextTeamCoach);
  if (context === undefined) {
    throw new Error('useTeamCoaches must be used within a TeamCoachesProvider');
  }
  return context;
};
