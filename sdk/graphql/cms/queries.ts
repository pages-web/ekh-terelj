import { gql } from "@apollo/client"

const CmsPosts = gql`
  query PostList(
    $clientPortalId: String!
    $type: String
    $featured: Boolean
    $categoryId: String
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
      categoryId: $categoryId
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
`

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
`

const CmsTags = gql`
  query CmsTags(
    $clientPortalId: String!
    $searchValue: String
    $page: Int
    $perPage: Int
    $sortField: String
    $sortDirection: String
  ) {
    cmsTags(
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
`

const queries = { CmsPosts, CmsPostDetail, CmsTags }
export default queries
