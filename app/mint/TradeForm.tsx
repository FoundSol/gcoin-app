"use client";

import Section from "@/components/common/Section";
import { useEffect, useId, useState } from "react";
import { BsArrowDown } from "react-icons/bs";

export default function TradeForm() {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [inputBalance] = useState("5678");
  const [outputBalance] = useState("1234");
  const maxBalanceId = useId();

  const setMaxBalance = () => {
    setInputValue(inputBalance);
  };

  useEffect(() => {
    setOutputValue(inputValue);
  }, [inputValue]);

  return (
    <Section className="w-full max-w-md mb-8">
      <form className="w-full flex flex-col items-center gap-4">
        <h1 className="w-full text-3xl">Mint GCOIN</h1>

        <div className="w-full rounded-md bg-black bg-opacity-50 p-4 flex flex-col gap-2 focus-within:outline-purple-400 focus-within:outline focus-within:outline-2">
          <div className="flex justify-between text-sm">
            <label className="text-gray-400" htmlFor={maxBalanceId}>
              Your Balance
            </label>

            <a
              id={maxBalanceId}
              className="text-purple-300 cursor-pointer"
              onClick={setMaxBalance}
            >
              {inputBalance}
            </a>
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

            <label className="text-white">USDC</label>
          </div>
        </div>

        <BsArrowDown />

        <div className="w-full rounded-md bg-black bg-opacity-50 p-4 flex flex-col gap-2 focus-within:outline-purple-400 focus-within:outline focus-within:outline-2">
          <div className="flex justify-between text-sm">
            <label className="text-gray-400">GCOIN Balance</label>

            <span className="text-purple-300">{outputBalance}</span>
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
