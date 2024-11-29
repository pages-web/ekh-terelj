"use client";
import { useQuery } from "@apollo/client";
import ProfileLayout from "../profile-layout";
import { Suspense } from "react";
import { queries } from "@/sdk/graphql/sales";
import { useCurrentUser } from "@/sdk/queries/auth";
import { Link, useRouter } from "@/i18n/routing";
import Image from "@/components/ui/image";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Orders = () => {
  const { currentUser } = useCurrentUser();
  const { data } = useQuery(queries.deals, {
    variables: { customerIds: [currentUser?.erxesCustomerId] },
  });
  const { data: roomCategoriesData } = useQuery(roomQueries.roomCategories, {
    variables: { parentId: process.env.NEXT_PUBLIC_CATEGORY_ID },
  });
  const roomCategories = roomCategoriesData?.productCategories;
  const deals = data?.deals;

  console.log(deals);
  const router = useRouter();
  return (
    <div className="w-[80%] min-h-screen space-y-3 md:space-y-6 pt-6 md:pt-10 flex flex-col container">
      <h1 className="text-displaysm font-bold">Bookings</h1>
      <Separator />
      <Tabs defaultValue="all" className="w-[400px]">
        <TabsList className="gap-10">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="unconfirmed">Unconfirmed</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>

      <div className="w-full space-y-4">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.deals.map((deal: any, index: number) => (
              <TableRow
                onClick={() => router.push(`/profile/bookings/${deal._id}`)}
                className="cursor-pointer py-10 h-[70px]"
              >
                <TableCell className="font-medium">000{index + 1}</TableCell>
                <TableCell>{format(deal.createdAt, "PPpp")}</TableCell>
                <TableCell>
                  {/* <span className="text-textxs text-destructive bg-[#ffc0c0] px-2 py-1 rounded-lg">
                    {deal.stage.name}
                  </span> */}
                  <span className="text-textxs text-secondary bg-[#a9ffb1] px-2 py-1 rounded-lg">
                    Confirmed
                  </span>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;
