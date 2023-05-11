import { formatNumberUSD } from "@/lib/numbers";
import { useCAR, useGcoinSupply, usePricesForAsset } from "./data";

export default function TreasuryStatsTable() {
  const gcoinUsd = usePricesForAsset("GCOIN");
  const gcoinSupply = useGcoinSupply();
  const gcoinMarketCap = gcoinSupply * gcoinUsd;
  const car = useCAR();

  return (
    <table className="w-full">
      <tbody>
        <tr>
          <td>Current Price</td>
          <td className="text-right">{formatNumberUSD(Number(gcoinUsd), 4)}</td>
        </tr>
        <tr>
          <td>Market Cap</td>
          <td className="text-right">{formatNumberUSD(gcoinMarketCap, 0)}</td>
        </tr>
        <tr>
          <td>Capital Adequacy Ratio</td>
          <td className="text-right">{car}%</td>
        </tr>
      </tbody>
    </table>
  );
}
