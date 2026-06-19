import LoginButton from "@/containers/auth/login-button";
import { useTranslations } from "next-intl";

const AccountPart = () => {
  const t = useTranslations("Checkout");

  return (
    <div className="flex justify-between items-center gap-3">
      <div className="space-y-3">
        <h2 className="text-textlg text-black">{t("accountQuestion")}</h2>
        <p className="text-textmd text-black/70">
          {t("accountDescription")}
        </p>
      </div>
      <LoginButton />
    </div>
  );
};
export default AccountPart;
