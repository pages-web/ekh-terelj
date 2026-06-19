import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useAddPaymentTransaction,
  useCheckInvoice,
  useInvoiceCreate,
} from "@/features/payments/hooks/payments-mutations";
import { usePayments } from "@/features/payments/hooks/payments";
import { useTags } from "@/features/booking/hooks/sales";
import { IFullDeal } from "@/types/api";
import { IPayment } from "@/features/payments/types";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/ui/loading";
import { toast } from "sonner";

type BankLink = {
  name?: string;
  description?: string;
  logo?: string;
  link?: string;
};

type ParsedPaymentResponse = {
  amount?: number | string;
  currency?: string;
  qrData?: string;
  qrImage?: string;
  qr_image?: string;
  qPay_QRimage?: string;
  urls?: BankLink[];
};

const safeJsonParse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const getQrSource = (response: ParsedPaymentResponse | null) => {
  const qr =
    response?.qrData ||
    response?.qrImage ||
    response?.qr_image ||
    response?.qPay_QRimage ||
    "";

  if (!qr) return "";
  if (qr.startsWith("data:") || qr.startsWith("http")) return qr;

  return `data:image/png;base64,${qr}`;
};

const isPaidStatus = (status: unknown) =>
  status === true ||
  (typeof status === "string" &&
    ["paid", "complete", "success"].includes(status.toLowerCase()));

const getDealAmount = (dealDetail: IFullDeal) =>
  dealDetail.productsData.reduce((acc, item) => acc + (item.amount || 0), 0);

const getInvoiceAmount = (dealDetail: IFullDeal, isPrePayment: boolean) => {
  const total = getDealAmount(dealDetail);

  return isPrePayment ? Math.round(total / 2) : total;
};

const PaymentDetail = ({
  dealDetail,
  refetch,
}: {
  dealDetail: IFullDeal;
  refetch: () => void;
}) => {
  const { payments, loading: paymentsLoading } = usePayments();
  const { handleInvoiceCreate, loading: invoiceLoading } = useInvoiceCreate();
  const { handleAddTransaction, loading: transactionLoading } =
    useAddPaymentTransaction();
  const { handleCheckInvoice } = useCheckInvoice();
  const { tags } = useTags();

  const [open, setOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [paymentResponse, setPaymentResponse] =
    useState<ParsedPaymentResponse | null>(null);
  const [error, setError] = useState("");
  const [pollCapped, setPollCapped] = useState(false);
  const pollCountRef = useRef(0);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const availablePayments = useMemo(() => {
    const pipelinePaymentIds = dealDetail.pipeline?.paymentIds || [];
    const activePayments = payments.filter(
      (payment) => payment.status === "active",
    );

    if (!pipelinePaymentIds.length) return activePayments;

    return activePayments.filter((payment) =>
      pipelinePaymentIds.includes(payment._id),
    );
  }, [dealDetail.pipeline?.paymentIds, payments]);

  const isPrePayment = useMemo(() => {
    const dealTagIds = dealDetail.tagIds || [];

    return tags.some(
      (tag) =>
        dealTagIds.includes(tag._id) &&
        tag.name.toLowerCase() === "pre payment",
    );
  }, [dealDetail.tagIds, tags]);
  const amount = getInvoiceAmount(dealDetail, isPrePayment);
  const currency = "MNT";
  const loading = invoiceLoading || transactionLoading;

  useEffect(() => {
    if (!selectedPaymentId && availablePayments[0]?._id) {
      setSelectedPaymentId(availablePayments[0]._id);
    }
  }, [availablePayments, selectedPaymentId]);

  const handlePaid = useCallback(async () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }

    toast.success("Төлбөр амжилттай төлөгдлөө.");
    setOpen(false);
    await refetch();
  }, [refetch]);

  useEffect(() => {
    if (!open || !invoiceId) return;

    pollCountRef.current = 0;
    setPollCapped(false);

    pollRef.current = setInterval(async () => {
      pollCountRef.current += 1;
      if (pollCountRef.current > 100) {
        if (pollRef.current) clearInterval(pollRef.current);
        pollRef.current = null;
        setPollCapped(true);
        return;
      }

      try {
        const result = await handleCheckInvoice(invoiceId);
        if (isPaidStatus(result?.data?.cpInvoicesCheck)) {
          await handlePaid();
        }
      } catch {
        // Keep polling; transient payment checks should not close the dialog.
      }
    }, 3000);

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [handleCheckInvoice, handlePaid, invoiceId, open]);

  const startPayment = async () => {
    const payment = availablePayments.find(
      (item: IPayment) => item._id === selectedPaymentId,
    );

    if (!payment) {
      setError("Төлбөрийн хэрэгсэл сонгоно уу.");
      return;
    }

    setError("");
    setPaymentResponse(null);

    try {
      const invoiceResult = await handleInvoiceCreate({
        dealDetail,
        amount,
        currency,
        description: `${dealDetail.number} ${
          isPrePayment ? "урьдчилгаа" : "бүтэн"
        } төлбөр`,
        paymentId: payment._id,
      });
      const createdInvoiceId = invoiceResult?.data?.invoiceCreate?._id || "";

      if (!createdInvoiceId) {
        throw new Error("Invoice creation returned no ID.");
      }

      setInvoiceId(createdInvoiceId);

      const transactionResult = await handleAddTransaction(
        createdInvoiceId,
        amount,
        payment._id,
      );
      const response =
        transactionResult?.data?.paymentTransactionsAdd?.response || null;
      const parsedResponse =
        typeof response === "string" ? safeJsonParse(response) : response;

      if (parsedResponse?.error) {
        throw new Error(`${payment.kind}: ${parsedResponse.error}`);
      }

      setPaymentResponse(parsedResponse || {});
    } catch (error: any) {
      setError(error?.message || "Төлбөр эхлүүлэхэд алдаа гарлаа.");
    }
  };

  const handleCheckAgain = async () => {
    if (!invoiceId) return;

    setPollCapped(false);
    pollCountRef.current = 0;

    try {
      const result = await handleCheckInvoice(invoiceId);
      if (isPaidStatus(result?.data?.cpInvoicesCheck)) {
        await handlePaid();
      } else {
        setError("Төлбөр хараахан баталгаажаагүй байна.");
      }
    } catch {
      setError("Төлбөр шалгахад алдаа гарлаа.");
    }
  };

  const qrSource = getQrSource(paymentResponse);

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        if (!state) refetch();
      }}
    >
      <DialogTrigger asChild>
        <Button>Төлбөр төлөх</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Төлбөр төлөх</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="text-sm text-muted-foreground">Дүн</span>
            <span className="text-right font-semibold">
              {amount.toLocaleString()} {currency}
              {isPrePayment && (
                <span className="block text-xs font-normal text-muted-foreground">
                  Урьдчилгаа 50%
                </span>
              )}
            </span>
          </div>

          {error && (
            <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {!paymentResponse && (
            <>
              <div className="space-y-2">
                <p className="text-sm font-medium">Төлбөрийн хэрэгсэл</p>
                <div className="grid gap-2">
                  {paymentsLoading && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <LoadingIcon className="mr-0" />
                      Уншиж байна
                    </div>
                  )}
                  {availablePayments.map((payment) => (
                    <button
                      key={payment._id}
                      type="button"
                      onClick={() => setSelectedPaymentId(payment._id)}
                      className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                        selectedPaymentId === payment._id
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted"
                      }`}
                    >
                      <span className="font-medium">{payment.name}</span>
                      <span className="ml-2 text-muted-foreground">
                        {payment.kind}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                className="w-full"
                disabled={loading || !selectedPaymentId}
                onClick={startPayment}
              >
                {loading ? <LoadingIcon /> : "Үргэлжлүүлэх"}
              </Button>
            </>
          )}

          {paymentResponse && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-xl font-semibold">
                {Number(paymentResponse.amount || amount).toLocaleString()}{" "}
                {paymentResponse.currency || currency}
              </p>

              {qrSource ? (
                <div className="rounded-lg border bg-white p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrSource}
                    alt="QR Code"
                    className="h-56 w-56 object-contain"
                  />
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  QR мэдээлэл олдсонгүй.
                </p>
              )}

              <p className="max-w-xs text-center text-sm text-muted-foreground">
                QR кодыг банкны апп-аар уншуулж төлбөрөө төлнө үү.
              </p>

              {pollCapped && (
                <Button variant="outline" size="sm" onClick={handleCheckAgain}>
                  Дахин шалгах
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDetail;
