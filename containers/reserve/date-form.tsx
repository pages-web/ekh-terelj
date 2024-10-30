"use client";
import { useAtom } from "jotai";
import { reserveDateAtom } from "@/store/reserve";
import { Calendar } from "@/components/ui/calendar";

const DateForm = () => {
  const [date, setDate] = useAtom(reserveDateAtom);
  function getYesterdayDate() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday; // Format as needed
  }
  console.log(date)

  return (
    <Calendar
      initialFocus
      mode="range"
      defaultMonth={date?.from}
      selected={date}
      onSelect={setDate}
      numberOfMonths={2}
      disabled={(activeDate) => activeDate < getYesterdayDate()}
    />
  );
};
export default DateForm;
