import type { ClientPortalUser } from "@/features/auth/types";
import type { LoginFormValues, RegisterFormValues } from "./auth.types";

export const getIdentifier = (user?: ClientPortalUser | null) =>
  user?.email || user?.phone || "";

export const buildLoginVariables = (values: LoginFormValues) => {
  const identifier = values.login.trim();
  const isEmail = identifier.includes("@");

  return {
    email: isEmail ? identifier : undefined,
    phone: isEmail ? undefined : identifier,
    password: values.password,
  };
};

export const getRegisterIdentifier = (
  values: RegisterFormValues,
  user: ClientPortalUser | null | undefined,
  locale: string,
) => {
  if (locale === "mn") return user?.phone || values.phone || "";

  return user?.email || values.email || "";
};

export const buildRegisterVariables = (
  values: RegisterFormValues,
  locale: string,
) => ({
  email: locale === "mn" ? undefined : values.email?.trim(),
  phone: locale === "mn" ? values.phone?.trim() : undefined,
  password: values.password,
  firstName: values.firstName.trim(),
  lastName: values.lastName?.trim(),
  userType: "customer",
});

export const buildVerifyVariables = (
  user: ClientPortalUser,
  code: string,
) => ({
  userId: user._id,
  email: user._id ? undefined : user.email,
  phone: user._id ? undefined : user.phone,
  code,
});
