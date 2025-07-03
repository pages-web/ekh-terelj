import { currentConfigAtom } from "@/store/config";
import { useQuery } from "@apollo/client";
import { useAtomValue } from "jotai";
import { queries } from "../graphql/payments";
import { IPayment } from "@/types/payments";

export const usePayments = () => {
  const currentConfig = useAtomValue(currentConfigAtom);
  const { data, loading } = useQuery(queries.paymentsPublic, {
    variables: { ids: currentConfig?.paymentIds },
    skip: !currentConfig,
  });

  const payments: IPayment[] = data?.paymentsPublic || [];

  return { payments, loading };
};
