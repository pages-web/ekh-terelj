"use client";

import { useAtomValue } from "jotai";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";
import { currentUserAtom } from "@/store/auth";

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
