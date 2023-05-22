"use client";

import { getContractAddresses } from "@/lib/wagmi";
import { useErc20Symbol, useGCoinGetGCoinValue } from "@/lib/wagmiHooks";

export default function GCoinPriceRate() {
  const gcoinValueResult = useGCoinGetGCoinValue({
    watch: true,
  });
  const inputAddress = getContractAddresses().Erc20PresetMinterPauser;
  const inputSymbolResult = useErc20Symbol({
    address: inputAddress,
  });

  return (
    <>{`1 GCOIN = ${Number(gcoinValueResult.data) / 1e18} ${
      inputSymbolResult.data
    }`}</>
  );
}
