import { Column } from 'react-table';

export type IUrl = {
  title: string;
  url: string;
  key?: string;
};

export interface ILayout {
  children: any;
  bgColor?: string;
}

export type ITab = { tabId: number; title: string; key?: string; href?: string; value: number | string };
export interface ITabs {
  tabs: ITab[];
}

export type TTableFilter = {
  columnId: string;
  value: number | string;
};

export interface ICommonTable {
  columns: Column<object>[];
  data: object[];
  filter?: TTableFilter;
}
