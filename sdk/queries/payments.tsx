import { currentConfigAtom } from "@/store/config";
import { useMutation, useQuery } from "@apollo/client";
import { useAtomValue } from "jotai";
import { mutations, queries } from "../graphql/payments";
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

export const useInvoiceIdByDealId = (dealId: string) => {
  const { data, loading, refetch } = useQuery(queries.invoiceIdByDealId, {
    variables: { contentType: "sales:deal", contentTypeId: dealId },
    skip: !dealId,
    notifyOnNetworkStatusChange: true,
  });

  const invoiceId: string = data?.invoices?.[0]?._id || "";

  return { invoiceId, loading, refetch };
};
