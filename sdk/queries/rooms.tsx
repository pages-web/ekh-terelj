import {
  type OperationVariables,
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import { ICategory, IProduct } from "@/types/products";
import { queries } from "../graphql/rooms";
import { useAtom, useAtomValue } from "jotai";
import { selectedRoomsAtom } from "@/store/rooms";
import { currentConfigAtom } from "@/store/config";

const useRooms = (
  options?: OperationVariables
): { rooms: IProduct[]; loading: boolean } => {
  const currentConfig = useAtomValue(currentConfigAtom);
  const { data, loading } = useQuery<{ products: IProduct[] }>(queries.rooms, {
    variables: {
      pipelineId: currentConfig?.pipelineConfig.pipelineId,
      categoryId: currentConfig?.roomCategories[0],
      perPage: 1000,
    },
    ...options,
  });

  return { rooms: data?.products || [], loading };
};

export const useRoomCategories = (options?: OperationVariables) => {
  const currentConfig = useAtomValue(currentConfigAtom);
  const { data, loading } = useQuery(queries.roomCategories, {
    variables: {
      parentId: currentConfig?.roomCategories[0],
    },
    ...options,
  });
  return { roomCategories: data?.productCategories, loading };
};

export const useRoomsAndCategories = () => {
  const { rooms, loading } = useRooms();
  const { roomCategories, loading: categoryLoading } = useRoomCategories();

  const roomsAndCategories: (ICategory & { rooms: IProduct[] })[] =
    roomCategories?.map((category: ICategory) => ({
      ...category,
      rooms: rooms.filter((room: IProduct) => room.categoryId === category._id),
    }));

  return { roomsAndCategories, loading: loading || categoryLoading };
};

type CheckRoomsResult = {
  roomCategoriesByProduct: IProduct[];
  loading: boolean;
  rooms: IProduct[];
  refetch: any;
};

export const useCheckRooms = (
  options?: OperationVariables
): CheckRoomsResult => {
  const currentConfig = useAtomValue(currentConfigAtom);
  const { loading: loadingRooms } = useRooms({
    onCompleted({ products }: { products: IProduct[] }) {
      checkRooms({
        variables: {
          pipelineId: currentConfig?.pipelineConfig.pipelineId,
          ids: products.map((product) => product._id),
          ...options?.variables,
        },
      });
    },
  });
  const [selectedRooms] = useAtom(selectedRoomsAtom);

  const [checkRooms, { loading: loadingCheckRooms, data, refetch }] =
    useLazyQuery(queries.checkRooms, options);

  const availableRooms: IProduct[] = data?.pmsCheckRooms.filter(
    (room: IProduct) => !selectedRooms.some((r) => r.room?._id === room._id)
  );

  const availableCategoriesByProduct = availableRooms?.filter(
    (room, index, self) =>
      index === self.findIndex((r) => r.categoryId === room.categoryId)
  );

  return {
    rooms: availableRooms,
    roomCategoriesByProduct: availableCategoriesByProduct,
    loading: loadingRooms || loadingCheckRooms,
    refetch,
  };
};

export default useRooms;
