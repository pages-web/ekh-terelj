import { currentUserAtom } from "@/store/auth";
import { useAtomValue, useSetAtom } from "jotai";
import { dealIdAtom, selectedRoomsAtom } from "@/store/rooms";
import { reserveInfoAtom } from "@/store/reserve";
import { IStage } from "@/types/sales";
import { useMutation } from "@apollo/client";
import { mutations } from "../graphql/sales";
import { useLabels, useStages, useTags } from "../queries/sales";
import {
  useLabelAdd,
  useAddTag,
  useAddPrePaymentTag,
} from "../mutations/sales";
import { useState } from "react";
import { isPrePaymentAtom } from "@/store/payments";
import { useInvoiceCreate } from "../mutations/payments";

const useAddDeal = () => {
  const [addDeal, { data, loading: addDealLoading }] = useMutation(
    mutations.dealsAdd
  );
  const { addLabel } = useLabelAdd();
  const { addPrePaymentTag, loading: addTagLoading } = useAddPrePaymentTag();
  const { handleInvoiceCreate, loading } = useInvoiceCreate();

  const { to, from, nights, adults, children } = useAtomValue(reserveInfoAtom);
  const { firstName, lastName, erxesCustomerId } =
    useAtomValue(currentUserAtom) || {};

  const selectedRooms = useAtomValue(selectedRoomsAtom);
  const isPrePayment = useAtomValue(isPrePaymentAtom);
  const setDealId = useSetAtom(dealIdAtom);

  const { stages } = useStages();
  const { labels } = useLabels();
  const { tags } = useTags();

  const selectedRoomsByMutation = selectedRooms.map(({ room }) => ({
    productId: room?._id,
    name: room?.name,
    startDate: from,
    endDate: to,
    unitPrice: room?.unitPrice,
    quantity: nights,
    amount: room?.unitPrice * nights,
    uom: room?.uom,
    tickUsed: true,
    information: {
      adults: adults,
      children: children,
    },
  }));

  const selectedExtrasByMutation = selectedRooms.flatMap(({ extras, room }) =>
    extras?.map((extra) => ({
      productId: extra?._id,
      quantity: 1,
      name: extra?.name,
      unitPrice: extra?.unitPrice,
      amount: extra?.unitPrice * 1,
      information: {
        parentId: room?._id,
      },
    }))
  );

  const handleAddDeal = async ({
    description,
  }: {
    description?: string;
  }): Promise<string> => {
    let labelId = labels.find((l: any) => l.name.toLowerCase() === "web")?._id;

    if (!labelId) {
      const result = await addLabel({
        variables: { name: "Web", colorCode: "#eb144c" },
      });
      labelId = result.data?.salesPipelineLabelsAdd?._id;
    }

    let tagId = tags?.find((tag) =>
      isPrePayment ? tag.name === "Pre payment" : tag.name === "Full payment"
    )?._id;

    if (!tagId) {
      const result = await addPrePaymentTag(isPrePayment);
      tagId = result.data?.tagsAdd?._id;
    }

    const variables = {
      name: `${firstName} ${lastName}`,
      customerIds: [erxesCustomerId],
      productsData: [...selectedRoomsByMutation, ...selectedExtrasByMutation],
      stageId: stages?.find((st: IStage) => st.code === "unconfirmed")?._id,
      startDate: from,
      closeDate: to,
      description: `${description}`,
      labelIds: [labelId],
      tagIds: [tagId],
    };

    setDealId(null);

    const { data } = await addDeal({ variables }); // ✅ Now awaiting and getting `data` correctly

    const newDealId = data?.dealsAdd?._id;

    return newDealId;
  };

  return { handleAddDeal, loading: addDealLoading || addTagLoading };
};

export default useAddDeal;
