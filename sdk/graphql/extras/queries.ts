import { gql } from "@apollo/client";

const uoms = gql`
  query uoms {
    uoms {
      _id
      name
      code
      isForSubscription
    }
  }
`;

const extras = gql`
  query CpProducts(
    $categoryIds: [String]
    $searchValue: String
    $tagIds: [String]
    $perPage: Int
    $page: Int
  ) {
    cpProducts(
      categoryIds: $categoryIds
      searchValue: $searchValue
      tagIds: $tagIds
      perPage: $perPage
      page: $page
    ) {
      _id
      name
      shortName
      description
      categoryId
      unitPrice
      attachment {
        url
        name
      }
      attachmentMore {
        url
        name
      }
    }
  }
`;

const categories = gql`
  query ProductCategories($parentId: String, $withChild: Boolean) {
    productCategories(parentId: $parentId, withChild: $withChild) {
      _id
      code
      name
      order
    }
  }
`;

const queries = { uoms, extras, categories };
export default queries;
