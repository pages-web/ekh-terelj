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
      __typename
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

const queries = { payments, invoiceDetail };
export default queries;
