import { formatNumberUSD } from "@/lib/numbers";
import { useGCoinGcoinValue, useGCoinTotalSupply } from "@/lib/wagmiHooks";
import { useCAR } from "./data";

export default function TreasuryStatsTable() {
  const gcoinValue = useGCoinGcoinValue();
  const gcoinSupply = useGCoinTotalSupply();
  const gcoinUsd = Number(gcoinValue?.data ?? 0) / 1e18;
  const gcoinMarketCap =
    (Number(gcoinSupply?.data ?? BigInt(0)) / 1e18) * gcoinUsd;
  const car = useCAR();

  return (
    <table className="w-full">
      <tbody>
        <tr>
          <td>Current Price</td>
          <td className="text-right">{formatNumberUSD(gcoinUsd, 4)}</td>
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
