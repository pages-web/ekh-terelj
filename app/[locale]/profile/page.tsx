import ProfileEdit from "@/features/profile/components/profile-edit/profile-edit";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ProfileTabsList from "@/features/profile/components/profile-tab-trigger";
import ChangePhone from "@/features/profile/components/profile-edit/change-phone";
import ChangePassword from "@/features/profile/components/profile-edit/change-password";
import Email from "@/features/profile/components/profile-edit/email";
import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";

const Profile = async () => {
  const t = await getTranslations("Content");

  return (
    <div className="w-[80%] min-h-screen space-y-3 md:space-y-6 pt-6 md:pt-10 flex-auto items-center container">
      <h1 className="text-displaysm font-bold">{t("profile")}</h1>
      <Separator />
      <Tabs defaultValue="info" className="w-full">
        <ProfileTabsList />
        <TabsContent value="info">
          <ProfileEdit />
        </TabsContent>
        <TabsContent value="password">
          <ChangePassword />
        </TabsContent>
        <TabsContent value="phone">
          <ChangePhone />
        </TabsContent>
        <TabsContent value="email">
          <Email />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
