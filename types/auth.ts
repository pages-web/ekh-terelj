export type CustomerType = "" | "user" | "company";

export interface Customer {
  _id: string;
  firstName?: string;
  lastName?: string;
  erxesCustomerId?: string;
  phone?: string;
  email?: string;
  password?: string;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  avatar?: string;
}

export type ClientPortalUser = {
  _id?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  isVerified?: boolean;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
};

export type ClientPortalLoginResponse =
  | string
  | {
      token?: string;
      refetchToken?: string;
    };
