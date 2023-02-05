export type THistory = {
  id: number;
  title: string;
  image: string;
  aligned: 'left' | 'center' | 'right';
  description: string;
  createdAt: string;
  updatedAt: string;
  order: number;
  key?: string;
};

export interface IHistoryPage {
  data: THistory[];
}

export interface IHistoryOverview {
  data: THistory;
}
