import { DateRange } from "react-day-picker";

export interface IReserveUser {
  speaking?: string;
  firstname?: string;
  lastname?: string;
  mail?: string;
  phone?: any;
  description?: string;
}

export interface IReserveGuestAndRoom {
  adults: number;
  children: number;
  room: number;
  pet?: boolean;
}

export interface IReserveInfo extends IReserveGuestAndRoom {
  to?: DateRange;
  from?: DateRange;
  nights: number;
}
