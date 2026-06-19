"use client";
import { useAtom } from "jotai";
import { reserveDateAtom } from "@/features/booking/store/reserve";
import { Calendar } from "@/components/ui/calendar";
import { selectedRoomsAtom } from "@/features/booking/store/rooms";
import { DateRange } from "react-day-picker";

type DateFormMode = "range" | "check-in" | "check-out";

type DateFormProps = {
  mode?: DateFormMode;
};

const toDate = (value: Date | string | null | undefined) => {
  if (!value) return undefined;
  return value instanceof Date ? value : new Date(value);
};

const startOfDay = (value: Date) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

const isSameOrBefore = (date: Date, compareDate: Date) =>
  startOfDay(date).getTime() <= startOfDay(compareDate).getTime();

const DateForm = ({ mode = "range" }: DateFormProps) => {
  const [date, setDate] = useAtom(reserveDateAtom);
  const [selectedRooms, setSelectedRooms] = useAtom(selectedRoomsAtom);
  const from = toDate(date?.from);
  const to = toDate(date?.to);

  function getYesterdayDate() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday; // Format as needed
  }

  function resetSelectionAndSetDate(newDate?: DateRange) {
    setSelectedRooms([]); // Reset selected rooms
    setDate(newDate || { from: null, to: null }); // Update the date
  }

  function handleCheckInSelect(selectedDate?: Date) {
    if (!selectedDate) return;

    resetSelectionAndSetDate({
      from: selectedDate,
      to: to && isSameOrBefore(to, selectedDate) ? undefined : to,
    });
  }

  function handleCheckOutSelect(selectedDate?: Date) {
    if (!selectedDate) return;

    resetSelectionAndSetDate({
      from,
      to: selectedDate,
    });
  }

  if (mode === "check-in") {
    return (
      <Calendar
        initialFocus
        mode="single"
        defaultMonth={from}
        selected={from}
        onSelect={handleCheckInSelect}
        numberOfMonths={1}
        disabled={(activeDate) => activeDate < getYesterdayDate()}
      />
    );
  }

  if (mode === "check-out") {
    return (
      <Calendar
        initialFocus
        mode="single"
        defaultMonth={to || from}
        selected={to}
        onSelect={handleCheckOutSelect}
        numberOfMonths={1}
        disabled={(activeDate) =>
          from
            ? isSameOrBefore(activeDate, from)
            : activeDate < getYesterdayDate()
        }
      />
    );
  }

  return (
    <Calendar
      initialFocus
      mode="range"
      defaultMonth={from}
      selected={{ from, to }}
      onSelect={(newDate) => resetSelectionAndSetDate(newDate)}
      numberOfMonths={1}
      disabled={(activeDate) => activeDate < getYesterdayDate()}
    />
  );
};
export default DateForm;
