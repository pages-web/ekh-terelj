import { useLocale } from "next-intl";

export function formatNumberWithCommas(number: number) {
  const locale = useLocale();
  const formatter = new Intl.NumberFormat(locale);
  return formatter.format(number);
}
