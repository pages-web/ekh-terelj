"use client";

import { type Atom, Provider as JotaiProvider, useAtomValue } from "jotai";
import ApolloProvider from "@/app/[locale]/ApolloClient";
import { selectAtom } from "jotai/utils";

export function useSelectAtom(
  anAtom: Atom<unknown>,
  keyFn: (v: unknown, prevSlice?: unknown) => unknown
) {
  return useAtomValue(selectAtom(anAtom, keyFn));
}

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <JotaiProvider>
      <ApolloProvider>{children}</ApolloProvider>
    </JotaiProvider>
  );
};

export default Providers;
