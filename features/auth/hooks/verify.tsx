import { useMutation } from "@apollo/client";
import mutations from "@/features/auth/lib/gql/mutations";
import { toast } from "sonner";
import { onError } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";

export const useConfirmInvitation = () => {
  const t = useTranslations("Auth");
  const [confirmInvitation, { loading }] = useMutation(mutations.confirmInvitation, {
    onCompleted: (data) => {
      if (data?.clientPortalConfirmInvitation) {
        toast.success(t("verificationSuccess"));
        return data.clientPortalConfirmInvitation;
      } else {
        toast.error(t("verificationError"));
        return false;
      }
    },
    onError: (error) => {
      console.error(t("verificationError"), error);
      toast.error(t("verificationError"));
      onError(error);
    },
  });

  return { confirmInvitation, loading };
};
