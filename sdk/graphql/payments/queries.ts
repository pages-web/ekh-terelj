import { gql } from "@apollo/client";

const payments = gql`
  query Payments {
    payments {
      _id
      name
      kind
      status
      config
      createdAt
    }
  }
`;

const paymentsPublic = gql`
  query PaymentsPublic($kind: String, $ids: [String]) {
    paymentsPublic(kind: $kind, _ids: $ids) {
      _id
      kind
      name
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
  query InvoiceIdByDealId($contentType: String, $contentTypeId: String) {
    invoices(contentType: $contentType, contentTypeId: $contentTypeId) {
      _id
    }
  }
`;

const queries = { payments, invoiceDetail, paymentsPublic, invoiceIdByDealId };
export default queries;
