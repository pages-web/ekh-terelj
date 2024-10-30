export interface IAttachment {
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface IProduct {
  _id: string;
  name: string;
  unitPrice: number;
  categoryId: string;
  uom: string;
  attachment?: IAttachment;
  attachmentMore?: IAttachment[];
  description?: string;
  category?: ICategory;
}

export interface IUom {
  _id: string;
  name: string;
  code: string;
  isForSubscription: boolean;
}

export interface ICategory {
  _id: string;
  name: string;
  code: string;
  order: number;
  description: string;
}

export type RoomType = ICategory & { rooms: IProduct[] };
