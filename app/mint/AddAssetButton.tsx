"use client";

import ClientOnly from "@/components/common/ClientOnly";
import { getContractAddresses } from "@/lib/wagmi";
import { getWalletClient } from "@wagmi/core";
import { BsWallet2 } from "react-icons/bs";
import { useAccount } from "wagmi";

export default function AddAssetButton() {
  const userAccount = useAccount();
  if (!userAccount.isConnected) {
    return null;
  }

  const outputAddress = getContractAddresses().GCoin;

  // Add token to wallet
  const handleAddAsset = async () => {
    const walletClient = await getWalletClient();
    walletClient?.watchAsset({
      type: "ERC20",
      options: {
        address: outputAddress,
        symbol: "GCOIN",
        decimals: 18,
      },
    });
  };

  return (
    <ClientOnly>
      <div className="text-right">
        <div
          className="inline-flex items-center gap-2 cursor-pointer hover:underline"
          onClick={handleAddAsset}
        >
          <BsWallet2 />
          Add GCOIN to Wallet
        </div>
      </div>
    </ClientOnly>
  );
}
