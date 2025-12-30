export default function AssetCard({ asset }) {
  return (
    <div className={`asset-tile ${asset.accent}`}>
      <div className="asset-meta">
        <div>
          <strong>{asset.name}</strong>
          <span className="symbol">{asset.symbol}</span>
        </div>
        <span className="market">Spot</span>
      </div>

      <div className="asset-values">
        <div className="main">$0.00</div>
        <div className="sub">Available $0.00</div>
      </div>

      <div className="asset-actions">
        <button className="btn btn-outline-light btn-sm">Deposit</button>
        <button className="btn btn-outline-light btn-sm">Withdraw</button>
        <button className="btn btn-primary btn-sm">Trade</button>
      </div>
    </div>
  );
}
