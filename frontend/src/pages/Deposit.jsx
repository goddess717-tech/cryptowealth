// Deposit Page
  export const DepositPage = () => {
     const cryptoAssets = [
    { name: 'Bitcoin', symbol: 'BTC', balance: 0.00, price: 45234.56, change: 2.34, color: '#F7931A', icon: '₿' },
    { name: 'Ethereum', symbol: 'ETH', balance: 0.00, price: 2456.78, change: -1.23, color: '#627EEA', icon: 'Ξ' },
    { name: 'Tron', symbol: 'TRX', balance: 0.00, price: 0.0876, change: 5.67, color: '#FF060A', icon: 'T' },
    { name: 'Dogecoin', symbol: 'DOGE', balance: 0.00, price: 0.0823, change: 3.21, color: '#C3A634', icon: 'Ð' },
    { name: 'Bitcoin Cash', symbol: 'BCH', balance: 0.00, price: 234.56, change: -2.45, color: '#8DC351', icon: 'BCH' },
    { name: 'USDT TRC20', symbol: 'USDT', balance: 0.00, price: 1.00, change: 0.01, color: '#26A17B', icon: '₮' },
    { name: 'Binance Coin', symbol: 'BNB', balance: 0.00, price: 312.45, change: 1.89, color: '#F3BA2F', icon: 'BNB' },
    { name: 'Litecoin', symbol: 'LTC', balance: 0.00, price: 89.34, change: -0.56, color: '#345D9D', icon: 'Ł' },
    { name: 'USDT ERC20', symbol: 'USDT_ERC', balance: 0.00, price: 1.00, change: 0.00, color: '#26A17B', icon: '₮' },
    { name: 'Binance USD', symbol: 'BUSD', balance: 0.00, price: 1.00, change: 0.00, color: '#F0B90B', icon: 'BUSD' }
  ];
    return(
    <div className="deposit-content">
      <h2 className="mb-4">Deposit Funds</h2>
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="mb-4">
                <label className="form-label">Select Cryptocurrency</label>
                <select className="form-select">
                  {cryptoAssets.map(crypto => (
                    <option key={crypto.symbol} value={crypto.symbol}>{crypto.name} ({crypto.symbol})</option>
                  ))}
                </select>
              </div>
              <div className="deposit-address">
                <h5>Deposit Address</h5>
                <div className="address-box">
                  <p className="mb-2">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
                  <button className="btn btn-sm btn-outline-primary">Copy Address</button>
                </div>
                <div className="qr-code mt-3">
                  <div className="qr-placeholder">
                    [QR Code]
                  </div>
                </div>
                <div className="alert alert-warning mt-3">
                  <i className="bi bi-exclamation-triangle"></i> Only send Bitcoin to this address. Sending any other cryptocurrency will result in permanent loss.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5>Deposit Information</h5>
              <ul className="deposit-info">
                <li>Minimum deposit: 0.0001 BTC</li>
                <li>Confirmations required: 3</li>
                <li>Estimated arrival: 30-60 minutes</li>
                <li>Network fee: Paid by sender</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}