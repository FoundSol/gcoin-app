export const formatNumberUSD = (number: any, digits: number = 2) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(number);
};

export const formatNumber = (
  number: any,
  opts?: { digits?: number; decimals?: number }
) => {
  opts = opts ?? { decimals: 0 };
  opts.decimals = opts.decimals ?? 0;

  let n = number;
  if (typeof number !== "number") {
    n = Number(n);
  }
  n /= Math.pow(10, opts.decimals);
  const maximumFractionDigits =
    typeof opts.digits === "undefined" ? (number < 1 ? 8 : 4) : opts.digits;
  return Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(n);
};
