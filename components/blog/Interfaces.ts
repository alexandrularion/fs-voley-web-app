export type TBlogTag = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  key?: string;
};

export type TBlogImage = {
  id: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  key?: string;
};

export type TBlogArticle = {
  id: number;
  title: string;
  image: string;
  images: TBlogImage[];
  tags?: TBlogTag[];
  content: string;
  createdAt: string;
  updatedAt: string;
  key?: string;
};

export interface IBlogCard {
  id:number;
  title: string;
  image: string;
  tags: TBlogTag[];
  createdAt: string;
}

export interface IBlogHeader {
  isUsedInAdminPage?: boolean;
}

export interface IBlogPage {
  data: TBlogArticle[];
}

export interface IBlogArticlePage {
  data: TBlogArticle;
}