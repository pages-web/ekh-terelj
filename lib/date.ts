import { addDays, subDays, eachDayOfInterval, parse, format } from "date-fns";

export function getDateRangeWithCurrent(date: Date): Date[] {
  const dateRange = eachDayOfInterval({
    start: subDays(date, 15),
    end: addDays(date, 15),
  });
  return dateRange;
}

export const FORMAT = "yyyy-MM-dd";

export const parseDate = (value?: string) =>
  parse(value || formatToDate(new Date()), FORMAT, new Date());

export const formatToDate = (value?: Date, middle: string | undefined = "-") =>
  format(value || new Date(), FORMAT.replaceAll("-", middle));
