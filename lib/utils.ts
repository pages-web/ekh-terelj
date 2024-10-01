import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const READ_FILE = "/read-file?key=";

export const ERXES_SASS = "erxes-saas/";

export const readFile = (url: string = "") => {
  if (url.startsWith(ERXES_SASS))
    return process.env.NEXT_PUBLIC_MAIN_API_DOMAIN + READ_FILE + url;

  if (url.includes(READ_FILE)) {
    const apiUrl = url.split(READ_FILE)[0];
    return url.replace(apiUrl, process.env.NEXT_PUBLIC_MAIN_API_DOMAIN || "");
  }
  return url;
};
