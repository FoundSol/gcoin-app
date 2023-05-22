"use client";

import { formatNumberUSD } from "@/lib/numbers";
import { useGCoinGetGCoinValue, useGCoinTotalSupply } from "@/lib/wagmiHooks";

export default function GCoinMarketCap() {
  const gcoinValue = useGCoinGetGCoinValue({ watch: true });
  const gcoinSupply = useGCoinTotalSupply({ watch: true });
  const gcoinUsd = Number(gcoinValue?.data ?? 0) / 1e18;
  const gcoinMarketCap =
    (Number(gcoinSupply?.data ?? BigInt(0)) / 1e18) * gcoinUsd;
  return <>{formatNumberUSD(gcoinMarketCap, 0)}</>;
}
