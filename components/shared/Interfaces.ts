import { FormApi } from 'final-form';
import { Column } from 'react-table';

export type IUrl = {
  title: string;
  url: string;
  key?: string;
};

export interface ILayout {
  children: any;
  bgColor?: string;
  isUsedOnOverlay?: boolean;
  seoHeadProps?: ISEOHead;
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
  isFooterVisible?: boolean;
  className?: string;
}

export interface IModal {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}
export interface IDeleteModal extends IModal {
  onDeleteHandler: (entityId: number) => void;
  description: string;
  entityId: number;
  isLoading?: boolean;
}

export interface IImageModal extends IModal {
  image: string;
  createdAt: string;
}

export interface IEmptyState {
  title?: string;
  description?: string;
}

export interface IFormModal extends IModal {
  onSubmitHandler: (values: object, form: FormApi) => void;
  initialValues?: any;
  isLoading?: boolean;
}

export type TDisplayData = {
  title: string;
  description: string;
  key: string;
};

export interface INavigation {
  isUsedOnOverlay?: boolean;
}

export interface ISEOHead {
  metaTitle: string;
  metaDescription: string;
  metaImage?: string;
  metaURL?: string;
}
