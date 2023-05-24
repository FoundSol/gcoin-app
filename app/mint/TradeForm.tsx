"use client";

import { GCOIN_DECIMALS, USDC_DECIMALS } from "@/lib/constants";
import { getContractAddresses } from "@/lib/wagmi";
import {
  gCoinABI,
  gCoinAddress,
  useErc20BalanceOf,
  useErc20Decimals,
  useErc20Symbol,
  useGCoinPaused,
} from "@/lib/wagmiHooks";
import {
  useAddRecentTransaction,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import {
  erc20ABI,
  readContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import classNames from "classnames";
import Image from "next/image";
import { FormEventHandler, useEffect, useState } from "react";
import { BsArrowDown } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useAccount } from "wagmi";
import gcoinSvg from "../img/gcoin.svg";
import usdcSvg from "../img/usdc.svg";
import ClickableBalanceLabel from "./ClickableBalanceLabel";

enum FormState {
  READY,
  LOADING,
  DISABLED,
}

export default function TradeForm() {
  const userAccount = useAccount();

  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const inputAddress = getContractAddresses().Usdc;
  const outputAddress = getContractAddresses().GCoin;
  const inputSymbolResult = useErc20Symbol({
    address: inputAddress,
  });
  const inputDecimalsResult = useErc20Decimals({
    address: inputAddress,
  });
  const inputDenominator = Math.pow(
    10,
    inputDecimalsResult.data ?? USDC_DECIMALS
  );
  const outputDenominator = Math.pow(10, GCOIN_DECIMALS);

  const [formState, setFormState] = useState(FormState.DISABLED);
  useEffect(() => {
    if (userAccount.isDisconnected) {
      setFormState(FormState.DISABLED);
    } else {
      validateInput();
    }
  }, [userAccount.isDisconnected]);

  // User balances
  const inputBalanceResult = useErc20BalanceOf(
    !!userAccount.address
      ? {
          address: inputAddress,
          args: [userAccount.address],
          watch: true,
        }
      : undefined
  );
  const setToMax = () =>
    setInputValue(String(Number(inputBalanceResult.data) / inputDenominator));

  const outputBalanceResult = useErc20BalanceOf(
    !!userAccount.address
      ? {
          address: outputAddress,
          args: [userAccount.address],
          watch: true,
        }
      : undefined
  );

  const [needsAllowance, setNeedsAllowance] = useState(false);
  const refetchBalances = () => {
    inputBalanceResult.refetch();
    outputBalanceResult.refetch();
  };

  const checkAllowance = async () => {
    const value = BigInt(Number(inputValue) * inputDenominator);
    if (!!userAccount.address && !!value) {
      try {
        const allowance = await readContract({
          address: inputAddress,
          abi: erc20ABI,
          functionName: "allowance",
          args: [userAccount.address, gCoinAddress],
        });
        setNeedsAllowance(allowance < value);
      } catch (err) {
        console.warn(`allowance`, err);
      }
    }
  };

  const getExpectedOutput = async (value: bigint) => {
    try {
      const output = await readContract({
        address: gCoinAddress,
        abi: gCoinABI,
        functionName: "getGCoinOutputFromStable",
        args: [inputAddress, value],
      });
      setOutputValue(String(Number(output) / outputDenominator));
      if (inputBalanceResult.data != null && value <= inputBalanceResult.data) {
        setFormState(FormState.READY);
      }
    } catch (err) {
      console.warn(`getGCoinOutputFromStable`, err);
    }
  };

  // Disable form if paused
  const gcoinPausedResult = useGCoinPaused();
  useEffect(() => {
    if (gcoinPausedResult.data) {
      setFormState(FormState.DISABLED);
    }
  }, [gcoinPausedResult.data]);

  // Validate form when input is changed
  const validateInput = () => {
    if (userAccount.isConnected && !inputValue) {
      setFormState(FormState.DISABLED);
      setOutputValue("");
      return;
    }

    const value = BigInt(Number(inputValue) * inputDenominator);
    if (value <= 0) {
      setFormState(FormState.DISABLED);
      return;
    }

    getExpectedOutput(value);

    if (inputBalanceResult.data != null && value > inputBalanceResult.data) {
      setFormState(FormState.DISABLED);
      return;
    }

    checkAllowance();
  };
  useEffect(validateInput, [inputValue]);

  // Form submission
  const { openConnectModal } = useConnectModal();
  const addRecentTransaction = useAddRecentTransaction();
  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    // Connect if needed
    if (!userAccount.isConnected) {
      if (openConnectModal) {
        openConnectModal();
      }
      return;
    }

    if (!inputValue) {
      return;
    }

    const value = BigInt(Number(inputValue) * inputDenominator);
    if (value < 0) return;

    setFormState(FormState.LOADING);

    if (needsAllowance) {
      // tx: approve
      try {
        const { hash } = await writeContract({
          address: inputAddress,
          abi: gCoinABI,
          functionName: "approve",
          args: [gCoinAddress, value],
        });
        addRecentTransaction({
          hash,
          description: `Approve ${inputSymbolResult?.data}`,
        });

        console.log(`approve`, hash);
        const data = await waitForTransaction({
          hash,
        });
        console.log(`approve`, data);
      } catch (error) {
        console.warn(`approve`, error);
        setFormState(FormState.READY);
        return;
      }
    }

    // tx: stableCoinToGCoin
    try {
      const { hash } = await writeContract({
        address: gCoinAddress,
        abi: gCoinABI,
        functionName: "stableCoinToGCoin",
        args: [inputAddress, value],
      });
      addRecentTransaction({ hash, description: "Mint GCOIN" });

      console.log(`stableCoinToGCoin`, hash);
      const data = await waitForTransaction({
        hash,
      });
      console.log(`stableCoinToGCoin`, data);
      refetchBalances();
    } catch (error) {
      console.warn(`stableCoinToGCoin`, error);
    }
    checkAllowance();
    setFormState(FormState.READY);
  };

  return (
    <form
      className="w-full flex flex-col items-center gap-4"
      onSubmit={onSubmit}
    >
      <div className="w-full rounded-md bg-black bg-opacity-50 p-4 flex flex-col gap-2 focus-within:outline-purple-400 focus-within:outline focus-within:outline-2">
        <div className="flex justify-between text-sm">
          <label className="text-gray-400">Balance</label>

          <ClickableBalanceLabel
            onClick={setToMax}
            value={inputBalanceResult.data}
            decimals={inputDecimalsResult.data}
          />
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

          <Image alt="USDC" src={usdcSvg} width={24} height={24} />
          <label className="ml-2 text-white">{inputSymbolResult?.data}</label>
        </div>
      </div>

      <BsArrowDown />

      <div className="w-full rounded-md bg-black bg-opacity-50 p-4 flex flex-col gap-2 focus-within:outline-purple-400 focus-within:outline focus-within:outline-2">
        <div className="flex justify-between text-sm">
          <label className="text-gray-400">Balance</label>

          <ClickableBalanceLabel value={outputBalanceResult.data} />
        </div>

        <div className="flex text-2xl items-center">
          <input
            type="number"
            placeholder="0"
            className="bg-transparent w-full focus:outline-none"
            value={outputValue}
            onChange={(e) => setOutputValue(e.target.value)}
            maxLength={40}
            autoComplete="off"
          />

          <Image alt="GCOIN" src={gcoinSvg} width={24} height={24} />
          <label className="ml-2 text-white">GCOIN</label>
        </div>
      </div>

      <button
        type="submit"
        className={classNames(
          {
            "cursor-progress": formState === FormState.LOADING,
            "cursor-not-allowed": formState === FormState.DISABLED,
            "text-gray-400": formState !== FormState.READY,
            "cursor-pointer text-white hover:bg-purple-600":
              formState === FormState.READY,
          },
          "mt-4 rounded-md w-full p-4 bg-purple-500 bg-opacity-50 focus:outline-none transition-colors"
        )}
        disabled={formState !== FormState.READY}
      >
        {gcoinPausedResult.data === true ? (
          "Minting Unavailable"
        ) : formState === FormState.LOADING ? (
          <span className="flex items-center gap-2 justify-center">
            <CgSpinner className="animate-spin" /> Submitting...
          </span>
        ) : userAccount.isConnected ? (
          needsAllowance ? (
            `Approve ${inputSymbolResult?.data}`
          ) : (
            "Swap"
          )
        ) : (
          "Connect Wallet"
        )}
      </button>
    </form>
  );
}
