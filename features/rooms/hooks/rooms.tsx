import {
  type OperationVariables,
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import { useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";

import { type ICategory, type IProduct } from "@/features/rooms/types";
import queries from "@/features/rooms/lib/gql/queries";
import { selectedRoomsAtom } from "@/features/booking/store/rooms";
import { currentConfigAtom } from "@/constants/config";
import { useCmsPostsBySlug } from "@/features/cms/hooks/useCmsPostsBySlug";
import {
  ACCOMMODATION_CATEGORY_SLUG,
  ACCOMMODATION_PRODUCT_FIELD_ID,
} from "@/constants/accommodation";
import { CmsPost } from "@/features/cms/types";

type CmsProductField = {
  field?: string;
  value?: string[];
};

const getAccommodationProductId = (post: CmsPost) => {
  const customFieldsData = post.customFieldsData as
    | CmsProductField[]
    | undefined;

  return customFieldsData?.find(
    (item) => item.field === ACCOMMODATION_PRODUCT_FIELD_ID,
  )?.value?.[0];
};

const useRooms = (
  options?: OperationVariables,
): { rooms: IProduct[]; loading: boolean } => {
  const { posts, loading: postsLoading } = useCmsPostsBySlug(
    ACCOMMODATION_CATEGORY_SLUG,
  );
  const productIds = posts
    .map((post) => getAccommodationProductId(post as CmsPost))
    .filter((id): id is string => Boolean(id));

  const { data, loading } = useQuery<{ cpProducts: IProduct[] }>(
    queries.rooms,
    {
      variables: {
        perPage: 1000,
      },
      skip: postsLoading || productIds.length === 0,
      ...options,
    },
  );

  const products = data?.cpProducts ?? [];
  const roomCategoryIds = new Set(
    products
      .filter((product) => productIds.includes(product._id))
      .map((product) => product.categoryId),
  );
  const rooms = products.filter((product) =>
    roomCategoryIds.has(product.categoryId),
  );

  return { rooms, loading: postsLoading || loading };
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

export type ResultRoomPost = CmsPost & {
  availableRooms: IProduct[];
  roomCategoryId: string;
};

export const useResultRooms = (options?: OperationVariables) => {
  const { rooms, loading: roomsLoading } = useRooms();
  const {
    rooms: availableRooms,
    loading: availableRoomsLoading,
    refetch,
  } = useCheckRooms(options);
  const { posts, loading: postsLoading } = useCmsPostsBySlug(
    ACCOMMODATION_CATEGORY_SLUG,
  );

  const resultRoomsPosts: ResultRoomPost[] = posts
    .map((post) => {
      const productId = getAccommodationProductId(post as CmsPost);
      const roomCategoryId =
        rooms.find((room) => room._id === productId)?.categoryId || "";

      return {
        ...(post as CmsPost),
        availableRooms: availableRooms.filter(
          (availableRoom) => availableRoom.categoryId === roomCategoryId,
        ),
        roomCategoryId,
      };
    })
    .filter((post) => post.roomCategoryId && post.availableRooms.length > 0);

  return {
    resultRoomsPosts,
    resultAvailableRooms: resultRoomsPosts.flatMap(
      (post) => post.availableRooms,
    ),
    loading: roomsLoading || availableRoomsLoading || postsLoading,
    refetchResultRooms: refetch,
  };
};
