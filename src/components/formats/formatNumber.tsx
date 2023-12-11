import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber, type Notation } from "@/lib/format";

interface FormatNumberProps {
  value: string | number;
  unit?: string | undefined;
  isLoading?: boolean;
  decimal?: number;
  precision?: number;
  asBlockElement?: boolean;
  maxFractionDigits?: number;
  minFractionDigits?: number;
  notation?: Notation;
  spaceWithUnit?: boolean;
  skeletonBg?: string;
  skeletonClass?: string;
  numberClass?: string;
}

const FormatNumber = ({
  value,
  unit = "",
  isLoading = false,
  decimal = 0,
  precision = 6,
  asBlockElement = false,
  maxFractionDigits = 2,
  minFractionDigits = 2,
  notation = "compact",
  spaceWithUnit = false,
  skeletonBg = "bg-slate-600",
  skeletonClass = "w-30 h-10",
  numberClass,
}: FormatNumberProps) => {
  const shortString =
    value !== undefined
      ? (unit === "$" ? (spaceWithUnit ? `${unit} ` : `${unit}`) : "") +
        formatNumber(
          Number(value) / 10 ** decimal,
          precision,
          maxFractionDigits,
          minFractionDigits,
          notation
        ) +
        (unit !== "" && unit !== "$"
          ? spaceWithUnit
            ? ` ${unit}`
            : `${unit}`
          : "")
      : "0.00";

  return (
    <>
      {isLoading ? (
        <Skeleton className={`${skeletonBg} ${skeletonClass}`} />
      ) : (
        <span className={`${numberClass}`}>{shortString}</span>
      )}
    </>
  );
};

export default FormatNumber;
