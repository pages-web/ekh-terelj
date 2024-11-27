"use client";

import { useQuery } from "@apollo/client";
import ProfileLayout from "../../profile-layout";
import { Suspense } from "react";
import { queries } from "@/sdk/graphql/sales";
import { useParams } from "next/navigation";

const OrderDetail = () => {
  const params = useParams();
  const { data } = useQuery(queries.dealDetail, {
    variables: { id: params.id },
  });
  return (
    <ProfileLayout title="Order detail" description="">
      {data?.dealDetail && (
        <Suspense fallback={<div>Loading...</div>}>
          <div>Order: {params.id}</div>
        </Suspense>
      )}
    </ProfileLayout>
  );
};

export default OrderDetail;
