export type IUrl = {
  title: string;
  url: string;
  key?: string;
};

export interface ILayout {
  children: any;
  bgColor?: string;
}

export type ITab = { tabId: number; title: string; key?: string; href?: string };
export interface ITabs {
  setTab?: React.Dispatch<React.SetStateAction<number>>;
  tab?: number;
  tabs: ITab[];
}
