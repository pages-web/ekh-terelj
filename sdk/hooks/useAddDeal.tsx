import { currentUserAtom } from "@/store/auth";
import { useAtomValue, useSetAtom } from "jotai";
import { dealIdAtom, selectedRoomsAtom } from "@/store/rooms";
import { reserveCompletedAtom, reserveInfoAtom } from "@/store/reserve";
import { IStage } from "@/types/sales";
import { paymentTypeAtom } from "@/store/payments";
import { useMutation } from "@apollo/client";
import { mutations } from "../graphql/sales";
import { useLabels, useStages, useTags } from "../queries/sales";
import { useLabelAdd } from "../mutations/sales";
import { useState } from "react";

const useAddDeal = () => {
  const [addDeal, { loading }] = useMutation(mutations.dealsAdd);
  const { addLabel } = useLabelAdd();
  const selectedRooms = useAtomValue(selectedRoomsAtom);
  const { to, from, nights, adults, children } = useAtomValue(reserveInfoAtom);
  const { firstName, lastName, erxesCustomerId } =
    useAtomValue(currentUserAtom) || {};
  const paymentType = useAtomValue(paymentTypeAtom);

  const setReserveCompleted = useSetAtom(reserveCompletedAtom);
  const setDealId = useSetAtom(dealIdAtom);

  const { stages } = useStages();
  const { labels } = useLabels();
  // const { tags } = useTags();

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

  const handleAddDeal = ({ description }: { description?: string }) => {
    const variables = {
      name: `${firstName} ${lastName}`,
      customerIds: [erxesCustomerId],
      productsData: [...selectedRoomsByMutation, ...selectedExtrasByMutation],
      stageId: stages?.find((st: IStage) => st.code === "unconfirmed")?._id,
      startDate: from,
      closeDate: to,
      description: `${description}`,
      labelIds: [
        labels.find((l: any) => l.name.toLowerCase() === "web")?._id ||
          addLabel({
            variables: { name: "Web", colorCode: "#eb144c" },
            onCompleted: (data) => data.salesPipelineLabelsAdd?._id,
          }),
      ],
    };

    addDeal({
      variables,
      onCompleted: (deal) => {
        setReserveCompleted(true);
        setDealId(deal.dealsAdd?._id);
      },
    });
  };

  return { handleAddDeal, addDeal, loading };
};

export default useAddDeal;
