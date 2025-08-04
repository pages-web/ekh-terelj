import { useMutation } from "@apollo/client";
import mutations from "../graphql/auth/mutations";
import { toast } from "sonner";
import { onError } from "@/lib/utils";

export const useVerifyUser = () => {
  const [verifyUser, { loading }] = useMutation(mutations.userVerify, {
    onCompleted: (data) => {
      if (data?.clientPortalVerifyOTP) {
        toast.success("Амжилттай баталгаажлаа!");
        return true;
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

  return { verifyUser, loading };
};