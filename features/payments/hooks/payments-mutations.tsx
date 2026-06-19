import { useMutation } from "@apollo/client";
import { usePayments } from "@/features/payments/hooks/payments";
import mutations from "@/features/payments/lib/gql/mutations";
import { IFullDeal } from "@/types/api";
import { useCurrentUser } from "@/features/auth/hooks/auth";

type InvoiceCreateArgs = {
  amount?: number;
  currency?: string;
  dealDetail: IFullDeal;
  description?: string;
  paymentId?: string;
  redirectUri?: string;
};

export const useInvoiceCreate = () => {
  const { payments } = usePayments();
  const { currentUser } = useCurrentUser();

  const fallbackPaymentIds = payments.map((payment) => payment._id);

  const [invoiceCreate, { data, loading }] = useMutation(
    mutations.invoiceCreate
  );

  const handleInvoiceCreate = (args: IFullDeal | InvoiceCreateArgs) => {
    const dealDetail = "_id" in args ? args : args.dealDetail;
    const totalAmount = dealDetail?.productsData.reduce(
      (acc, item) => acc + item.amount,
      0
    );
    const paymentIds = dealDetail.pipeline?.paymentIds?.length
      ? dealDetail.pipeline.paymentIds
      : fallbackPaymentIds;
    const selectedPaymentIds =
      "_id" in args || !args.paymentId ? paymentIds : [args.paymentId];

    const input = {
      amount: "_id" in args ? totalAmount : args.amount ?? totalAmount,
      currency: "_id" in args ? "MNT" : args.currency ?? "MNT",
      phone: currentUser?.phone,
      email: currentUser?.email,
      description:
        "_id" in args
          ? `${dealDetail.number} захиалгын төлбөр`
          : args.description || `${dealDetail.number} захиалгын төлбөр`,
      customerId: currentUser?.erxesCustomerId,
      customerType: "customer",
      contentType: "sales:deal",
      contentTypeId: dealDetail._id,
      paymentIds: selectedPaymentIds,
      ...(!("_id" in args) && args.redirectUri
        ? { redirectUri: args.redirectUri }
        : {}),
    };

    return invoiceCreate({ variables: { input } });
  };

  const invoiceId = data?.invoiceCreate?._id || "";

  return { handleInvoiceCreate, loading, invoiceId };
};

export const useAddPaymentTransaction = () => {
  const [transactionsAdd, { loading }] = useMutation(mutations.transactionsAdd);

  const handleAddTransaction = (
    invoiceId: string,
    amount: number,
    paymentId: string
  ) => {
    return transactionsAdd({
      variables: {
        input: {
          invoiceId,
          paymentId,
          amount,
        },
      },
    });
  };

  return { handleAddTransaction, loading };
};

export const useCheckInvoice = () => {
  const [checkInvoice, { loading }] = useMutation(mutations.checkInvoice);

  const handleCheckInvoice = (id: string) => {
    return checkInvoice({ variables: { id } });
  };

  return { handleCheckInvoice, loading };
};
