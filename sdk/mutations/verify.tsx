import { useMutation } from "@apollo/client";
import mutations from "../graphql/auth/mutations";
import { toast } from "sonner";
import { onError } from "@/lib/utils";

export const useConfirmInvitation = () => {
  const [confirmInvitation, { loading }] = useMutation(mutations.confirmInvitation, {
    onCompleted: (data) => {
      if (data?.clientPortalConfirmInvitation) {
        toast.success("Амжилттай баталгаажлаа!");
        return data.clientPortalConfirmInvitation;
      } else {
        toast.error("Баталгаажуулахад алдаа гарлаа");
        return false;
      }
    },
    onError: (error) => {
      console.error('Баталгаажуулах үед алдаа гарлаа:', error);
      toast.error("Баталгаажуулахад алдаа гарлаа");
      onError(error);
    },
  });

  return { confirmInvitation, loading };
};