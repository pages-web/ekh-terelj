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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOnsibmFtZSI6ImFkbWluIiwiY3JlYXRlZEF0IjoiMjAyNC0xMC0yM1QxMjoyNDoyNy4wMDRaIiwidXNlckdyb3VwSWQiOiIiLCJleHBpcmVEYXRlIjoiMjAyNC0xMS0yMlQxMjo0OTowNS44NThaIiwibm9FeHBpcmUiOnRydWUsImFsbG93QWxsUGVybWlzc2lvbiI6dHJ1ZSwiX2lkIjoiUk13S0RPUGk5akozdjVVNDJweVNyIiwiX192IjowfSwiaWF0IjoxNzI5Njg3NzUyfQ.bju-7tdUywPb0wEnUkw256PYQ2cbQilfTjTX_U-prnA",
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
