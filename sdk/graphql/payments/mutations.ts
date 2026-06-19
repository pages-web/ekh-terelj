import { gql } from "@apollo/client";

const invoiceCreate = gql`
  mutation InvoiceCreate($input: InvoiceInput!) {
    invoiceCreate(input: $input) {
      _id
      invoiceNumber
      amount
      remainingAmount
      phone
      email
      description
      status
      data
      contentTypeId
      transactions {
        _id
        paymentId
        paymentKind
        status
        details
        response
      }
    }
  }
`;

const transactionsAdd = gql`
  mutation TransactionsAdd($input: PaymentTransactionInput!) {
    paymentTransactionsAdd(input: $input) {
      _id
      amount
      invoiceId
      paymentId
      paymentKind
      status
      response
      details
    }
  }
`;

const checkInvoice = gql`
  mutation CpInvoicesCheck($id: String!) {
    cpInvoicesCheck(_id: $id)
  }
`;

const mutations = { invoiceCreate, transactionsAdd, checkInvoice };
export default mutations;
