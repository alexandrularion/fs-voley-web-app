import { useContext, useState, createContext, Dispatch, SetStateAction } from 'react';
import { TTeamPlayer } from '../components/team/Interfaces';
import { ICommonCtx } from './Interfaces';

const ContextTeamPlayer = createContext<{ teamPlayers: TTeamPlayer[]; setTeamPlayers: Dispatch<SetStateAction<TTeamPlayer[]>> }>({
  teamPlayers: [],
  setTeamPlayers: () => () => [],
});

export const TeamPlayersProvider: React.FC<ICommonCtx> = ({ children }) => {
  const [teamPlayers, setTeamPlayers] = useState<TTeamPlayer[]>([]);
  const value = { teamPlayers, setTeamPlayers };

  return <ContextTeamPlayer.Provider {...{ value }}>{children}</ContextTeamPlayer.Provider>;
};

export const useTeamPlayers = () => {
  const context = useContext(ContextTeamPlayer);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
