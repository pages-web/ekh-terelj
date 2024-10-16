"use client";

import { ReactNode } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const httpLink: any = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_MAIN_API_DOMAIN}/graphql`,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "Access-Control-Allow-Origin": (
        process.env.NEXT_PUBLIC_MAIN_API_DOMAIN || ""
      ).replace("/gateway", ""),
      "erxes-app-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOnsibmFtZSI6InhtIiwiY3JlYXRlZEF0IjoiMjAyNC0xMC0xNlQwNzoxMToyNi4xMDJaIiwidXNlckdyb3VwSWQiOiJzbldtWlhGQzNiLW1PZXE4Z2RlclgiLCJleHBpcmVEYXRlIjoiMjAyNC0xMS0xNVQxMDo1Njo1MC40NDBaIiwibm9FeHBpcmUiOnRydWUsImFsbG93QWxsUGVybWlzc2lvbiI6dHJ1ZSwiX2lkIjoiWGFfY0JRNGtLRU1GeF9uYWRtWGN3IiwiX192IjowfSwiaWF0IjoxNzI5MDc2MjE3fQ.yWsfom319r_bMe2aJ_qBhVkFprOibeLlrh1AV2V-N-8",
    },
  };
});

const wsLink: any =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: process.env.NEXT_PUBLIC_MAIN_SUBS_DOMAIN || "",
        })
      )
    : null;

const httpLinkWithMiddleware = authLink.concat(httpLink);

type Definintion = {
  kind: string;
  operation?: string;
};
const splitLink =
  typeof window !== "undefined"
    ? split(
        ({ query }) => {
          const { kind, operation }: Definintion = getMainDefinition(query);
          return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink,
        httpLinkWithMiddleware
      )
    : httpLinkWithMiddleware;

export const client = new ApolloClient({
  ssrMode: typeof window !== "undefined",
  cache: new InMemoryCache(),
  link: splitLink,
});

const Apollo = ({ children }: { children: ReactNode }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default Apollo;
