import { FormApi } from 'final-form';
import { Column } from 'react-table';
import { TBESponsor } from '../sponsors/Interfaces';

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

export interface IModal {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}
export interface IDeleteModal extends IModal {
  onDeleteBtnClick: () => void;
  description: string;
}

export interface IEmptyState {
  title?: string;
  description?: string;
}

export interface IFormModal extends IModal {
  onSubmitHandler: (values: object, form: FormApi) => void;
  initialValues?: TBESponsor | any;
  isLoading?: boolean;
}
