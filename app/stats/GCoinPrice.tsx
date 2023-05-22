"use client";

import { formatNumberUSD } from "@/lib/numbers";
import { useGCoinGetGCoinValue } from "@/lib/wagmiHooks";

export default function GCoinPrice() {
  const gcoinValue = useGCoinGetGCoinValue({
    watch: true,
  });

  const gcoinUsd = Number(gcoinValue.data ?? 0) / 1e18;
  return <>{formatNumberUSD(gcoinUsd, 4)}</>;
}
