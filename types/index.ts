import { QueryOptions } from "@apollo/client";

export interface IPageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface CommonParams {
  variables?: QueryOptions["variables"];
}

export interface IReserveCount {
  adults: number;
  children: number;
  room: number;
  pet?: boolean;
}