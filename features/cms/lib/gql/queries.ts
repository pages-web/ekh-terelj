import { gql } from "@apollo/client";

const CmsPosts = gql`
  query PostList(
    $clientPortalId: String!
    $type: String
    $featured: Boolean
    $categoryIds: [String]
    $searchValue: String
    $status: PostStatus
    $page: Int
    $perPage: Int
    $tagIds: [String]
    $sortField: String
    $sortDirection: String
  ) {
    cmsPostList(
      clientPortalId: $clientPortalId
      featured: $featured
      type: $type
      categoryIds: $categoryIds
      searchValue: $searchValue
      status: $status
      page: $page
      perPage: $perPage
      tagIds: $tagIds
      sortField: $sortField
      sortDirection: $sortDirection
    ) {
      currentPage
      totalCount
      totalPages
      posts {
        _id
        type
        customPostType {
          _id
          code
          label
        }
        categoryIds
        categories {
          _id
          name
          slug
        }
        author {
          ... on User {
            _id
            username
            email
            details {
              fullName
              shortName
              avatar
              firstName
              lastName
              middleName
              __typename
            }
            __typename
          }
          ... on ClientPortalUser {
            _id
            fullName
            firstName
            lastName
            email
            username
            customer {
              avatar
              __typename
            }
            __typename
          }
          __typename
        }
        featured
        status
        tagIds
        tags {
          _id
          name
        }
        thumbnail {
          name
          url
        }
        images {
          url
          name
        }
        title
        content
        slug
        excerpt
        customFieldsData
        customFieldsMap
      }
    }
  }
`;

const CmsPostDetail = gql`
  query Post($id: String) {
    cmsPost(_id: $id) {
      _id
      type
      clientPortalId
      title
      slug
      content
      excerpt
      categoryIds
      status
      tagIds
      authorId
      featured
      featuredDate
      scheduledDate
      autoArchiveDate
      reactions
      reactionCounts
      thumbnail {
        url
        type
        name
      }
      images {
        url
        type
        name
      }
      video {
        url
        type
        name
      }
      audio {
        url
        type
        name
      }
      documents {
        url
        type
        name
      }
      attachments {
        url
        type
        name
      }
      pdfAttachment {
        pages {
          url
          name
          type
          size
          duration
        }
      }
      videoUrl
      createdAt
      updatedAt
      authorKind
      author {
        ... on User {
          _id
          username
          email
          details {
            fullName
            shortName
            avatar
            firstName
            lastName
            middleName
          }
        }
        ... on ClientPortalUser {
          _id
          fullName
          firstName
          lastName
          email
          username
          customer {
            avatar
          }
        }
      }
      categories {
        _id
        name
        slug
      }
      tags {
        _id
        name
      }
      customFieldsData
      customFieldsMap
    }
  }
`;

const CmsTags = gql`
  query CmsTags(
    $clientPortalId: String!
    $searchValue: String
    $page: Int
    $perPage: Int
    $sortField: String
    $sortDirection: String
  ) {
    cpTags(
      clientPortalId: $clientPortalId
      searchValue: $searchValue
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortDirection: $sortDirection
    ) {
      _id
      clientPortalId
      name
      slug
      colorCode
      createdAt
      updatedAt
    }
  }
`;

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

const CpPages = gql`
  query CpPages($language: String) {
    cpPages(language: $language) {
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
  CmsPosts,
  CmsPostDetail,
  CmsTags,
  CpCmsPosts,
  CpPages,
  categories,
  pageDetail,
  postDetail,
};
export default queries;
