"use client";

import Section from "@/components/common/Section";
import { useState } from "react";
import { formatNumberUSD } from "../../lib/numbers";
import TradeForm from "./TradeForm";

export default function MintPage() {
  const [priceUsd] = useState(BigInt(1.0152e18));
  const [marketCap] = useState(BigInt(1273058));

  return (
    <>
      <Section className="w-full max-w-md mb-8">
        <h1 className="w-full text-3xl">GCOIN Stats</h1>

        <table className="w-full">
          <tbody>
            <tr>
              <td>Current Price</td>
              <td className="text-right">
                {formatNumberUSD(Number(priceUsd) / 1e18, 4)}
              </td>
            </tr>
            <tr>
              <td>Market Cap</td>
              <td className="text-right">{formatNumberUSD(marketCap, 0)}</td>
            </tr>
          </tbody>
        </table>
      </Section>

      <TradeForm />
    </>
  );
}
