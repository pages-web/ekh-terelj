import { OperationVariables, useQuery } from "@apollo/client";
import { queries } from "../graphql/cms";
import {
  ICmsCustomFieldGroup,
  ICmsPost,
  ICustomCmsPost,
  ICustomField,
} from "@/types/cms";
import useRooms from "./rooms";
import { group } from "console";

export const useCmsPosts = (variables?: OperationVariables) => {
  const { data, loading } = useQuery(queries.CmsPosts, {
    variables: {
      clientPortalId: process.env.NEXT_PUBLIC_CP_ID,
      ...variables,
    },
  });

  const posts: ICmsPost[] = data?.cmsPostList.posts || [];

  return { posts, loading };
};

export const useCmsPostDetail = (id: string) => {
  const { data, loading } = useQuery(queries.CmsPostDetail, {
    variables: { id },
  });

  const post: ICmsPost = data?.cmsPost || {};

  return { post, loading };
};

export const useCmsCustomFieldGroups = () => {
  const { data, loading } = useQuery(queries.CmsCustomFieldGroups, {
    variables: { clientPortalId: process.env.NEXT_PUBLIC_CP_ID },
  });

  const customFieldGroups: ICmsCustomFieldGroup[] =
    data?.cmsCustomFieldGroups || [];

  return { customFieldGroups, loading };
};

export const useCustomCmsPosts = () => {
  const { posts } = useCmsPosts({ type: "room" });
  const { customFieldGroups } = useCmsCustomFieldGroups();
  const { rooms } = useRooms();

  const fieldMap: any = {};

  customFieldGroups.forEach((group) => {
    group.fields.forEach((field) => {
      fieldMap[field._id] = {
        ...field,
        groupId: group._id,
        groupLabel: group.label,
      };
    });
  });

  const enrichedPosts: ICustomCmsPost[] = posts.map((post) => {
    const enrichedCustomFields = post.customFieldsData.map((customField) => {
      const fieldDetail = fieldMap[customField.field];
      return {
        ...customField,
        ...(fieldDetail || {}),
      };
    });

    return {
      ...post,
      customFieldsData: enrichedCustomFields,
    };
  });

  const customPosts = enrichedPosts.map((post) => {
    const newCustomFields = post.customFieldsData.map((field) => ({
      ...field,
      ...(field.code === "product" && {
        product: rooms.find((room) => room._id === field.value),
      }),
    }));

    return {
      ...post,
      customFieldsData: newCustomFields,
    };
  });

  return { customPosts };
};

export const useCustomCmsPostDetail = (id: any) => {
  const { post } = useCmsPostDetail(id);
  const { customFieldGroups } = useCmsCustomFieldGroups();
  const { rooms } = useRooms();

  const fieldMap: any = {};

  customFieldGroups.forEach((group) => {
    group.fields.forEach((field) => {
      fieldMap[field._id] = {
        ...field,
        groupId: group._id,
        groupLabel: group.label,
      };
    });
  });

  const enrichSinglePost = (
    post: ICmsPost,
    fieldMap: Record<string, ICustomField & ICmsCustomFieldGroup>
  ): ICustomCmsPost => {
    const enrichedCustomFields = post.customFieldsData?.map((customField) => {
      const fieldDetail = fieldMap[customField.field];
      return {
        ...customField,
        ...(fieldDetail || {}),
      };
    });

    return {
      ...post,
      customFieldsData: enrichedCustomFields,
    };
  };

  const enrichedPost = enrichSinglePost(post, fieldMap);

  const enrichSinglePostWithProduct = (post: ICustomCmsPost) => {
    const newCustomFields = post.customFieldsData?.map((field) => ({
      ...field,
      ...(field.code === "product" && {
        product: rooms.find((room) => room._id === field.value),
      }),
    }));

    return {
      ...post,
      customFieldsData: newCustomFields,
    };
  };

  const customPost = enrichSinglePostWithProduct(enrichedPost);

  return { customPost };
};
