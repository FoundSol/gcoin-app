"use client";

import Section from "@/components/common/Section";
import TreasuryStatsTable from "../stats/TreasuryStatsTable";
import TradeForm from "./TradeForm";

export default function MintPage() {
  return (
    <>
      <Section className="w-full max-w-md mb-8">
        <h1 className="w-full text-3xl">GCOIN Stats</h1>

        <TreasuryStatsTable />
      </Section>

      <TradeForm />
    </>
  );
}
