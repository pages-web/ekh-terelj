import { gql } from "@apollo/client";

const paymentsPublic = gql`
  query CpPayments($status: String, $kind: String) {
    cpPayments(status: $status, kind: $kind) {
      _id
      name
      kind
      status
      sendEmailOnPayment
    }
  }
`;

const invoiceDetail = gql`
  query InvoiceDetail($id: String!) {
    invoiceDetail(_id: $id) {
      _id
      invoiceNumber
      amount
      remainingAmount
      phone
      email
      description
      status
      contentType
      contentTypeId
      createdAt
      resolvedAt
      redirectUri
      paymentIds
      data
    }
  }
`;

const invoiceIdByDealId = gql`
  query CpInvoices($contentType: String, $contentTypeId: String) {
    cpInvoices(contentType: $contentType, contentTypeId: $contentTypeId) {
      list {
        _id
      }
    }
  }
`;

const queries = { invoiceDetail, paymentsPublic, invoiceIdByDealId };
export default queries;
