import { IAttachment, IProduct, IUser } from "./products"

export interface ICmsCustomPostType {
  _id: string
  code: string
  label: string
}

export interface ICmsPostCategory {
  _id: string
  name: string
}

export interface ICmsPostTag {
  _id: string
  name: string
  slug: string
}

export interface ICmsPost {
  _id: string
  type: string
  customPostType: ICmsCustomPostType
  categoryIds: string[]
  categories: ICmsPostCategory
  featured: boolean
  status: string
  tagIds: string[]
  tags: ICmsPostTag
  thumbnail: IAttachment
  images: IAttachment[]
  title: string
  content: string
  slug: string
  excerpt: string
  customFieldsMap: any
  createdAt: string
  author: IUser
}
