import { formatToDate, getDateRangeWithCurrent, parseDate } from "@/lib/date";
import { addDays, subDays } from "date-fns";
import { create } from "zustand";

type View = "status" | "group" | "payment" | "guests";

interface TableDateStore {
  date: string;
  setDate: (date: string) => void;
  changeDate: (direction: "prev" | "next") => void;
  dateRange: Date[];
}

interface TableRoomTypeStore {
  showRoomType: boolean;
  setShowRoomType: (showRoomType: boolean) => void;
}

interface TableViewStore {
  view: View;
  setView: (view: View) => void;
}

interface TableCategoryAccordionStore {
  closedCategory: string[];
  changeCategory: (category: string) => void;
}

export const useTableDate = create<TableDateStore>((set, get) => ({
  date: formatToDate(new Date()),
  dateRange: getDateRangeWithCurrent(parseDate(formatToDate(new Date()))),
  setDate: (date: string) =>
    set({
      date,
      dateRange: getDateRangeWithCurrent(parseDate(date)),
    }),
  changeDate: (direction: "prev" | "next") =>
    set((state) => {
      const newDate = formatToDate(
        direction === "prev"
          ? subDays(parseDate(state.date), 1)
          : addDays(parseDate(state.date), 1)
      );
      return {
        date: newDate,
        dateRange: getDateRangeWithCurrent(parseDate(newDate)),
      };
    }),
}));

export const useTableRoomType = create<TableRoomTypeStore>((set) => ({
  showRoomType: false,
  setShowRoomType: (showRoomType: boolean) => set({ showRoomType }),
}));

export const useTableView = create<TableViewStore>((set) => ({
  view: "status",
  setView: (view: View) => set({ view }),
}));

export const useTableCategoryAccordion = create<TableCategoryAccordionStore>(
  (set) => ({
    closedCategory: [],
    changeCategory: (category: string) =>
      set((state) => {
        const closedCategory = state.closedCategory;
        if (closedCategory.includes(category)) {
          return {
            closedCategory: closedCategory.filter((c) => c !== category),
          };
        }
        return { closedCategory: [...closedCategory, category] };
      }),
  })
);
