import {
  type OperationVariables,
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import { ICategory, IProduct } from "@/types/products";
import { queries } from "../graphql/rooms";
import { useAtom } from "jotai";
import { reserveDateAtom, selectedRoomsAtom } from "@/store/reserve";

const useRooms = (
  options?: OperationVariables
): { rooms: IProduct[]; loading: boolean } => {
  const { data, loading } = useQuery<{ products: IProduct[] }>(queries.rooms, {
    variables: {
      pipelineId: process.env.NEXT_PUBLIC_PIPELINE_ID,
      categoryId: process.env.NEXT_PUBLIC_CATEGORY_ID,
      perPage: 1000,
    },
    ...options,
  });

  return { rooms: data?.products || [], loading };
};

export const useRoomCategories = (options?: OperationVariables) => {
  const { data, loading } = useQuery(queries.roomCategories, {
    variables: {
      parentId: process.env.NEXT_PUBLIC_CATEGORY_ID,
    },
    ...options,
  });
  return { roomCategories: data?.productCategories, loading };
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
  const { loading: loadingRooms } = useRooms({
    onCompleted({ products }: { products: IProduct[] }) {
      checkRooms({
        variables: {
          pipelineId: process.env.NEXT_PUBLIC_PIPELINE_ID,
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
