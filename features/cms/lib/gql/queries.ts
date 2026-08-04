import { gql } from "@apollo/client";

const CpCmsPosts = gql`
  query CpPostList(
    $type: String
    $featured: Boolean
    $categoryIds: [String]
    $searchValue: String
    $status: PostStatus
    $tagIds: [String]
    $sortField: String
    $sortDirection: String
    $language: String
  ) {
    cpPostList(
      featured: $featured
      type: $type
      categoryIds: $categoryIds
      searchValue: $searchValue
      status: $status
      tagIds: $tagIds
      sortField: $sortField
      sortDirection: $sortDirection
      language: $language
    ) {
      totalCount
      posts {
        _id
        title
        content
        excerpt
        featured
        status
        createdAt
        updatedAt
        customFieldsData
        customFieldsMap
        videoUrl
        thumbnail {
          name
          url
        }
        categories {
          _id
          name
          slug
        }
        images {
          url
          type
          name
        }
      }
    }
  }
`;

const postDetail = gql`
  query cpPost($id: String, $slug: String, $language: String) {
    cpPost(_id: $id, slug: $slug, language: $language) {
      _id
      title
      content
      excerpt
      featured
      status
      createdAt
      updatedAt
      customFieldsData
      customFieldsMap
      slug
      thumbnail {
        name
        url
      }
      categories {
        _id
        name
        slug
      }
      images {
        url
        type
        name
      }
    }
  }
`;

const pageDetail = gql`
  query CpCmsPageDetail($id: String, $slug: String, $language: String) {
    cpCmsPageDetail(_id: $id, slug: $slug, language: $language) {
      _id
      clientPortalId
      name
      parentId
      description
      coverImage
      type
      slug
      content
      status
      createdUserId
      createdAt
      updatedAt
      customFieldsData
      customFieldsMap
      thumbnail {
        url
      }
      pageImages {
        url
      }
      video {
        url
      }
      videoUrl
      translations {
        _id
        objectId
        language
        title
        content
        excerpt
        customFieldsData
        type
      }
    }
  }
`;

const categories = gql`
  query CpCmsCategoryDetail($id: String, $slug: String, $language: String) {
    cpCmsCategoryDetail(_id: $id, slug: $slug, language: $language) {
      _id
      name
      slug
      description
      parentId
      status
      createdAt
      updatedAt
      customFieldsData
      customFieldsMap
    }
  }
`;

const queries = {
  CpCmsPosts,
  categories,
  pageDetail,
  postDetail,
};
export default queries;
