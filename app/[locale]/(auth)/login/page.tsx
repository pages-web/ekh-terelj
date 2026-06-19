import { Button } from "@/components/ui/button";
// import FacebookLogin from "@/containers/auth/facebook-login";
// import GoogleLogin from "@/containers/auth/google-login";
import { Link } from "@/i18n/routing";
import { Suspense } from "react";
import LoginForm from "@/containers/auth/login-form";
import { Lock } from "lucide-react";
import { getTranslations } from "next-intl/server";

const Login = async () => {
  const t = await getTranslations("Auth");
  const tCommon = await getTranslations("Common");

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-primary rounded-xl flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-primary dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {t("welcomeBackShort")}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t("memberAccount")}
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl p-8 shadow-2xl shadow-blue-500/10 dark:shadow-purple-500/10">
          <Suspense
            fallback={
              <div className="animate-pulse space-y-6">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                </div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("noAccount")}{" "}
            <Button
              variant="link"
              className="font-semibold p-0 h-auto text-sm bg-primary bg-clip-text text-transparent hover:from-slate-900 hover:to-slate-800"
              asChild
            >
              <Link href="/signup">{tCommon("signup")}</Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
