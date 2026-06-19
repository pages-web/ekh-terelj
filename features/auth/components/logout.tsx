"use client";

import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/ui/loading";
import { useLogout } from "@/features/auth/hooks/auth-mutations";

const Logout = () => {
  const { logout, loading } = useLogout();
  return (
    <Button
      className="justify-start"
      variant="link"
      disabled={loading}
      onClick={logout}
    >
      {loading && <LoadingIcon />} Log out
    </Button>
  );
};

export default Logout;
