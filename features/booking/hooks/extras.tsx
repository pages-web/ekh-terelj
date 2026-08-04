import { QueryHookOptions, useQuery } from "@apollo/client";
import queries from "@/features/booking/lib/gql/extras-queries";

export const useGetProducts = (options?: QueryHookOptions) => {
  const { data, loading } = useQuery(queries.extras, options);
  const products = data?.cpProducts || [];
  return { products, loading };
};
