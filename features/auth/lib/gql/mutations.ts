import { gql } from "@apollo/client";

const login = gql`
  mutation ClientPortalUserLoginWithCredentials(
    $email: String
    $phone: String
    $password: String
  ) {
    clientPortalUserLoginWithCredentials(
      email: $email
      phone: $phone
      password: $password
    )
  }
`;

const createUser = gql`
  mutation ClientPortalUserRegister(
    $email: String
    $phone: String
    $password: String
    $firstName: String
    $lastName: String
    $userType: CPUserType
  ) {
    clientPortalUserRegister(
      email: $email
      phone: $phone
      password: $password
      firstName: $firstName
      lastName: $lastName
      userType: $userType
    ) {
      _id
      email
      phone
      firstName
      lastName
      isVerified
      isEmailVerified
      isPhoneVerified
    }
  }
`;

const requestOTP = gql`
  mutation ClientPortalUserRequestOTP($identifier: String!) {
    clientPortalUserRequestOTP(identifier: $identifier)
  }
`;

const logout = gql`
  mutation {
    clientPortalLogout
  }
`;

const resetPassword = gql`
  mutation clientPortalResetPassword($newPassword: String!, $token: String!) {
    clientPortalResetPassword(newPassword: $newPassword, token: $token)
  }
`;

const forgotPassword = gql`
  mutation ClientPortalForgotPassword(
    $clientPortalId: String!
    $email: String
  ) {
    clientPortalForgotPassword(clientPortalId: $clientPortalId, email: $email)
  }
`;

const userEdit = gql`
  mutation clientPortalUsersEdit(
    $_id: String!
    $email: String
    $firstName: String
    $lastName: String
    $phone: String
    $type: String
    $companyName: String
    $companyRegistrationNumber: String
    $password: String
    $avatar: String
  ) {
    clientPortalUsersEdit(
      _id: $_id
      email: $email
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      type: $type
      companyName: $companyName
      companyRegistrationNumber: $companyRegistrationNumber
      password: $password

      avatar: $avatar
    ) {
      _id
    }
  }
`;

const userChangePassword = gql`
  mutation clientPortalUserChangePassword(
    $currentPassword: String!
    $newPassword: String!
  ) {
    clientPortalUserChangePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      _id
    }
  }
`;
const userVerify = gql`
  mutation ClientPortalUserVerify(
    $userId: String
    $email: String
    $phone: String
    $code: String!
  ) {
    clientPortalUserVerify(
      userId: $userId
      email: $email
      phone: $phone
      code: $code
    ) {
      _id
      email
      phone
      firstName
      lastName
      isVerified
      isEmailVerified
      isPhoneVerified
    }
  }
`;

const confirmInvitation = gql`
  mutation ClientPortalConfirmInvitation($token: String) {
    clientPortalConfirmInvitation(token: $token) {
      _id
      clientPortalId
    }
  }
`;

const mutations = {
  login,
  logout,
  createUser,
  requestOTP,
  userEdit,
  resetPassword,
  userChangePassword,
  forgotPassword,
  userVerify,
  confirmInvitation,
};

export default mutations;
