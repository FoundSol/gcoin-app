import ClientOnly from "@/components/common/ClientOnly";
import Section from "@/components/common/Section";
import TreasuryReservesChart from "./TreasuryReservesChart";
import TreasuryReservesTable from "./TreasuryReservesTable";
import TreasuryStatsTable from "./TreasuryStatsTable";

export default function StatsPage() {
  return (
    <div className="w-full grid grid-cols-5 gap-8">
      <Section className="col-span-5">
        <h1 className="w-full text-3xl">GCOIN</h1>

        <TreasuryStatsTable />
      </Section>

      <Section className="col-span-5 lg:col-span-2">
        <h1 className="w-full text-3xl">Treasury</h1>

        <ClientOnly>
          <TreasuryReservesChart />
        </ClientOnly>
      </Section>

      <Section className="col-span-5 lg:col-span-3">
        <h1 className="w-full text-3xl">Liquid Reserves</h1>

        <ClientOnly>
          <TreasuryReservesTable />
        </ClientOnly>
      </Section>
    </div>
  );
}
