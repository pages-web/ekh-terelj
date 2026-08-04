import { ApolloError } from "@apollo/client";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const READ_FILE = "/read-file?key=";

export const ERXES_SASS = "erxes-saas/";
export const ERXES_READ_FILE_URL =
  "https://ekhterelj-w917z.next.erxes.io/gateway/read-file?key=";

export const readFile = (url: string = "") => {
  const trimmedUrl = url.trim();

  if (!trimmedUrl) return "";
  if (trimmedUrl.startsWith("/") || /^https?:\/\//.test(trimmedUrl)) {
    return trimmedUrl;
  }

  return ERXES_READ_FILE_URL + encodeURIComponent(trimmedUrl);
};

export const onError = (error: ApolloError) => toast.error(error.message);
