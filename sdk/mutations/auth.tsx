import { BaseMutationOptions, useMutation } from "@apollo/client";
import { mutations } from "../graphql/auth";
import { useSetAtom } from "jotai";
import { loadingUserAtom, refetchCurrentUserAtom } from "@/store/auth";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { onError } from "@/lib/utils";
// import { fbLogout } from "@/lib/facebook";

const clientPortalId = process.env.NEXT_PUBLIC_CP_ID;

interface ILoginData {
  token?: string;
  refetchToken?: string;
}

const useLoginCallback = () => {
  const router = useRouter();
  const from = useSearchParams().get("from");
  const triggerRefetchUser = useSetAtom(refetchCurrentUserAtom);
  const setLoadingUser = useSetAtom(loadingUserAtom);

  return {
    loginCallback: (
      { token, refetchToken }: ILoginData,
      callback?: () => void
    ) => {
      if (token) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("refetchToken", refetchToken || "");
        triggerRefetchUser(true);
        setLoadingUser(true);
        toast.success("Сайн байна уу?", {
          description: "Та амжилттай нэвтэрлээ",
        });

        router.push(from ? from : "/");
        !!callback && callback();
      }
    },
  };
};

export const useLogin = (onCompleted?: () => void) => {
  const { loginCallback } = useLoginCallback();

  const [login, { loading }] = useMutation(mutations.login, {
    onCompleted: ({ clientPortalLogin }) => {
      loginCallback(clientPortalLogin, onCompleted);
    },
    onError,
  });

  return { login, loading, clientPortalId };
};

export const useGoogleLogin = () => {
  const { loginCallback } = useLoginCallback();
  const [googleLogin, { loading }] = useMutation(mutations.googleLogin, {
    onCompleted({ clientPortalGoogleAuthentication }) {
      loginCallback(clientPortalGoogleAuthentication);
    },
    onError,
  });
  return { googleLogin, loading, clientPortalId };
};

export const useFacebookLogin = () => {
  const { loginCallback } = useLoginCallback();
  const [facebookLogin, { loading }] = useMutation(mutations.fbLogin, {
    onCompleted({ clientPortalFacebookAuthentication }) {
      loginCallback(clientPortalFacebookAuthentication);
    },
    onError,
  });
  return { facebookLogin, loading, clientPortalId };
};

export const useRegister = (
  onCompleted?: BaseMutationOptions["onCompleted"]
) => {
  const [register, { loading }] = useMutation(mutations.createUser, {
    onCompleted: (data) => {
      !!onCompleted && onCompleted(data);
    },
    onError,
  });

  return { register, loading, clientPortalId };
};

export const useUserEdit = () => {
  const setRefetchUser = useSetAtom(refetchCurrentUserAtom);
  const [editUser, { loading }] = useMutation(mutations.userEdit, {
    onCompleted() {
      setRefetchUser(true);
      toast.success("Хувийн мэдээлэл шинэчлэгдсэн");
    },
    onError,
  });

  return { loading, editUser };
};

export const useForgotPassword = () => {
  const [forgotPassword, { loading, data }] = useMutation(
    mutations.forgotPassword,
    {
      onError,
    }
  );

  const { clientPortalForgotPassword: success } = data || {};

  return { loading, forgotPassword, clientPortalId, success };
};

export const useChangePassword = () => {
  const [changePassword, { loading, data }] = useMutation(
    mutations.userChangePassword,
    {
      onError,
    }
  );

  const { clientPortalUserChangePassword: success } = data || {};

  return { loading, changePassword, clientPortalId, success };
};

export const useResetPassword = () => {
  const [resetPassword, { loading, data }] = useMutation(
    mutations.resetPassword,
    {
      onError,
    }
  );

  const { clientPortalResetPassword: success } = data || {};

  return { loading, resetPassword, clientPortalId, success };
};

export const useLogout = () => {
  const triggerRefetchUser = useSetAtom(refetchCurrentUserAtom);
  const [logout, { loading }] = useMutation(mutations.logout, {
    onCompleted() {
      triggerRefetchUser(true);
    },
    onError,
  });

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refetchToken");
    // fbLogout();
    logout();
  };

  return { loading, logout: handleLogout };
};
