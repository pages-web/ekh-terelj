export function formatNumberWithCommas(
  number: number | null | undefined,
  locale?: string,
) {
  const formatter = new Intl.NumberFormat(locale);
  const value =
    typeof number === "number" && Number.isFinite(number) ? number : 0;

  return formatter.format(value);
}
