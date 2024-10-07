"use client";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPin, Minus, Plus } from "lucide-react";
import { useAtom } from "jotai";
import { reserveDateAtom } from "@/store/reserve";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const DateForm = () => {
  const [date, setDate] = useAtom(reserveDateAtom);

  return (
    <Calendar
      initialFocus
      mode="range"
      defaultMonth={date?.from}
      selected={date}
      onSelect={setDate}
      numberOfMonths={2}
    />
  );
};
export default DateForm;
