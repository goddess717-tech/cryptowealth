export default function PortfolioHeader() {
  return (
    <section className="portfolio-header">
      <div>
        <span className="muted">Total Portfolio Value</span>
        <h2>$0.00</h2>
        <span className="pnl neutral">24h PnL: $0.00 (0.00%)</span>
      </div>

      <div className="portfolio-actions">
        <button className="btn btn-outline-light">Deposit</button>
        <button className="btn btn-outline-light">Withdraw</button>
        <button className="btn btn-primary">Trade</button>
      </div>
    </section>
  );
}
