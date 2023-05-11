export const usePricesForAsset = (asset: string) => {
  const data = [
    { name: "USDC", price: 1 },
    { name: "ETH", price: 1800 },
    { name: "BTC", price: 28000 },
    { name: "AGIX", price: 0.25 },
  ];
  const item = data.find(({ name }) => name === asset);
  return item?.price ?? 0;
};

export const useTreasuryData = () => {
  const data = [
    { name: "USDC", qty: 1_500_000 },
    { name: "ETH", qty: 105 },
    { name: "BTC", qty: 6.24 },
    { name: "AGIX", qty: 69000 },
  ];
  const withUsd = data.map((d) => ({
    ...d,
    usd: d.qty * usePricesForAsset(d.name),
  }));
  const sum = withUsd.reduce((s, { usd }) => s + usd, 0);
  return { sum, items: withUsd.map((d) => ({ ...d, percent: d.usd / sum })) };
};
