import ProfileEdit from "@/components/profile/profile-edit/profile-edit";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ProfileTabsList from "@/components/profile/profile-tab-trigger";
import ChangePhone from "@/components/profile/profile-edit/change-phone";
import ChangePassword from "@/components/profile/profile-edit/change-password";
import Email from "@/components/profile/profile-edit/email";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  return (
    <div className="w-[80%] min-h-screen space-y-3 md:space-y-6 pt-6 md:pt-10 flex-auto items-center container">
      <h1 className="text-displaysm font-bold">Profile</h1>
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
