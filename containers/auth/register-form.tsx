"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Password } from "@/components/ui/password";
import { Link } from "@/i18n/routing";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { LoadingIcon } from "@/components/ui/loading";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRegisterForm } from "./use-register-form";
import { useTranslations } from "next-intl";

const RegisterForm = () => {
  const t = useTranslations("Auth");
  const {
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
  } = useRegisterForm();
  const isMongolian = locale === "mn";

  if (registeredUser) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {t("verifyTitle")}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("verifyDescription", { identifier })}
          </p>
        </div>

        <div className="space-y-3">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={setCode}
            render={({ slots }) => (
              <InputOTPGroup className="w-full justify-between gap-2">
                {slots.map((slot, index) => (
                  <InputOTPSlot
                    key={index}
                    {...slot}
                    className="h-12 w-12 rounded-xl border bg-gray-50/50 text-base"
                  />
                ))}
              </InputOTPGroup>
            )}
          />
        </div>

        <Button
          type="button"
          className="w-full h-12 bg-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-base"
          disabled={verifyingUser || code.length !== 6}
          onClick={onVerify}
        >
          {verifyingUser && <LoadingIcon className="mr-2 h-5 w-5" />}
          {verifyingUser ? t("verifying") : t("verify")}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full h-12 rounded-xl"
          disabled={requestingOTP}
          onClick={onResendCode}
        >
          {requestingOTP ? t("sending") : t("resend")}
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {t("firstName")}
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder={t("firstNamePlaceholder")}
                      {...field}
                      autoComplete="given-name"
                      className="pl-12 h-12 bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-base"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {t("lastName")}
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder={t("lastNamePlaceholder")}
                      {...field}
                      autoComplete="family-name"
                      className="pl-12 h-12 bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-base"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        {isMongolian ? (
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {t("phone")}
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder={t("phonePlaceholder")}
                      {...field}
                      autoComplete="tel"
                      className="pl-12 h-12 bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-base"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {t("email")}
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder={t("emailPlaceholder")}
                      {...field}
                      autoComplete="email"
                      className="pl-12 h-12 bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 text-base"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {t("passwordRequired")}
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Password
                    {...field}
                    autoComplete="new-password"
                    containerClassName="bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus-within:ring-2 focus-within:ring-purple-500/20 focus-within:border-purple-500 transition-all duration-200"
                    className="pl-12 h-12 text-base bg-transparent border-none focus-visible:ring-0"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button
          className="w-full h-12 bg-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-base"
          disabled={loading}
        >
          {loading && <LoadingIcon className="mr-2 h-5 w-5" />}
          {loading ? t("submitting") : t("submit")}
        </Button>

        <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800/50 rounded-xl">
          <InfoIcon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          <AlertTitle className="text-sm font-semibold text-slate-800 dark:text-slate-300">
            {t("termsTitle")}
          </AlertTitle>
          <AlertDescription className="text-xs mt-1 text-slate-700 dark:text-slate-400">
            {t("termsBefore")}{" "}
            <Button
              variant="link"
              asChild
              className="h-auto px-0 py-0 text-xs underline text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300 font-medium"
            >
              <Link href="#">{t("privacy")}</Link>
            </Button>{" "}
            {t("termsJoiner")}{" "}
            <Button
              variant="link"
              asChild
              className="h-auto px-0 py-0 text-xs underline text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300 font-medium"
            >
              <Link href="#">{t("terms")}</Link>
            </Button>
            {t("termsAfter")}
          </AlertDescription>
        </Alert>
      </form>
    </Form>
  );
};

export default RegisterForm;
