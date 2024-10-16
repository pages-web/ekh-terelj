import { gql } from "@apollo/client";

const deals = gql`
  query PmsRooms(
    $pipelineId: String!
    $endDate1: Date
    $endDate2: Date
    $startDate1: Date
    $startDate2: Date
  ) {
    pmsRooms(
      pipelineId: $pipelineId
      endDate1: $endDate1
      endDate2: $endDate2
      startDate1: $startDate1
      startDate2: $startDate2
    ) {
      _id
      name
      products
      stage {
        code
      }
    }
  }
`;

const dealDetail = gql`
  query DealDetail($id: String!) {
    dealDetail(_id: $id) {
      _id
      customers {
        _id
        lastName
        firstName
      }
      products
      stageId
      name
      description
      labelIds
    }
  }
`;

const dealPreview = gql`
  query DealPreview($id: String!) {
    dealDetail(_id: $id) {
      customers {
        _id
        lastName
        firstName
      }
      description
      labelIds
      paymentsData
    }
  }
`;

const dealFullDetail = gql`
  query DealFullDetail($id: String!) {
    dealDetail(_id: $id) {
      _id
      stageId
      name
      customers {
        _id
        lastName
        firstName
        primaryPhone
        primaryEmail
      }
      products
      labels {
        name
      }
      paymentsData
      amount
    }
  }
`;

const salesPipelineLabels = gql`
  query SalesPipelineLabels($pipelineId: String) {
    salesPipelineLabels(pipelineId: $pipelineId) {
      _id
      name
    }
  }
`;

const stages = gql`
  query SalesStages($pipelineId: String) {
    salesStages(pipelineId: $pipelineId) {
      _id
      code
    }
  }
`;

const paymentTypes = gql`
  query PaymentTypes($pipelineId: String!) {
    salesPipelineDetail(_id: $pipelineId) {
      paymentTypes
    }
  }
`;

const queries = {
  deals,
  salesPipelineLabels,
  stages,
  dealDetail,
  dealFullDetail,
  paymentTypes,
  dealPreview,
};
export default queries;
