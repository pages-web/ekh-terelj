import { IAttachment, IProduct } from "./products";

export interface ICmsCustomPostType {
  _id: string;
  code: string;
  label: string;
}

export interface ICmsPostCategory {
  _id: string;
  name: string;
}

export interface ICmsPostTag {
  _id: string;
  name: string;
}

export interface ICustomField {
  field: string;
  value: string;
}

export interface ICmsPost {
  _id: string;
  type: string;
  customPostType: ICmsCustomPostType;
  categoryIds: string[];
  categories: ICmsPostCategory;
  featured: boolean;
  status: string;
  tagIds: string[];
  tags: ICmsPostTag;
  thumbnail: IAttachment;
  images: IAttachment[];
  title: string;
  content: string;
  slug: string;
  excerpt: string;
  customFieldsData: ICustomField[];
}

export interface ICustomCmsPost extends ICmsPost {
  customFieldsData: (ICustomField & ICmsCustomFieldGroup)[];
}

export interface ICmsCustomField {
  _id: string;
  code: string;
  text: string;
  type: string;
  validation: string;
  order: number;
  options: string[];
  optionsValues: string[];
}

export interface ICmsCustomFieldGroup {
  _id: string;
  clientPortalId: string;
  code: string;
  label: string;
  parentId: string;
  customPostTypes: ICmsCustomPostType[];
  fields: ICmsCustomField[];
}
