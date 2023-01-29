import React from 'react';

export type TTeamPlayer = {
  id?: number;
  name: string;
  surName: string;
  position: string;
  edition?: {
    title: string;
    id: string;
  };
  description: string;
  height: number;
  birthday: string;
  nationality: string;
  shirtNumber: number;
  image: string;
  key?: string;
};

export type TBETeamPlayer = {
  id: number;
  first_name: string;
  last_name: string;
  description: string;
  height: number;
  position: string;
  birthday: string;
  nationality: string;
  image: string;
};

export type TSearchTeam = { query?: string; editionId?: string; categoryId?: string };

export interface ITeamHeader {
  setSearch: React.Dispatch<React.SetStateAction<TSearchTeam>>;
  isUsedOnCoachPage?: boolean;
}

export interface ITeamCard extends TTeamPlayer {}

export interface ITeamList {
  players: TTeamPlayer[];
}

export interface ITeamPlayersPage {
  data: TTeamPlayer[];
}
