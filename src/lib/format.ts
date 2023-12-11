export type Notation = "standard" | "scientific" | "engineering" | "compact";

export function formatNumber(
  number: number,
  precision = 2,
  maxFractionDigits = 2,
  minFractionDigits = 2,
  notation: Notation = "compact"
) {
  const roundedNumber = Number(number).toFixed(precision);
  // TODO: internationalization
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
    notation,
  });
  return formatter.format(parseFloat(roundedNumber));
}

export const shortenAddress = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};
