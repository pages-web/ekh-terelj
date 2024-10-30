import { useLazyQuery } from "@apollo/client";
import { queries } from "../graphql/customers";

const useCustomers = () => {
  const [getCustomers, { data, loading }] = useLazyQuery(queries.customers);
  const customers = data?.customers || [];
  return { getCustomers, customers, loading };
};

export default useCustomers;
