import { QueryHookOptions, useQuery } from "@apollo/client";
import { queries } from "../graphql/extras";
import { useAtomValue } from "jotai";
import { currentConfigAtom } from "@/store/config";

export const useGetUoms = (options?: QueryHookOptions) => {
  const { data, loading } = useQuery(queries.uoms, options);
  const uoms = data?.uoms || [];
  return { uoms, loading };
};

export const useGetProducts = (options?: QueryHookOptions) => {
  const { data, loading } = useQuery(queries.extras, options);
  const products = data?.products || [];
  return { products, loading };
};

export const useGetCategories = (options?: QueryHookOptions) => {
  const currentConfig = useAtomValue(currentConfigAtom);
  const { data, loading } = useQuery(queries.categories, {
    variables: { parentId: currentConfig?.extraProductCategories[0] },
    ...options,
  });
  const categories = data?.productCategories || [];
  return { categories, loading };
};
