"use client";
import { useQuery } from "@apollo/client";
import ProfileLayout from "../profile-layout";
import { Suspense } from "react";
import { queries } from "@/sdk/graphql/sales";
import { useCurrentUser } from "@/sdk/queries/auth";
import { useRouter } from "@/i18n/routing";

const Orders = () => {
  const { currentUser } = useCurrentUser();
  const { data } = useQuery(queries.deals, {
    variables: { customerIds: [currentUser?.erxesCustomerId] },
  });
  const router = useRouter();
  return (
    <ProfileLayout title="Your orders" description="">
      <div className="space-y-4">
        {data?.deals.map((deal: any, index: number) => {
          return (
            <div
              className="w-full border py-4 px-6 cursor-pointer"
              onClick={() => {
                router.push(`/profile/orders/${deal._id}`);
              }}
            >
              {index + 1}. {deal._id}
            </div>
          );
        })}
      </div>
    </ProfileLayout>
  );
};

export default Orders;
