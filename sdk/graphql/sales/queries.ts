import { gql } from "@apollo/client";

const productFields = `
  _id
  name
  shortName
  status
  code
  type
  description
  barcodes
  variants
  barcodeDescription
  unitPrice
  categoryId
  propertiesData
  createdAt
  tagIds
  vendorId
  scopeBrandIds
  uom
  subUoms
  currency
  hasSimilarity
  inventories
  discounts
  remainder
  discount
`;

const pmsRooms = gql`
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
      stage {
        code
      }
    }
  }
`;

const deals = gql`
  query Deals(
    $initialStageId: String
    $stageId: String
    $limit: Int
    $ids: [String]
    $parentId: String
    $pipelineId: String
    $pipelineIds: [String]
    $customerIds: [String]
    $companyIds: [String]
    $productIds: [String]
    $search: String
    $startDate: String
    $endDate: String
    $sortField: String
    $sortDirection: Int
  ) {
    deals(
      initialStageId: $initialStageId
      stageId: $stageId
      limit: $limit
      _ids: $ids
      parentId: $parentId
      pipelineId: $pipelineId
      pipelineIds: $pipelineIds
      customerIds: $customerIds
      companyIds: $companyIds
      productIds: $productIds
      search: $search
      startDate: $startDate
      endDate: $endDate
      sortField: $sortField
      sortDirection: $sortDirection
    ) {
      _id
      createdAt
      products {
        ${productFields}
      }
      productsData
      stage {
        _id
        code
        name
      }
      startDate
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
      products {
        ${productFields}
      }
      productsData
      stageId
      name
      description
      labelIds
      paymentsData
      tagIds
      number
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
query CpDealByIds($_ids: [String]) {
    cpDeals(_ids: $_ids) {
      list {
        _id
        name
        number
        stageId
        description
        tagIds
        productsData
        paymentsData
        mobileAmount
        mobileAmounts
        createdAt
        modifiedAt
        startDate
        closeDate
        pipeline {
          _id
          name
          paymentIds
          paymentTypes
        }
        stage {
          _id
          name
          order
        }
        products {
          _id
          name
          code
          unitPrice
        }
        customers {
          _id
          firstName
          primaryPhone
        }
      }
      totalCount
    }
  }
`;

const salesPipelineLabels = gql`
  query SalesPipelineLabels($pipelineId: String) {
    cpSalesPipelineLabels(pipelineId: $pipelineId) {
      _id
      name
    }
  }
`;

const stages = gql`
  query CpSalesStages(
    $pipelineId: String
    $pipelineIds: [String]
    $isAll: Boolean
  ) {
    cpSalesStages(
      pipelineId: $pipelineId
      pipelineIds: $pipelineIds
      isAll: $isAll
    ) {
      _id
      name
      pipelineId
      visibility
      code
      memberIds
      canMoveMemberIds
      canEditMemberIds
      probability
      status
      formId
      age
      defaultTick
      order
      createdAt
      type
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

const tags = gql`
  query Tags(
    $type: String
    $searchValue: String
    $parentId: String
    $ids: [String]
    $excludeIds: Boolean
  ) {
    cpTags(
      type: $type
      searchValue: $searchValue
      parentId: $parentId
      ids: $ids
      excludeIds: $excludeIds
    ) {
      _id
      name
      type
      colorCode
      createdAt
      objectCount
      totalObjectCount
      parentId
      order
      relatedIds
    }
  }
`;

const queries = {
  pmsRooms,
  deals,
  salesPipelineLabels,
  stages,
  dealDetail,
  dealFullDetail,
  paymentTypes,
  dealPreview,
  tags,
};
export default queries;
