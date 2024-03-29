import React from 'react';
import { IModal } from '../shared/Interfaces';

export type TTeamPlayer = {
  id?: number;
  image: string;
  name: string;
  surName: string;
  position: string;
  height: number;
  birthday: string;
  nationality: string;
  shirtNumber: number;
  description: string;
  createdAt?: string;
  categoryId?: number;
  editionId?: number;
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
  categoryId?: number;
  editionId?: number;
  category: TTeamCategory;
  edition: TTeamEdition;
};

export type TTeamCoach = {
  id: number;
  image: string;
  name: string;
  surName: string;
  description: string;
};

export type TBETeamCoach = {
  id?: number;
  image: string;
  first_name: string;
  last_name: string;
  description: string;
};

export type TTeamCategory = {
  id: number;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  key?: string;
};

export type TTeamEdition = {
  id: number;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  key?: string;
};

export type TSearchTeam = { query?: string; editionId?: string; categoryId?: string };

export interface ITeamHeader {
  setSearch: React.Dispatch<React.SetStateAction<TSearchTeam>>;
  isUsedOnCoachPage?: boolean;
  isUsedInAdminPage?: boolean;
  isUsedInCategoryPage?: boolean;
  isUsedInEditionPage?: boolean;
}

export interface ITeamPlayersPage {
  data: TTeamPlayer[];
}

export interface ITeamCategoriesPage {
  data: TTeamCategory[];
}

export interface ICoachesPage {
  data: TTeamCoach[];
}
export interface ITeamCommonDModal extends IModal {
  description: string;
}

export interface ITeamList {
  isUsedInCoachPage?: boolean;
}

export interface IPlayerProfilePage {
  data: TTeamPlayer;
}

export interface ITeamPlayerStats {
  data: TTeamPlayer;
}
