"use client";
import { useQuery } from "@apollo/client";
import { Suspense } from "react";
import queries from "@/features/booking/lib/gql/queries";
import { useCurrentUser } from "@/features/auth/hooks/auth";
import { useRouter } from "@/i18n/routing";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { formatNumberWithCommas } from "@/lib/utils/format-number";
import { Separator } from "@/components/ui/separator";
import { useAtomValue } from "jotai";
import { currentConfigAtom } from "@/constants/config";
import { useLocale, useTranslations } from "next-intl";
import { Loading } from "@/components/ui/loading";

const Bookings = () => {
  const tContent = useTranslations("Content");
  const tBooking = useTranslations("Booking");
  const locale = useLocale();
  const { currentUser } = useCurrentUser();
  const currentConfig = useAtomValue(currentConfigAtom);
  const customerId = currentUser?.erxesCustomerId;
  const { data, loading } = useQuery(queries.deals, {
    variables: {
      customerIds: customerId ? [customerId] : [],
    },
    errorPolicy: "ignore",
    skip: !customerId,
  });
  const { data: stagesData } = useQuery(queries.stages, {
    variables: { pipelineId: currentConfig?.pipelineConfig?.pipelineId },
    skip: !currentConfig?.pipelineConfig?.pipelineId,
  });

  const stages = stagesData?.cpSalesStages;
  const deals = data?.cpDeals?.list ?? data?.deals ?? [];

  const router = useRouter();
  return (
    <div className="w-[80%] min-h-screen space-y-3 md:space-y-6 pt-6 md:pt-10 flex flex-col container">
      <h1 className="text-displaysm font-bold">{tContent("bookings")}</h1>
      <Separator />
      {/* <Tabs defaultValue="all" className="w-[400px]">
        <TabsList className="gap-10">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="confirmed">Paid</TabsTrigger>
          <TabsTrigger value="unconfirmed">Waiting</TabsTrigger>
          <TabsTrigger value="canceled">Canceled</TabsTrigger>
        </TabsList>

      </Tabs> */}

      <Suspense>
        <div className="w-full space-y-4">
          <Table>
            <TableCaption>
              {/* <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((prev) => prev - 1)}
                    />
                  </PaginationItem>
                  <PaginationItem></PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage((prev) => prev + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination> */}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>{tBooking("createdDate")}</TableHead>
                <TableHead>{tBooking("checkInDate")}</TableHead>
                <TableHead>{tBooking("payment")}</TableHead>
                <TableHead>{tBooking("status")}</TableHead>
                <TableHead className="text-right">
                  {tBooking("totalPrice")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Loading />
                  </TableCell>
                </TableRow>
              )}
              {!loading && deals.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>{tContent("noBookings")}</TableCell>
                </TableRow>
              )}
              {!loading &&
                deals.map((deal: any, index: number) => {
                  const stageCode =
                    deal.stage?.code ||
                    stages?.find((stage: any) => stage._id === deal.stageId)
                      ?.code;

                  return (
                    <TableRow
                      onClick={() =>
                        stageCode !== "canceled" &&
                        router.push(`/profile/bookings/${deal._id}`)
                      }
                      key={index}
                      className="cursor-pointer py-10 h-[70px]"
                    >
                      <TableCell className="font-medium">{deal._id}</TableCell>
                      <TableCell>
                        {deal.createdAt ? format(deal.createdAt, "PPpp") : "-"}
                      </TableCell>
                      <TableCell>
                        {deal.startDate ? format(deal.startDate, "PP") : "-"}
                      </TableCell>
                      <TableCell className="capitalize">{"-"}</TableCell>
                      <TableCell>
                        {stageCode === "unconfirmed" ? (
                          <span className="text-textxs text-[#726e34] bg-[#fcf37e] px-2 py-1 rounded-lg">
                            {tContent("waiting")}
                          </span>
                        ) : stageCode !== "unconfirmed" &&
                          stageCode !== "canceled" ? (
                          <span
                            className={`text-textxs px-2 py-1 rounded-lg bg-[#95fea0] text-[#1d6824]`}
                          >
                            {tContent("paid")}
                          </span>
                        ) : (
                          <span className="text-textxs text-destructive bg-[#ffc0c0] px-2 py-1 rounded-lg">
                            {tContent("canceled")}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        MNT
                        {formatNumberWithCommas(
                          deal?.productsData?.reduce(
                            (acc: any, item: any) => acc + (item.amount || 0),
                            0,
                          ) || 0,
                          locale,
                        )}
                        ₮
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </Suspense>
    </div>
  );
};

export default Bookings;
