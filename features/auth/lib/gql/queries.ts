import { gql } from '@apollo/client';

const currentUser = gql`
  query clientPortalCurrentUser {
    clientPortalCurrentUser {
      _id
      firstName
      lastName
      avatar
      erxesCustomerId
      phone
      email
    }
  }
`;

const userDetail = gql`
  query UserDetail {
    clientPortalCurrentUser {
      isEmailVerified
      isPhoneVerified
    }
  }
`;

const queries = { currentUser, userDetail };

export default queries;
