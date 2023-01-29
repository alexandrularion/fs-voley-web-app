import { useContext, useState, createContext, Dispatch, SetStateAction } from 'react';
import { TTeamCategory } from '../components/team/Interfaces';
import { ICommonCtx } from './Interfaces';

const ContextTeamCategory = createContext<{ teamCategories: TTeamCategory[]; setTeamCategories: Dispatch<SetStateAction<TTeamCategory[]>> }>({
  teamCategories: [],
  setTeamCategories: () => () => [],
});

export const TeamCategoriesProvider: React.FC<ICommonCtx> = ({ children }) => {
  const [teamCategories, setTeamCategories] = useState<TTeamCategory[]>([]);
  const value = { teamCategories, setTeamCategories };

  return <ContextTeamCategory.Provider {...{ value }}>{children}</ContextTeamCategory.Provider>;
};

export const useTeamCategories = () => {
  const context = useContext(ContextTeamCategory);
  if (context === undefined) {
    throw new Error('useTeamCategory must be used within a TeamCategoriesProvider');
  }
  return context;
};
