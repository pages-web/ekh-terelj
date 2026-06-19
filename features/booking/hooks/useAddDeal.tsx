import { currentUserAtom } from "@/features/auth/store";
import { useAtomValue, useSetAtom } from "jotai";
import { dealIdAtom, selectedRoomsAtom } from "@/features/booking/store/rooms";
import { reserveInfoAtom } from "@/features/booking/store/reserve";
import { IStage } from "@/types/api";
import { useLazyQuery, useMutation } from "@apollo/client";
import mutations from "@/features/booking/lib/gql/mutations";
import roomQueries from "@/features/rooms/lib/gql/queries";
import { useLabels, useStages, useTags } from "@/features/booking/hooks/sales";
import { useLabelAdd, useAddPrePaymentTag } from "@/features/booking/hooks/sales-mutations";
import { isPrePaymentAtom } from "@/features/payments/store";
import { currentConfigAtom } from "@/constants/config";

const useAddDeal = () => {
  const [addDeal, { data, loading: addDealLoading }] = useMutation(
    mutations.dealsAdd,
  );
  const [checkRooms, { loading: checkRoomsLoading }] = useLazyQuery(
    roomQueries.checkRooms,
    { fetchPolicy: "network-only" },
  );
  const { addLabel } = useLabelAdd();
  const { addPrePaymentTag, loading: addTagLoading } = useAddPrePaymentTag();

  const { to, from, nights, adults, children } = useAtomValue(reserveInfoAtom);
  const currentConfig = useAtomValue(currentConfigAtom);
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
    })),
  );

  const handleAddDeal = async ({
    description,
  }: {
    description?: string;
  }): Promise<string> => {
    const pipelineId = currentConfig?.pipelineConfig?.pipelineId;
    const selectedRoomIds = selectedRooms
      .map(({ room }) => room?._id)
      .filter(Boolean);

    if (!from || !to) {
      throw new Error("Pick a date before booking");
    }

    if (!pipelineId) {
      throw new Error("Booking configuration is not ready");
    }

    if (selectedRoomIds.length === 0) {
      throw new Error("Select a room before booking");
    }

    const { data: roomAvailabilityData } = await checkRooms({
      variables: {
        pipelineId,
        ids: selectedRoomIds,
        startDate: from,
        endDate: to,
      },
    });

    const availableRoomIds = new Set(
      (roomAvailabilityData?.cpPmsCheckRooms ?? []).map(
        (room: { _id: string }) => room._id,
      ),
    );
    const unavailableRoom = selectedRooms.find(
      ({ room }) => room?._id && !availableRoomIds.has(room._id),
    );

    if (unavailableRoom) {
      throw new Error(
        `${unavailableRoom.room?.name || "This room"} is already reserved for the selected date`,
      );
    }

    let labelId = labels.find((l: any) => l.name.toLowerCase() === "web")?._id;
    console.log(labels, ";abes");

    if (!labelId) {
      const result = await addLabel({
        variables: { name: "Web", colorCode: "#eb144c" },
      });
      labelId = result.data?.cpSalesPipelineLabelsAdd?._id;
    }

    let tagId = tags?.find((tag) =>
      isPrePayment ? tag.name === "Pre payment" : tag.name === "Full payment",
    )?._id;

    if (!tagId) {
      const result = await addPrePaymentTag(isPrePayment);
      tagId = result.data?.tagsAdd?._id;
    }

    const targetStage = stages?.find((st: IStage) => st.code === "unconfirmed");

    if (!targetStage?._id) {
      throw new Error("Booking stage not found: unconfirmed");
    }

    const variables = {
      name: `${firstName} ${lastName}`,
      customerIds: [erxesCustomerId],
      productsData: [...selectedRoomsByMutation, ...selectedExtrasByMutation],
      stageId: targetStage._id,
      startDate: from,
      closeDate: to,
      description: `${description}`,
      labelIds: [labelId],
      tagIds: [tagId],
    };

    setDealId(null);

    const { data } = await addDeal({ variables });

    const newDealId = data?.cpDealsAdd?._id;

    return newDealId;
  };

  return {
    handleAddDeal,
    loading: addDealLoading || addTagLoading || checkRoomsLoading,
  };
};

export default useAddDeal;
