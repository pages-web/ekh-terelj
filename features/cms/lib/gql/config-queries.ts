import { gql } from "@apollo/client";

const PmsBranchDetail = gql`
  query CpPmsBranchDetail($id: String!) {
    cpPmsBranchDetail(_id: $id) {
      _id
      createdAt
      userId
      user {
        _id
        isOwner
        details {
          fullName
          avatar
        }
      }
      name
      description
      user1Ids
      user2Ids
      user3Ids
      user4Ids
      user5Ids
      paymentIds
      paymentTypes
      departmentId
      token
      erxesAppToken
      permissionConfig
      uiOptions
      pipelineConfig
      extraProductCategories
      roomCategories
      time
      discount
      checkintime
      checkouttime
      checkinamount
      checkoutamount
    }
  }
`;

const queries = { PmsBranchDetail };
export default queries;
