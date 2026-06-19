import { gql } from "@apollo/client";

const rooms = gql`
  query rooms(
    $pipelineId: String
    $boardId: String
    $categoryIds: [String]
    $perPage: Int
    $page: Int
  ) {
    cpProducts(
      pipelineId: $pipelineId
      boardId: $boardId
      categoryIds: $categoryIds
      perPage: $perPage
      page: $page
    ) {
      _id
      name
      type
      code
      status
      unitPrice
      categoryId
      category {
        _id
        code
        name
        order
        description
      }
      uom
      description
      attachment {
        url
        name
        size
        type
      }
      attachmentMore {
        url
        name
        size
        type
      }
    }
  }
`;

const roomCategories = gql`
  query roomCategories($parentId: String) {
    cpProductCategories(parentId: $parentId) {
      _id
      code
      name
      order
      description
      attachment {
        url
      }
    }
  }
`;

const checkRooms = gql`
  query CpPmsCheckRooms(
    $skipStageIds: [String]
    $pipelineId: String!
    $endDate: Date
    $startDate: Date
    $ids: [String]
  ) {
    cpPmsCheckRooms(
      skipStageIds: $skipStageIds
      pipelineId: $pipelineId
      endDate: $endDate
      startDate: $startDate
      ids: $ids
    ) {
      _id
      name
      shortName
      type
      code
      status
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
      description
      barcodes
      variants
      barcodeDescription
      hasSimilarity
      cursor
      inventories
      discounts
      remainder
      discount
    }
  }
`;

const queries = { rooms, roomCategories, checkRooms };
export default queries;
