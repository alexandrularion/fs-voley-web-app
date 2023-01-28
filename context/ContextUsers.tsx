import { useContext, useState, createContext, Dispatch, SetStateAction } from 'react';
import { TUser } from '../components/users/Interfaces';
import { ICommonCtx } from './Interfaces';

const ContextUser = createContext<{ users: TUser[]; setUsers: Dispatch<SetStateAction<TUser[]>> }>({
  users: [],
  setUsers: () => () => [],
});

export const UsersProvider: React.FC<ICommonCtx> = ({ children }) => {
  const [users, setUsers] = useState<TUser[]>([]);
  const value = { users, setUsers };

  return <ContextUser.Provider {...{ value }}>{children}</ContextUser.Provider>;
};

export const useUsers = () => {
  const context = useContext(ContextUser);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
