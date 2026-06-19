"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRouter } from "@/i18n/routing";
import {
  useRegister,
  useRequestOTP,
  useVerifyUser,
} from "@/sdk/mutations/auth";
import type { ClientPortalUser } from "@/types/auth";
import type { RegisterFormValues } from "./auth.types";
import {
  buildRegisterVariables,
  buildVerifyVariables,
  getIdentifier,
  getRegisterIdentifier,
} from "./auth.utils";
import { getRegisterFormSchema } from "./auth.schema";

export const useRegisterForm = () => {
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

        if (locale === "mn") {
          toast.success("Бүртгэл амжилттай!", {
            description: "Баталгаажуулах кодоо оруулна уу.",
          });
        } else {
          toast.success("Registration successful!", {
            description: "Enter your verification code.",
          });
        }
      },
    });
  }

  function onVerify() {
    if (!registeredUser || !identifier) return;

    verifyUser({
      variables: buildVerifyVariables(registeredUser, code),
      onCompleted(data) {
        if (data?.clientPortalUserVerify) {
          if (locale === "mn") {
            toast.success("Баталгаажлаа!", {
              description: "Та одоо нэвтрэх боломжтой.",
            });
          } else {
            toast.success("Verified!", {
              description: "You can now log in.",
            });
          }
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
        toast.success(
          locale === "mn" ? "Код дахин илгээгдлээ" : "Code sent again",
        );
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
