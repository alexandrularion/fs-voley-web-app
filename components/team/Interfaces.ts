import React from 'react';

export type TTeamPlayer = {
  name: string;
  surName: string;
  position: string;
  edition?: {
    title: string;
    id: string;
  };
  shirtNumber: number;
  image: string;
  key?: string;
};

export type TSearchTeam = { query?: string; option?: string };

export interface ITeamHeader {
  setSearch: React.Dispatch<React.SetStateAction<TSearchTeam>>;
}

export interface ITeamCard extends TTeamPlayer {}

export interface ITeamList {
  players: TTeamPlayer[];
}
