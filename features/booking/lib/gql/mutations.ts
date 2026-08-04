import { gql } from "@apollo/client";

const commonFields = `
  $name: String
  $paymentsData: JSON
  $productsData: JSON
  $stageId: String
  $assignedUserIds: [String]
  $startDate: Date
  $closeDate: Date
  $description: String
`;

const commonParams = `
  name: $name
  paymentsData: $paymentsData
  productsData: $productsData
  stageId: $stageId
  assignedUserIds: $assignedUserIds
  startDate: $startDate
  closeDate: $closeDate
  description: $description
`;

const dealsAdd = gql`
  mutation CpDealsAdd(${commonFields} $companyIds: [String], $customerIds: [String], $labelIds: [String], $parentId: String, $processId: String, $aboveItemId: String, $attachments: [AttachmentInput], $order: Int, $reminderMinute: Int, $isComplete: Boolean, $priority: String, $status: String, $sourceConversationIds: [String], $propertiesData: JSON, $tagIds: [String], $branchIds: [String], $departmentIds: [String], $extraData: JSON) {
    cpDealsAdd(${commonParams} companyIds: $companyIds customerIds: $customerIds labelIds: $labelIds parentId: $parentId processId: $processId aboveItemId: $aboveItemId attachments: $attachments order: $order reminderMinute: $reminderMinute isComplete: $isComplete priority: $priority status: $status sourceConversationIds: $sourceConversationIds propertiesData: $propertiesData tagIds: $tagIds branchIds: $branchIds departmentIds: $departmentIds extraData: $extraData) {
      _id
      name
    }
  }
`;

const dealsEdit = gql`
  mutation CpDealsEdit($_id: String!, ${commonFields}, $tagIds: [String]) {
    cpDealsEdit(
      _id: $_id
      tagIds: $tagIds
      ${commonParams}
    ) {
      _id
      name
    }
  }
`;

const addLabel = gql`
  mutation CpSalesPipelineLabelsAdd(
    $name: String!
    $cpSalesPipelineLabelsAddPipelineId2: String!
    $colorCode: String!
  ) {
    cpSalesPipelineLabelsAdd(
      name: $name
      pipelineId: $cpSalesPipelineLabelsAddPipelineId2
      colorCode: $colorCode
    ) {
      _id
      name
      colorCode
      pipelineId
      createdBy
      createdAt
    }
  }
`;

const addTag = gql`
  mutation tagsAdd(
    $name: String!
    $type: String!
    $colorCode: String
    $parentId: String
  ) {
    tagsAdd(
      name: $name
      type: $type
      colorCode: $colorCode
      parentId: $parentId
    ) {
      _id
      __typename
    }
  }
`;

const mutations = {
  dealsAdd,
  dealsEdit,
  addLabel,
  addTag,
};
export default mutations;
