import { ICustomer } from "./customers";
import { ICategory, IProduct, RoomType } from "./products";

export interface IDeal {
  _id: string;
  name: string;
  products: IDealProduct[];
  stage: IStage;
}

export interface IPaymentData {
  [key: string]: {
    currency: string;
    amount: number;
    info?: {
      date: string;
      description?: string;
      paidBy?: string;
      room?: string;
      amount: number;
    }[];
  };
}

export interface IDealDetail extends IDeal {
  customers: ICustomer[];
  stageId: string;
  labelIds: string[];
  name: string;
  description: string;
  paymentsData: IPaymentData;
}

export interface ILabel {
  _id: string;
  name: string;
}

export interface IDealPreview {
  labels: ILabel[];
  totalAmount: number;
  paidAmount: number;
  notPaidAmount: number;
  description: string;
  paymentsData: IPaymentData;
  customers: ICustomer[];
}

export interface IFullDeal extends IDealDetail, IDealPreview {}

// Define the valid stage codes
export type StageCode =
  | "unconfirmed"
  | "today"
  | "future"
  | "inhouse"
  | "checkout"
  | "incomplete"
  | "canceled";

export interface IStage {
  _id: string;
  code: StageCode;
  name: string;
}

export interface IDealProduct {
  _id: string;
  productId: string;
  uom: string;
  quantity: number;
  startDate: Date;
  endDate: Date;
  unitPrice: number;
  product: IProduct;
  amount: number;
  information?: {
    adults: number;
    children: number;
    parentId?: string;
  };
  name: string;
}

export interface IDealProductWithCategory extends IDealProduct {
  category: ICategory;
}

export interface IStay {
  _id: string;
  name: string;
  roomId: string;
  dealId: string;
  startDate: Date;
  endDate: Date;
  stageCode: StageCode;
  roomTypes: RoomType[];
  deal: IDeal;
}

export interface ISource {
  _id: string;
  name: string;
}

export interface IStage {
  _id: string;
  code: StageCode;
  name: string;
}

export interface IPaymentType {
  _id: string;
  title: string;
  type: string;
}
