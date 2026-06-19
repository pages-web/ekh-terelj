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

const getCode = gql`
  mutation sendVerificationCode($phone: String!) {
    sendVerificationCode(phone: $phone)
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

const changePhone = gql`
  mutation changePhone($_id: String!, $phone: String) {
    clientPortalUsersEdit(_id: $_id, phone: $phone) {
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

const posChooseConfig = gql`
  mutation PosChooseConfig($token: String!) {
    posChooseConfig(token: $token)
  }
`;

const fbLogin = gql`
  mutation ClientPortalFacebookAuthentication(
    $clientPortalId: String!
    $accessToken: String!
  ) {
    clientPortalFacebookAuthentication(
      clientPortalId: $clientPortalId
      accessToken: $accessToken
    )
  }
`;

const googleLogin = gql`
  mutation ClientPortalGoogleAuthentication(
    $clientPortalId: String!
    $code: String!
  ) {
    clientPortalGoogleAuthentication(
      clientPortalId: $clientPortalId
      code: $code
    )
  }
`;

const socialPayLogin = gql`
  mutation clientPortalLoginWithSocialPay(
    $clientPortalId: String!
    $token: String!
  ) {
    clientPortalLoginWithSocialPay(
      clientPortalId: $clientPortalId
      token: $token
    )
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
  getCode,
  userEdit,
  resetPassword,
  userChangePassword,
  forgotPassword,
  userVerify,
  posChooseConfig,
  fbLogin,
  googleLogin,
  changePhone,
  socialPayLogin,
  confirmInvitation,
};

export default mutations;
