import {
  type OperationVariables,
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import { useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";

import { type ICategory, type IProduct } from "@/types/products";
import { queries } from "../graphql/rooms";
import { selectedRoomsAtom } from "@/store/rooms";
import { currentConfigAtom } from "@/store/config";

const useRooms = (
  options?: OperationVariables,
): { rooms: IProduct[]; loading: boolean } => {
  const currentConfig = useAtomValue(currentConfigAtom);

  const { data, loading } = useQuery<{ cpProducts: IProduct[] }>(
    queries.rooms,
    {
      variables: {
        pipelineId: currentConfig?.pipelineConfig.pipelineId,
        categoryIds: [currentConfig?.roomCategories[0]],
        perPage: 1000,
      },
      skip:
        !currentConfig?.pipelineConfig?.pipelineId ||
        !currentConfig?.roomCategories?.[0],
      ...options,
    },
  );

  return { rooms: data?.cpProducts ?? [], loading };
};

export default useRooms;

export const useRoomCategories = (options?: OperationVariables) => {
  const currentConfig = useAtomValue(currentConfigAtom);

  const { data, loading } = useQuery<{ productCategories: ICategory[] }>(
    queries.roomCategories,
    {
      variables: {
        parentId: currentConfig?.roomCategories[0],
      },
      ...options,
    },
  );

  return { roomCategories: data?.productCategories ?? [], loading };
};

export const useRoomsAndCategories = () => {
  const { rooms, loading } = useRooms();
  const { roomCategories, loading: categoryLoading } = useRoomCategories();

  const roomsAndCategories: (ICategory & { rooms: IProduct[] })[] = (
    roomCategories ?? []
  ).map((category) => ({
    ...category,
    rooms: rooms.filter((room) => room.categoryId === category._id),
  }));

  return { roomsAndCategories, loading: loading || categoryLoading };
};

type CheckRoomsResult = {
  rooms: IProduct[];
  roomCategoriesByProduct: IProduct[];
  loading: boolean;
  refetch: (variables?: OperationVariables) => void;
};

export const useCheckRooms = (
  options?: OperationVariables,
): CheckRoomsResult => {
  const currentConfig = useAtomValue(currentConfigAtom);
  const [selectedRooms] = useAtom(selectedRoomsAtom);

  const pipelineId = currentConfig?.pipelineConfig?.pipelineId;
  const isConfigReady = Boolean(pipelineId);

  const [checkRooms, { loading: loadingCheckRooms, data }] = useLazyQuery(
    queries.checkRooms,
  );

  const { rooms: allRooms, loading: loadingRooms } = useRooms({
    onCompleted({ cpProducts }: { cpProducts: IProduct[] }) {
      if (!pipelineId || cpProducts.length === 0) return;

      checkRooms({
        variables: {
          pipelineId,
          ids: cpProducts.map((p) => p._id),
          ...options?.variables,
        },
      });
    },
  });

  const refetch = useCallback(
    (variables?: OperationVariables) => {
      if (!pipelineId || allRooms.length === 0) return;

      checkRooms({
        variables: {
          pipelineId,
          ids: allRooms.map((p) => p._id),
          ...options?.variables,
          ...variables,
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pipelineId, allRooms, checkRooms],
  );

  const availableRooms: IProduct[] = (data?.cpPmsCheckRooms ?? [])
    .map((room: IProduct) => ({
      ...allRooms.find((p) => p._id === room._id),
      ...room,
    }))
    .filter(
      (room: IProduct) => !selectedRooms.some((r) => r.room?._id === room._id),
    );

  const roomCategoriesByProduct = availableRooms.filter(
    (room, index, self) =>
      index === self.findIndex((r) => r.categoryId === room.categoryId),
  );

  return {
    rooms: availableRooms,
    roomCategoriesByProduct,
    loading: !isConfigReady || loadingRooms || loadingCheckRooms,
    refetch,
  };
};
