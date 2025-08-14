"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useConfirmInvitation } from "@/sdk/mutations/verify";
import { toast } from "sonner";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "success" | "error"
  >("pending");
  const { confirmInvitation, loading } = useConfirmInvitation();
  const token = searchParams.get("token");

  useEffect(() => {
    const handleVerification = async () => {
      if (!token) return;

      try {
        const result = await confirmInvitation({
          variables: {
            token: token,
          },
        });

        if (result.data?.clientPortalConfirmInvitation) {
          setVerificationStatus("success");

          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          setVerificationStatus("error");
        }
      } catch (error) {
        console.error("Урилга баталгаажуулах үед алдаа гарлаа:", error);
        setVerificationStatus("error");
      }
    };

    if (!token) {
      setVerificationStatus("error");
      toast.error("Баталгаажуулах токен олдсонгүй");
      return;
    }

    handleVerification();
  }, [token, confirmInvitation, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Баталгаажуулах
          </h2>
        </div>

        <div className="text-center">
          {(verificationStatus === "pending" || loading) && (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto"></div>
              <p className="text-gray-600">баталгаажуулж байна...</p>
            </div>
          )}

          {verificationStatus === "success" && (
            <div className="space-y-4">
              <div className="text-green-600">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <p className="text-green-600 font-medium">
                Амжилттай баталгаажлаа!
              </p>
              <p className="text-gray-600">Та одоо нэвтэрч орох боломжтой.</p>
            </div>
          )}

          {verificationStatus === "error" && (
            <div className="space-y-4">
              <div className="text-red-600">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <p className="text-red-600 font-medium">
                Баталгаажуулахад алдаа гарлаа
              </p>
              <p className="text-gray-600">
                холбоос буруу эсвэл хугацаа дууссан байж магадгүй.
              </p>
              <button
                onClick={() => router.push("/signup")}
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Дахин бүртгүүлэх
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
