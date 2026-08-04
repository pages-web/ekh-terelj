import { gql } from "@apollo/client";

const deals = gql`
  query CpDeals($customerIds: [String]) {
  cpDeals(customerIds: $customerIds) {
    list {
      _id
      name
      order
      createdAt
      hasNotified
      assignedUserIds
      labelIds
      startDate
      closeDate
      description
      modifiedAt
      modifiedBy
      reminderMinute
      isComplete
      stageId
      boardId
      priority
      status
   
      userId
      tagIds
      relations

      pipelineId
  
      propertiesData
      score
   
      number
      stageChangedDate
      customProperties
      unUsedAmount
      amount
  
      productsData
      mobileAmount
      mobileAmounts
      paymentsData
      extraData
      cursor
    }
      totalCount
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
  deals,
  salesPipelineLabels,
  stages,
  dealFullDetail,
  tags,
};
export default queries;
