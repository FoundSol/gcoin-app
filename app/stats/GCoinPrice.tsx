"use client";

import { GCOIN_DECIMALS } from "@/lib/constants";
import { formatNumberUSD } from "@/lib/numbers";
import { useGCoinGetGCoinValue } from "@/lib/wagmiHooks";

export default function GCoinPrice() {
  const gcoinValue = useGCoinGetGCoinValue({
    watch: true,
  });
  const gcoinDenominator = Math.pow(10, GCOIN_DECIMALS);

  const gcoinUsd = Number(gcoinValue.data ?? 0) / gcoinDenominator;
  return <>{formatNumberUSD(gcoinUsd, 4)}</>;
}
