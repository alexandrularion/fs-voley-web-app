import React from 'react';
import { IModal } from '../shared/Interfaces';

export type TTeamPlayer = {
  id?: number;
  image: string;
  name: string;
  surName: string;
  position: string;
  edition?: {
    title: string;
    id: string;
  };
  height: number;
  birthday: string;
  nationality: string;
  shirtNumber: number;
  description: string;
  createdAt?: string;
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
  shirtNumber: number;
  createdAt?: string;
  image: string;
};

export type TTeamCategory = {
  id: number;
  title: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TSearchTeam = { query?: string; editionId?: string; categoryId?: string };

export interface ITeamHeader {
  setSearch: React.Dispatch<React.SetStateAction<TSearchTeam>>;
  isUsedOnCoachPage?: boolean;
  isUsedInAdminPage?: boolean;
  isUsedInCategoryPage?: boolean;
}

export interface ITeamCard extends TTeamPlayer {}

export interface ITeamPlayersPage {
  data: TTeamPlayer[];
}

export interface ITeamCategoriesPage {
  data: TTeamCategory[];
}

export interface ITeamPlayerDModal extends IModal {
  description: string;
}
