import { Button } from "@/components/ui/button";
import ForgotForm from "@/containers/auth/forgot-form";
import { Link } from "@/i18n/routing";
import { Suspense } from "react";

const Forgot = () => {
  return (
    <>
      <div className="text-lg md:text-2xl font-semibold mx-auto relative md:mt-20">
        Recover password
      </div>
      <div className="mb-auto mx-auto mt-4 md:mt-8 w-full sm:max-w-md">
        <div className="md:border md:rounded-xl w-full sm:py-10 px-3 sm:px-10 space-y-5 bg-background">
          <Suspense>
            <ForgotForm />
          </Suspense>
        </div>
      </div>
      <div className="mt-8 text-center text-sm relative md:mb-20">
        <Button variant="link" className="text-sm" asChild>
          <Link href="/login">Login?</Link>
        </Button>
      </div>
    </>
  );
};

export default Forgot;
