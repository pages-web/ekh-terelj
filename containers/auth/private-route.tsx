"use client";

import { currentUserAtom, loadingUserAtom } from "@/store/auth";
import { useAtomValue } from "jotai";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { useEffect } from "react";

const PrivateRoute = ({ children }: React.PropsWithChildren) => {
  const currentUser = useAtomValue(currentUserAtom);
  const loading = useAtomValue(loadingUserAtom);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push(`/login?from=${pathname}`);
    }
  }, [loading, currentUser]);

  if (currentUser) return children;

  return (
    <div className="min-h-screen flex-auto flex justify-center items-center py-32">
      <Loader2Icon className="h-6 w-6 animate-spin" />
    </div>
  );
};

export default PrivateRoute;
