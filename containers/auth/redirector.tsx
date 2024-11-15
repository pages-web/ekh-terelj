"use client";

import { currentUserAtom } from "@/store/auth";
import { useAtomValue } from "jotai";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";

const Redirector = () => {
  const user = useAtomValue(currentUserAtom);
  const router = useRouter();
  const from = useSearchParams().get("from");

  useEffect(() => {
    if (user) {
      router.push(from ? from : "/");
    }
  }, []);

  return <></>;
};

export default Redirector;
