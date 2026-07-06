import { IAttachment, IUser } from "@/features/rooms/types"

export interface ICmsCustomPostType {
  _id: string
  code: string
  label: string
}

export interface ICmsPostCategory {
  _id: string
  name: string
  slug?: string
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
  attachments?: IAttachment[]
  title: string
  content: string
  slug: string
  excerpt: string
  customFieldsMap: any
  createdAt: string
  author: IUser
}

export interface CmsAttachment {
  url?: string
  type?: string
  name?: string
}

export interface CmsTranslation {
  _id?: string
  objectId?: string
  language?: string
  title?: string
  content?: string
  excerpt?: string
  customFieldsData?: unknown
  type?: string
}

export interface CmsPost {
  _id?: string
  title?: string
  content?: string
  excerpt?: string
  featured?: boolean
  status?: string
  createdAt?: string
  updatedAt?: string
  customFieldsData?: unknown
  customFieldsMap?: unknown
  slug?: string
  videoUrl?: string
  thumbnail?: CmsAttachment
  categories?: ICmsPostCategory[]
  images?: CmsAttachment[]
  attachments?: CmsAttachment[]
}

export interface CmsPage {
  _id?: string
  clientPortalId?: string
  name?: string
  parentId?: string
  description?: string
  coverImage?: string
  type?: string
  slug?: string
  content?: string
  status?: string
  createdUserId?: string
  createdAt?: string
  updatedAt?: string
  customFieldsData?: unknown
  customFieldsMap?: unknown
  thumbnail?: CmsAttachment
  pageImages?: CmsAttachment[]
  video?: CmsAttachment
  videoUrl?: string
  translations?: CmsTranslation[]
}

export interface IPostList {
  cpPostList?: {
    totalCount?: number
    posts?: CmsPost[]
  }
}

export interface ICpPageDetail {
  cpCmsPageDetail?: CmsPage
}
