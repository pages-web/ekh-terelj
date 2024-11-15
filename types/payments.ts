export interface IPayment {
  _id: string;
  name: string;
  kind: string;
}

export interface IInvoice {
  _id: string;
  invoiceNumber: string;
  amount: number;
  remainingAmount: number;
  phone: string;
  email: string;
  description: string;
  status: string;
  contentType: string;
  contentTypeId: string;
  data: string;
  transactions: ITransaction[];
}

export interface ITransaction {
  _id: string;
  invoiceId: string;
  paymentId: string;
  paymentKind: string;
  amount: number;
  status: string;
  details: any;
  response: any;
}
