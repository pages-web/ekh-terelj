import LoginButton from "@/containers/auth/login-button";

const AccountPart = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="space-y-3">
        <h2 className="text-textlg text-black">Have a account?</h2>
        <p className="text-textmd text-black/70">
          Create or Sign in to this booking. (Optional)
        </p>
      </div>
      <LoginButton />
    </div>
  );
};
export default AccountPart;
