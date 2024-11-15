import { Button } from "@/components/ui/button";
import RegisterForm from "@/containers/auth/register-form";
import { Metadata } from "next/types";
import { Link } from "@/i18n/routing";

const SignUp = () => {
  return (
    <>
      <div className="text-textlg md:text-displayxs font-semibold mx-auto relative">
        Sign Up
      </div>
      <div className="mb-auto mx-auto mt-4 md:mt-8 w-full sm:max-w-lg">
        <div className="md:border md:rounded-xl w-full sm:py-10 px-3 sm:px-10 space-y-5 bg-background">
          <RegisterForm />
        </div>
        <div className="my-4 md:my-8 text-center text-textsm relative">
          <Button variant="link" className="text-sm" asChild>
            <Link href="/login">Login?</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
