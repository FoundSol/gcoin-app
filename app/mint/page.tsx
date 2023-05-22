import Section from "@/components/common/Section";
import TreasuryStatsTable from "../stats/TreasuryStatsTable";
import TradeSection from "./TradeSection";

export default function MintPage() {
  return (
    <>
      <Section className="w-full max-w-md mb-8">
        <h1 className="w-full text-3xl">GCOIN Stats</h1>

        <TreasuryStatsTable />
      </Section>

      <TradeSection />
    </>
  );
}
