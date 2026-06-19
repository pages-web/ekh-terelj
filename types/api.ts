import { ICustomer } from "./common";
import { ICategory, IProduct, RoomType } from "@/features/rooms/types";

export interface IDeal {
  _id: string;
  name: string;
  products: IProduct[];
  productsData: IDealProduct[];
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
  tagIds?: string[];
  name: string;
  description: string;
  paymentsData: IPaymentData;
  mobileAmount?: number;
  mobileAmounts?: {
    _id: string;
    amount: number;
  }[];
  pipeline?: {
    _id: string;
    name: string;
    paymentIds?: string[];
    paymentTypes?: unknown;
  };
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

export interface IFullDeal extends IDealDetail, IDealPreview {
  number: string;
}

// Define the valid stage codes
export type StageCode =
  | "unconfirmed"
  | "prepay"
  | "confirmed"
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

export interface ITag {
  _id: string;
  colorCode: string;
  name: string;
  type: string;
}

export interface IUiOptions {
  colors: {
    primary: string;
    secondary: string;
    third: string;
  };
  logo: string;
}

export interface IConfig {
  _id: string;
  name: string;
  userId: string;
  uiOptions: IUiOptions;
  token: string;
  departmentId: string;
  description: string;
  erxesAppToken: string;
  extraProductCategories: string[];
  roomCategories: string[];
  paymentIds: string[];
  pipelineConfig: {
    boardId: string;
    pipelineId: string;
  };
  user1Ids: string[];
  user2Ids: string[];
  user3Ids: string[];
  user4Ids: string[];
  user5Ids: string[];
}
