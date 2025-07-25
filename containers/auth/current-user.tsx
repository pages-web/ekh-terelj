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
        <Menubar className="border-none shadow-none" asChild>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer">
              <Avatar asChild>
                <div>
                  <AvatarImage src={avatar} alt={currentUser.firstName} />
                  <AvatarFallback className="text-primary-foreground">
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

              <MenubarSeparator />

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
      className="text-white/90 hover:text-white transition-all duration-300 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700"
      asChild
    >
      <Link href="/login">
        <UserIcon className="h-5 w-5" />
      </Link>
    </Button>
  );
};

export default CurrentUser;
