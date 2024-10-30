import { useMutation } from "@apollo/client";
import { mutations } from "../graphql/customers";

const useCreateCustomer = () => {
  const [createCustomer, { loading, data, error }] = useMutation(
    mutations.customerAdd
  );

  const { _id } = data?.customersAdd || {};

  return { createCustomer, loading, _id, error };
};

export default useCreateCustomer;
