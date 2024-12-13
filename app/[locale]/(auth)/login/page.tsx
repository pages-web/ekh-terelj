import { Button } from "@/components/ui/button";
// import FacebookLogin from "@/containers/auth/facebook-login";
// import GoogleLogin from "@/containers/auth/google-login";
import { Link } from "@/i18n/routing";
import { Suspense } from "react";
import LoginForm from "@/containers/auth/login-form";

const Login = () => {
  return (
    <>
      <div className="text-textlg md:text-displayxs font-semibold mx-auto relative md:mt-20">
        Login
      </div>
      <div className="mb-auto mx-auto mt-4 md:mt-8 w-full sm:max-w-md">
        <div className="md:border md:rounded-xl w-full sm:py-10 px-3 sm:px-10 space-y-5 bg-background relative">
          <Suspense>
            <LoginForm />
          </Suspense>
          {/* <Separator /> */}
          {/* <div className="space-y-3">
            {process.env.NEXT_PUBLIC_FACEBOOK_ID && (
              <Suspense>
                <FacebookLogin />
              </Suspense>
            )}
            {process.env.NEXT_PUBLIC_GOOGLE_ID && (
              <Suspense>
                <GoogleLogin />
              </Suspense>
            )}
          </div> */}
        </div>
      </div>
      <div className="mt-8 text-center text-sm relative md:mb-20">
        <Button variant="link" className="text-sm" asChild>
          <Link href="/signup">Register?</Link>
        </Button>
      </div>
    </>
  );
};

export default Login;
