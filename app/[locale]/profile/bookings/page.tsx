"use client";
import { useQuery } from "@apollo/client";
import { Suspense } from "react";
import { queries } from "@/sdk/graphql/sales";
import { useCurrentUser } from "@/sdk/queries/auth";
import { useRouter } from "@/i18n/routing";
import { queries as roomQueries } from "@/sdk/graphql/rooms";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, formatDistance } from "date-fns";
import { formatNumberWithCommas } from "@/lib/formatNumber";
import { Separator } from "@/components/ui/separator";
import { useLabels } from "@/sdk/queries/sales";
import { useAtom, useAtomValue } from "jotai";
import { currentConfigAtom } from "@/store/config";

const Orders = () => {
  const { currentUser } = useCurrentUser();
  const currentConfig = useAtomValue(currentConfigAtom);
  const { data } = useQuery(queries.deals, {
    variables: {
      limit: 10000,
      customerIds: [currentUser?.erxesCustomerId],
      sortField: "createdAt",
      sortDirection: 1,
    },
  });
  const { data: roomCategoriesData } = useQuery(roomQueries.roomCategories, {
    variables: { parentId: currentConfig?.roomCategories[0] },
  });
  const { data: stagesData } = useQuery(queries.stages, {
    variables: { pipelineId: currentConfig?.pipelineConfig.pipelineId },
  });

  const { labels } = useLabels();
  const roomCategories = roomCategoriesData?.productCategories;
  const deals = data?.deals;
  const stages = stagesData?.salesStages;

  console.log(data);

  const router = useRouter();
  return (
    <div className="w-[80%] min-h-screen space-y-3 md:space-y-6 pt-6 md:pt-10 flex flex-col container">
      <h1 className="text-displaysm font-bold">Bookings</h1>
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
                <TableHead>Created date</TableHead>
                <TableHead>Check-in date</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.deals.length === 0 && (
                <TableRow>{`There are no bookings :(`}</TableRow>
              )}
              {data?.deals.map((deal: any, index: number) => {
                return (
                  <TableRow
                    onClick={() =>
                      deal.stage.code !== "canceled" &&
                      router.push(`/profile/bookings/${deal._id}`)
                    }
                    key={index}
                    className="cursor-pointer py-10 h-[70px]"
                  >
                    <TableCell className="font-medium">{deal._id}</TableCell>
                    <TableCell>{format(deal.createdAt, "PPpp")}</TableCell>
                    <TableCell>{format(deal.startDate, "PP")}</TableCell>
                    <TableCell className="capitalize">{"-"}</TableCell>
                    <TableCell>
                      {deal.stage.code === "unconfirmed" ? (
                        <span className="text-textxs text-[#726e34] bg-[#fcf37e] px-2 py-1 rounded-lg">
                          Waiting
                        </span>
                      ) : deal.stage.code !== "unconfirmed" &&
                        deal.stage.code !== "canceled" ? (
                        <span
                          className={`text-textxs px-2 py-1 rounded-lg bg-[#95fea0] text-[#1d6824]`}
                        >
                          {/* ${
                              tags?.filter((tag: any) =>
                                deal.tagIds.includes(tag._id)
                              )
                                ? "bg-[#95fea0] text-[#1d6824]"
                                : "bg-[#c7ffcd] text-secondary"
                            } */}
                            
                          {/* {tags?.filter((tag: any) =>
                            deal.tagIds.includes(tag._id)
                          )
                            ? "Fullpaid"
                            : "Prepaid"} */}
                          Paid
                        </span>
                      ) : (
                        <span className="text-textxs text-destructive bg-[#ffc0c0] px-2 py-1 rounded-lg">
                          Canceled
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      MNT{" "}
                      {formatNumberWithCommas(
                        deal?.products.reduce(
                          (acc: any, item: any) =>
                            acc +
                            item.product.unitPrice *
                              parseInt(
                                deal?.products[0].startDate &&
                                  deal?.products[0].endDate &&
                                  formatDistance(
                                    deal?.products[0].startDate,
                                    deal?.products[0].endDate
                                  )
                              ),
                          0
                        )
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

export default Orders;
