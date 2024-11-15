"use client";
import {
  LockIcon,
  MailIcon,
  PhoneIcon,
  Smartphone,
  User2Icon,
  type LucideIcon,
} from "lucide-react";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "@/store/auth";
import { useUserDetail } from "@/sdk/queries/auth";

const ProfileTabTrigger = ({
  value,
  children,
  Icon,
  description,
}: React.PropsWithChildren & {
  value: string;
  description: string;
  Icon: LucideIcon;
}) => {
  return (
    <TabsTrigger
      value={value}
      className="flex-1 h-full py-3 px-4 justify-start items-start gap-3 border text-foreground data-[state=active]:text-black data-[state=active]:bg-muted data-[state=active]:border-transparent transition-colors min-w-48"
    >
      <Icon className="h-6 w-6 mt-1" strokeWidth={1.5} />
      <div className="text-left">
        {children}
        <div className="text-xs opacity-70 mt-0.5">{description}</div>
      </div>
    </TabsTrigger>
  );
};

const ProfileTabsList = () => {
  const { firstName, isEmailVerified, isPhoneVerified } =
    useAtomValue(currentUserAtom) || {};
  const { loading } = useUserDetail();

  return (
    <TabsList className="flex w-full h-18 p-0 gap-3 bg-background justify-start md:justify-center overflow-auto mb-6 md:mb-4 rounded-none">
      <ProfileTabTrigger
        value="info"
        Icon={User2Icon}
        description={firstName || "-"}
      >
        Personal information
      </ProfileTabTrigger>
      <ProfileTabTrigger
        value="phone"
        Icon={Smartphone}
        description={!loading && isPhoneVerified ? "Verified" : "-"}
      >
        Phone
      </ProfileTabTrigger>
      <ProfileTabTrigger
        value="email"
        Icon={MailIcon}
        description={!loading && isEmailVerified ? "Verified" : "-"}
      >
        Email
      </ProfileTabTrigger>
      <ProfileTabTrigger value="password" Icon={LockIcon} description="Update">
        Password
      </ProfileTabTrigger>
    </TabsList>
  );
};

export default ProfileTabsList;
