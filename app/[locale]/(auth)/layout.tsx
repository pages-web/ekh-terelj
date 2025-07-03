import Redirector from "@/containers/auth/redirector";
import { Suspense } from "react";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex flex-col justify-center py-12 flex-auto sm:px-6 lg:px-8 w-full md:bg-dot-black/20 relative">
      {children}
      <Suspense>
        <Redirector />
      </Suspense>
    </div>
  );
};

export default AuthLayout;
