import { useMutation } from "@apollo/client";
import { useInvoiceIdByDealId, usePayments } from "../queries/payments";
import { mutations } from "../graphql/payments";
import { IFullDeal } from "@/types/sales";
import { useCurrentUser } from "../queries/auth";
import { useDealDetail } from "../queries/sales";

export const useInvoiceCreate = () => {
  const { payments } = usePayments();
  const { currentUser } = useCurrentUser();

  const paymentIds = payments.map((payment) => payment._id);

  const [invoiceCreate, { data, loading }] = useMutation(
    mutations.invoiceCreate
  );

  const handleInvoiceCreate = (dealDetail: IFullDeal) => {
    const totalAmount = dealDetail?.products.reduce(
      (acc, item) => acc + item.amount,
      0
    );
    const variables = {
      amount: totalAmount,
      phone: currentUser?.phone,
      email: currentUser?.email,
      description: `${dealDetail.number} захиалгын төлбөр`,
      customerId: currentUser?.erxesCustomerId,
      customerType: "customer",
      contentType: "sales:deals",
      contentTypeId: dealDetail._id,
      paymentIds,
    };

    return invoiceCreate({ variables });
  };

  const invoiceId = data?.invoiceCreate?._id || "";

  return { handleInvoiceCreate, loading, invoiceId };
};
