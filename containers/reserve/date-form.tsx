"use client";
import { useAtom } from "jotai";
import { reserveDateAtom, selectedRoomsAtom } from "@/store/reserve";
import { Calendar } from "@/components/ui/calendar";

const DateForm = () => {
  const [date, setDate] = useAtom(reserveDateAtom);
  const [selectedRooms, setSelectedRooms] = useAtom(selectedRoomsAtom);

  function getYesterdayDate() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday; // Format as needed
  }

  function resetSelectionAndSetDate(newDate: any) {
    setSelectedRooms([]); // Reset selected rooms
    setDate(newDate); // Update the date
  }

  return (
    <Calendar
      initialFocus
      mode="range"
      defaultMonth={date?.from}
      selected={date}
      onSelect={(newDate) => resetSelectionAndSetDate(newDate)}
      numberOfMonths={1}
      disabled={(activeDate) => activeDate < getYesterdayDate()}
    />
  );
};
export default DateForm;
