"use client";
import queries from "@/features/cms/lib/gql/config-queries";
import { currentConfigAtom } from "@/constants/config";
import { useQuery } from "@apollo/client";
import { useAtom, useSetAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useTransition } from "react";

const CurrentConfigProvider = ({ children }: React.PropsWithChildren) => {
  const [currentConfig, setCurrentConfig] = useAtom(currentConfigAtom);
  const { loading } = useQuery(queries.PmsBranchDetail, {
    variables: { id: process.env.NEXT_PUBLIC_PMS_TOKEN },
    onCompleted: (data) => {
      setCurrentConfig(data.cpPmsBranchDetail);
    },
  });

  return <>{children}</>;
};

export default CurrentConfigProvider;
