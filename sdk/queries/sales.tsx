import { MutationHookOptions, useMutation, useQuery } from "@apollo/client";
import { queries, mutations } from "../graphql/sales";
import {
  addDays,
  differenceInCalendarDays,
  isToday,
  startOfDay,
  subDays,
} from "date-fns";
import { IDeal, IDealDetail, IDealProduct, IStage, IStay } from "@/types/sales";
import { BookingFormT } from "@/lib/schema/types";
import { formatToDate, parseDate } from "@/lib/date";
import useRooms from "./rooms";
import { useTableDate } from "@/store/tableView.store";
import { useParams, useRouter } from "next/navigation";

const useDeals = () => {
  const middleDate = startOfDay(useTableDate().date);

  const { data, loading } = useQuery(queries.deals, {
    variables: {
      pipelineId: process.env.NEXT_PUBLIC_PIPELINE_ID,
      startDateStartDate: subDays(middleDate, 15),
      startDateEndDate: addDays(middleDate, 15),
      closeDateStartDate: subDays(middleDate, 15),
      closeDateEndDate: addDays(middleDate, 15),
    },
  });

  const deals = data?.pmsRooms ?? [];

  const stays: IStay[] = [];

  deals.forEach((deal: IDeal) => {
    const rooms = deal.products.filter(
      (product: IDealProduct) => product.uom === "day"
    );
    rooms.forEach((room: IDealProduct) => {
      const roomId = room.product._id;
      const stageCode = deal.stage.code;

      stays.push({
        _id: room._id,
        dealId: deal._id,
        name: deal.name,
        roomId,
        startDate: room.startDate,
        endDate: room.endDate,
        stageCode,
        roomTypes: [],
        deal,
      });
    });
  });

  return { stays, loading };
};

export const useStages = () => {
  const { data, loading } = useQuery(queries.stages, {
    variables: {
      pipelineId: process.env.NEXT_PUBLIC_PIPELINE_ID,
    },
  });
  return { stages: data?.salesStages, loading };
};

export const useCreateEditDeal = (dealDetail: IDealDetail) => {
  const router = useRouter();
  const { dealId } = useParams();
  const options: MutationHookOptions = {
    onError(error) {
      console.log(error);
    },
    onCompleted(data) {
      const { _id } = data.dealsAdd || data.dealsEdit;
      router.push(`/booking/${_id}`);
    },
  };
  const [addDeal, { loading }] = useMutation(mutations.dealsAdd, options);
  const { editDeal, loading: editLoading } = useEditDeal(options, dealDetail);
  const { rooms: allRooms, loading: roomsLoading } = useRooms();
  const { stages, loading: stagesLoading } = useStages();
  const cuDeal = (values: BookingFormT) => {
    const mapRooms = (room: BookingFormT["rooms"][0]) => {
      const nights = differenceInCalendarDays(
        parseDate(room.endDate),
        parseDate(room.startDate)
      );
      const roomDetail = allRooms.find((r) => r._id === room.roomId);
      return {
        productId: room.roomId,
        startDate: room.startDate,
        endDate: room.endDate,
        unitPrice: room.unitPrice,
        quantity: nights,
        amount: room.unitPrice * nights,
        name: roomDetail?.name,
        uom: roomDetail?.uom,
        information: {
          adults: room.guests.filter((customer) => !customer.isChild).length,
          children: room.guests.filter((customer) => customer.isChild).length,
        },
      };
    };

    const mapExtras = (room: BookingFormT["rooms"][0]) =>
      room.extras.map((extra) => ({
        productId: extra.productId,
        quantity: extra.count,
        name: extra.productName,
        unitPrice: extra.unitPrice,
        amount: extra.unitPrice * extra.count,
        information: {
          parentId: room.roomId,
        },
      }));

    const rooms = values.rooms.map(mapRooms);
    const extras = values.rooms.flatMap(mapExtras);

    const getDateExtreme = (
      compareFn: (a: Date, b: Date) => boolean,
      dateField: "startDate" | "endDate"
    ) =>
      values.rooms.reduce((extreme, room) => {
        const currentDate = parseDate(room[dateField]);
        return compareFn(currentDate, extreme) ? currentDate : extreme;
      }, parseDate(values.rooms[0][dateField]));

    const startDate = getDateExtreme((a, b) => a < b, "startDate");
    const closeDate = getDateExtreme((a, b) => a > b, "endDate");

    const variables = {
      name: values.customers
        .slice(0, 2)
        .map((customer) => customer.fullname)
        .join(", "),
      customerIds: values.customers.map((customer) => customer.customerId),
      productsData: [...rooms, ...extras],
      stageId: dealDetail?.stageId
        ? dealDetail.stageId
        : stages.find((st: IStage) => st.code === "future")?._id,
      startDate,
      closeDate,
      labelIds: values.source ? [values.source] : undefined,
      description: values.description,
    };

    if (dealId && dealId !== "create") {
      editDeal({ ...variables, id: dealId });
    } else {
      addDeal({ variables });
    }
  };

  return {
    cuDeal,
    loading: loading || roomsLoading || stagesLoading || editLoading,
  };
};

const productsToVariables = (products: IDealProduct[]) => {
  return products.map((product) => ({
    productId: product.productId,
    unitPrice: product.unitPrice,
    quantity: product.quantity,
    amount: product.amount,
    name: product.name,
    uom: product.uom,
    information: product.information,
    ...(product.uom === "day" && {
      startDate: formatToDate(product.startDate),
      endDate: formatToDate(product.endDate),
    }),
  }));
};

const sortAndStringifyProducts = (
  products: ReturnType<typeof productsToVariables>
) =>
  JSON.stringify(
    products
      .map((product) => {
        const keys = Object.keys(product).sort();
        const sortedProduct: any = {};
        keys.forEach((key) => {
          sortedProduct[key] = product[key as keyof typeof product];
        });
        return sortedProduct;
      })
      .sort((a, b) => {
        return a.productId.localeCompare(b.productId);
      })
  );

export const useEditDeal = (
  options: MutationHookOptions,
  dealDetail: IDealDetail
) => {
  const [editDeal, { loading: editLoading }] = useMutation(
    mutations.dealsEdit,
    options
  );
  const { changeLabel } = useChangeLabel();
  const { conformityEdit } = useConformityEdit();

  const { labelIds, customers, name, description, products } = dealDetail || {};

  const handleEditDeal = (variables: MutationHookOptions["variables"]) => {
    const handleEdit = () => {
      if (
        name !== variables?.name ||
        labelIds[0] !== variables?.labelIds[0] ||
        description !== variables?.description ||
        sortAndStringifyProducts(productsToVariables(products)) !==
          sortAndStringifyProducts(variables?.productsData)
      ) {
        return editDeal({ variables });
      }
      options?.onCompleted &&
        options?.onCompleted({ dealsEdit: { _id: variables.id } });
    };

    const handleChangeUsers = () =>
      JSON.stringify(customers.map((customer) => customer._id)) !==
      JSON.stringify(variables?.customerIds)
        ? conformityEdit({
            variables: {
              mainType: "deal",
              mainTypeId: dealDetail._id,
              relType: "customer",
              relTypeIds: variables?.customerIds,
            },
            onCompleted: handleEdit,
          })
        : handleEdit();

    if (labelIds[0] !== variables?.labelIds[0]) {
      changeLabel({
        variables: {
          labelIds: variables?.labelIds,
          targetId: variables?.id,
        },
        onCompleted: handleChangeUsers,
      });
    }

    return handleChangeUsers();
  };
  return { editDeal: handleEditDeal, loading: editLoading };
};

export const useChangeLabel = (options?: MutationHookOptions) => {
  const [changeLabel, { loading }] = useMutation(
    mutations.changeLabel,
    options
  );

  const handleChangeLabel = (options: MutationHookOptions) => {
    changeLabel({
      ...options,
      variables: {
        ...options.variables,
        pipelineId: process.env.NEXT_PUBLIC_PIPELINE_ID,
      },
    });
  };

  return { changeLabel: handleChangeLabel, loading };
};

export const useConformityEdit = (options?: MutationHookOptions) => {
  const [conformityEdit, { loading }] = useMutation(
    mutations.conformityEdit,
    options
  );

  return { conformityEdit, loading };
};

export default useDeals;
