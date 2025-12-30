import AssetCard from "./AssetCard";

const assets = [
  { symbol: "BTC", name: "Bitcoin", accent: "btc" },
  { symbol: "ETH", name: "Ethereum", accent: "eth" },
  { symbol: "USDT", name: "Tether", accent: "usdt" },
  { symbol: "BNB", name: "BNB", accent: "bnb" },
  { symbol: "TRX", name: "Tron", accent: "trx" },
  { symbol: "DOGE", name: "Dogecoin", accent: "doge" },
];

export default function AssetGrid() {
  return (
    <section className="asset-grid">
      {assets.map(asset => (
        <AssetCard key={asset.symbol} asset={asset} />
      ))}
    </section>
  );
}
