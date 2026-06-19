"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRouter } from "@/i18n/routing";
import {
  useRegister,
  useRequestOTP,
  useVerifyUser,
} from "@/features/auth/hooks/auth-mutations";
import type { ClientPortalUser } from "@/features/auth/types";
import type { RegisterFormValues } from "./auth.types";
import {
  buildRegisterVariables,
  buildVerifyVariables,
  getIdentifier,
  getRegisterIdentifier,
} from "./auth.utils";
import { getRegisterFormSchema } from "./auth.schema";

export const useRegisterForm = () => {
  const t = useTranslations("Auth");
  const router = useRouter();
  const locale = useLocale();
  const [registeredUser, setRegisteredUser] = useState<ClientPortalUser | null>(
    null,
  );
  const [code, setCode] = useState("");
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(getRegisterFormSchema(locale)),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
  });
  const { register, loading } = useRegister();
  const { requestOTP, loading: requestingOTP } = useRequestOTP();
  const { verifyUser, loading: verifyingUser } = useVerifyUser();
  const identifier = getIdentifier(registeredUser);

  function onSubmit(values: RegisterFormValues) {
    register({
      variables: buildRegisterVariables(values, locale),
      onCompleted(data) {
        const user = data?.clientPortalUserRegister;
        const otpIdentifier = getRegisterIdentifier(values, user, locale);
        setRegisteredUser(user);

        requestOTP({
          variables: { identifier: otpIdentifier },
        });

        toast.success(t("registrationSuccess"), {
          description: t("enterVerificationCode"),
        });
      },
    });
  }

  function onVerify() {
    if (!registeredUser || !identifier) return;

    verifyUser({
      variables: buildVerifyVariables(registeredUser, code),
      onCompleted(data) {
        if (data?.clientPortalUserVerify) {
          toast.success(t("verified"), {
            description: t("verificationSuccessText"),
          });
          router.push("/login");
        }
      },
    });
  }

  function onResendCode() {
    if (!identifier) return;

    requestOTP({
      variables: { identifier },
      onCompleted() {
        toast.success(t("codeSentAgain"));
      },
    });
  }

  return {
    code,
    form,
    identifier,
    locale,
    loading,
    registeredUser,
    requestingOTP,
    verifyingUser,
    onResendCode,
    onSubmit,
    onVerify,
    setCode,
  };
};
