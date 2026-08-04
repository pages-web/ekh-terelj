import { gql } from "@apollo/client";

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

const queries = { extras };
export default queries;
