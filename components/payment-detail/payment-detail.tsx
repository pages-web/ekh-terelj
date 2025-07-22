import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { IFullDeal } from "@/types/sales";
import { useInvoiceCreate } from "@/sdk/mutations/payments";
import { useInvoiceIdByDealId } from "@/sdk/queries/payments";
import { Loading } from "../ui/loading";

const PaymentDetail = ({
  dealDetail,
  refetch,
}: {
  dealDetail: IFullDeal;
  refetch: () => void;
}) => {
  const {
    handleInvoiceCreate,
    loading,
    invoiceId: mutationInvoiceId,
  } = useInvoiceCreate();
  const { invoiceId } = useInvoiceIdByDealId(dealDetail._id);

  const invoiceUrl = `${
    process.env.NEXT_PUBLIC_MAIN_API_DOMAIN
  }/pl:payment/invoice/${invoiceId || mutationInvoiceId}`;

  return (
    <Dialog
      onOpenChange={(state) => {
        !state && refetch();
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => handleInvoiceCreate(dealDetail)}>
          Төлбөр төлөх
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Төлбөр төлөх</DialogTitle>
        </DialogHeader>

        {(invoiceId || mutationInvoiceId) && (
          <iframe
            src={invoiceUrl}
            className="min-h-[80vh] sm:min-h-[600px] w-full border-0"
            title="Payment Gateway"
            allow="payment"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
export default PaymentDetail;
