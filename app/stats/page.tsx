"use client";

import Section from "@/components/common/Section";
import TreasuryReservesChart from "./TreasuryReservesChart";
import TreasuryReservesTable from "./TreasuryReservesTable";

export default function StatsPage() {
  return (
    <div className="w-full flex gap-8 flex-col sm:flex-row">
      <Section className="w-full max-w-md">
        <h1 className="w-full text-3xl">Treasury</h1>

        <TreasuryReservesChart />
      </Section>

      <Section className="flex-1">
        <h1 className="w-full text-3xl">Liquid Reserves</h1>

        <TreasuryReservesTable />
      </Section>
    </div>
  );
}
