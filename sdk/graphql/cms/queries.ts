import { gql } from "@apollo/client";

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
      }
    }
  }
`;

const CmsCustomFieldGroups = gql`
  query CmsCustomFieldGroups(
    $clientPortalId: String!
    $page: Int
    $perPage: Int
    $postType: String
    $pageId: String
    $categoryId: String
  ) {
    cmsCustomFieldGroups(
      clientPortalId: $clientPortalId
      page: $page
      perPage: $perPage
      postType: $postType
      pageId: $pageId
      categoryId: $categoryId
    ) {
      _id
      clientPortalId
      code
      label
      parentId
      customPostTypes {
        _id
        code
        label
      }
      fields {
        _id
        code
        text
        type
        validation
        order
        options
        optionsValues
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
    }
  }
`;

const queries = { CmsPosts, CmsCustomFieldGroups, CmsPostDetail };
export default queries;
