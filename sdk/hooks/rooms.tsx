import {
  type OperationVariables,
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import { ICategory, IProduct } from "@/types/products";
import { queries } from "../graphql/rooms";

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
  roomCategories: (ICategory & {
    rooms: (IProduct & { available: boolean })[];
  })[];
  loading: boolean;
  rooms: IProduct[];
};

export const useCheckRooms = (
  options?: OperationVariables
): CheckRoomsResult => {
  const { rooms, loading: loadingRooms } = useRooms({
    onCompleted({ products }: { products: IProduct[] }) {
      checkRooms({
        variables: {
          pipelineId: process.env.NEXT_PUBLIC_PIPELINE_ID,
          ids: products.map((product) => product._id),
          ...options?.variables,
          startDate: "2024-10-15T16:00:00.000Z",
          endDate: "2024-10-16T16:00:00.000Z",
        },
      });
    },
  });

  const { roomCategories, loading: loadingRoomCategories } =
    useRoomCategories();

  const [checkRooms, { loading: loadingCheckRooms, data }] = useLazyQuery(
    queries.checkRooms,
    options
  );

  const availableRoomIds =
    data?.pmsCheckRooms.map((room: { _id: string }) => room._id) || [];

  const mappedRoomCategories = roomCategories?.map((category: ICategory) => ({
    ...category,
    rooms: rooms
      ?.filter((room: IProduct) => room.categoryId === category._id)
      .map((room: IProduct) => ({
        ...room,
        available: availableRoomIds.includes(room._id),
      })),
  }));

  return {
    rooms,
    roomCategories: mappedRoomCategories,
    loading: loadingRooms || loadingCheckRooms || loadingRoomCategories,
  };
};

export default useRooms;
