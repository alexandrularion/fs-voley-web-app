import { useContext, useState, createContext, Dispatch, SetStateAction } from 'react';
import { TSponsor } from '../components/sponsors/Interfaces';
import { ICommonCtx } from './Interfaces';

const SponsorsContext = createContext<{ sponsors: TSponsor[]; setSponsors: Dispatch<SetStateAction<TSponsor[]>> }>({
  sponsors: [],
  setSponsors: () => () => [],
});

export const SponsorsProvider: React.FC<ICommonCtx> = ({ children }) => {
  const [sponsors, setSponsors] = useState<TSponsor[]>([]);
  const value = { sponsors, setSponsors };

  return <SponsorsContext.Provider {...{ value }}>{children}</SponsorsContext.Provider>;
};

export const useSponsors = () => {
  const context = useContext(SponsorsContext);
  if (context === undefined) {
    throw new Error('useSponsors must be used within a SponsorsProvider');
  }
  return context;
};
