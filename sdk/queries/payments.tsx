import { useQuery } from "@apollo/client";
import { queries } from "../graphql/payments";
import { IInvoice, IPayment } from "@/types/payments";

export const usePayments = (kind?: string) => {
  const { data, loading } = useQuery(queries.paymentsPublic, {
    variables: { status: "active", ...(kind ? { kind } : {}) },
  });

  const payments: IPayment[] = data?.cpPayments || [];

  return { payments, loading };
};

export const useInvoiceIdByDealId = (dealId: string) => {
  const { data, loading, refetch } = useQuery(queries.invoiceIdByDealId, {
    variables: { contentType: "sales:deal", contentTypeId: dealId },
    skip: !dealId,
    notifyOnNetworkStatusChange: true,
  });

  const invoiceId: string = data?.cpInvoices?.list?.[0]?._id || "";

  return { invoiceId, loading, refetch };
};

export const useInvoiceDetail = (id: string) => {
  const { data, loading, refetch } = useQuery(queries.invoiceDetail, {
    variables: { id },
    skip: !id,
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

  const invoice: IInvoice | null = data?.invoiceDetail || null;

  return { invoice, loading, refetch };
};
