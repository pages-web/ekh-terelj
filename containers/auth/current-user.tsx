"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/sdk/queries/auth";
import { UserIcon, Loader2Icon, LogOut, Briefcase, User } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useEffect } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useLogout } from "@/sdk/mutations/auth";

const CurrentUser = () => {
  const { currentUser, setLoading, loading } = useCurrentUser();
  const { logout } = useLogout();

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
      <div className="flex gap-1">
        <Menubar className="border-none shadow-none">
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer data-[state=open]:bg-white data-[state=open]:text-white focus:bg-white focus:text-white">
              <Avatar asChild>
                <div>
                  <AvatarImage src={avatar} alt={currentUser.firstName} />
                  <AvatarFallback>
                    {(firstName || "P")[0]}
                    {(lastName || "")[0]}
                  </AvatarFallback>
                </div>
              </Avatar>
            </MenubarTrigger>
            <MenubarContent>
              <Link href={"/profile"}>
                <MenubarItem className="gap-4">
                  <User className="w-5 h-5" /> Profile
                </MenubarItem>
              </Link>
              <Link href={"/profile/bookings"}>
                <MenubarItem className="gap-4">
                  <Briefcase className="w-5 h-5" /> Bookings
                </MenubarItem>
              </Link>

              <MenubarItem className="gap-4" onClick={() => logout()}>
                <LogOut className="w-5 h-5" /> Log out
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
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
