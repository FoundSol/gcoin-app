"use client";

import Section from "@/components/common/Section";
import { formatNumber } from "@/lib/numbers";
import { getContractAddresses } from "@/lib/wagmi";
import { useErc20BalanceOf, useErc20Symbol } from "@/lib/wagmiHooks";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { BsArrowDown } from "react-icons/bs";
import { useAccount } from "wagmi";

const EmptyBalance = () => <span className="text-gray-400">&mdash;</span>;

const ClickableBalanceLabel = ({
  ownerAddress,
  tokenAddress,
  onClick,
}: {
  ownerAddress: `0x${string}`;
  tokenAddress: `0x${string}`;
  onClick?: (_: string) => void;
}) => {
  const { data, isLoading, isSuccess, error } = useErc20BalanceOf({
    address: tokenAddress,
    args: [ownerAddress],
  });
  const value = String(Number(data ?? 0) / 1e18);

  const handleClick = () => {
    if (isSuccess && onClick != undefined) onClick(value);
  };

  return isSuccess ? (
    <a
      className={classNames(
        { "cursor-pointer": onClick != undefined },
        "text-purple-300"
      )}
      onClick={handleClick}
    >
      {formatNumber(data, { decimals: 18 })}
    </a>
  ) : (
    <EmptyBalance />
  );
};

export default function TradeForm() {
  const account = useAccount();
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const inputAddress = getContractAddresses().Erc20PresetMinterPauser;
  const outputAddress = getContractAddresses().GCoin;
  const inputSymbol = useErc20Symbol({
    address: inputAddress,
  });

  useEffect(() => {
    setOutputValue(inputValue);
  }, [inputValue]);

  return (
    <Section className="w-full max-w-md mb-8">
      <form className="w-full flex flex-col items-center gap-4">
        <h1 className="w-full text-3xl">Mint GCOIN</h1>

        <div className="w-full rounded-md bg-black bg-opacity-50 p-4 flex flex-col gap-2 focus-within:outline-purple-400 focus-within:outline focus-within:outline-2">
          <div className="flex justify-between text-sm">
            <label className="text-gray-400">Your Balance</label>

            {!!account.address ? (
              <ClickableBalanceLabel
                onClick={setInputValue}
                ownerAddress={account.address}
                tokenAddress={inputAddress}
              />
            ) : (
              <EmptyBalance />
            )}
          </div>

          <div className="flex text-2xl">
            <input
              type="number"
              placeholder="0"
              className="bg-transparent w-full focus:outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              maxLength={40}
              autoComplete="off"
            />

            <label className="text-white">{inputSymbol?.data}</label>
          </div>
        </div>

        <BsArrowDown />

        <div className="w-full rounded-md bg-black bg-opacity-50 p-4 flex flex-col gap-2 focus-within:outline-purple-400 focus-within:outline focus-within:outline-2">
          <div className="flex justify-between text-sm">
            <label className="text-gray-400">GCOIN Balance</label>

            {!!account.address ? (
              <ClickableBalanceLabel
                ownerAddress={account.address}
                tokenAddress={outputAddress}
              />
            ) : (
              <EmptyBalance />
            )}
          </div>

          <div className="flex text-2xl">
            <input
              type="number"
              placeholder="0"
              className="bg-transparent w-full focus:outline-none"
              value={outputValue}
              onChange={(e) => setOutputValue(e.target.value)}
              maxLength={40}
              autoComplete="off"
            />

            <label className="text-white">GCOIN</label>
          </div>
        </div>

        <input
          type="submit"
          className="cursor-pointer mt-4 rounded-md w-full p-4 bg-purple-500 bg-opacity-50 focus:outline-none"
          value="Swap"
        />
      </form>
    </Section>
  );
}
