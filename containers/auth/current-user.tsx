"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/sdk/queries/auth";
import { UserIcon, Loader2Icon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useEffect } from "react";

const CurrentUser = () => {
  const { currentUser, setLoading, loading } = useCurrentUser();

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      setLoading(false);
    }
  }, []);

  if (loading)
    return (
      <div className="h-9 w-9 flex items-center justify-center">
        <Loader2Icon className="h-5 w-5 animate-spin" />
      </div>
    );

  if (currentUser) {
    const { firstName, avatar, lastName } = currentUser;
    return (
      <Avatar asChild>
        <Link href="/profile">
          <AvatarImage src={avatar} alt={currentUser.firstName} />
          <AvatarFallback>
            {(firstName || "P")[0]}
            {(lastName || "")[0]}
          </AvatarFallback>
        </Link>
      </Avatar>
    );
  }

  return (
    <Button
      variant={"outline"}
      className="rounded-full text-black flex gap-2"
      asChild
    >
      <Link href="/login">
        <UserIcon className="h-5 w-5 stroke-black" />
        <span>Sign In</span>
      </Link>
    </Button>
  );
};

export default CurrentUser;
