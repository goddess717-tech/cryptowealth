import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Bell, Settings, User, ChevronDown, Info, Clock, DollarSign, Zap, Activity, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function CryptoTradingPage() {
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState('BTC');
  const [orderType, setOrderType] = useState('market');
  const [tradeDirection, setTradeDirection] = useState('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [timeframe, setTimeframe] = useState('1D');

  const [tradingData, setTradingData] = useState({
    assets: {
      BTC: {
        symbol: 'BTC',
        name: 'Bitcoin',
        color: '#F7931A',
        price: 98436.00,
        change24h: 3.2,
        high24h: 99284.50,
        low24h: 96142.30,
        volume24h: 42.8,
        orderBook: {
          bids: [
            { price: 98435.50, amount: 0.543, total: 53436.42 },
            { price: 98434.00, amount: 1.234, total: 121463.56 },
            { price: 98432.50, amount: 0.892, total: 87801.79 },
            { price: 98430.00, amount: 2.145, total: 211132.35 },
            { price: 98428.50, amount: 0.678, total: 66734.47 }
          ],
          asks: [
            { price: 98437.00, amount: 0.892, total: 87805.80 },
            { price: 98438.50, amount: 1.456, total: 143310.54 },
            { price: 98440.00, amount: 0.734, total: 72234.96 },
            { price: 98442.50, amount: 1.892, total: 186253.01 },
            { price: 98444.00, amount: 0.567, total: 55805.75 }
          ]
        },
        chartData: Array.from({ length: 60 }, (_, i) => ({
          time: i,
          price: 95000 + Math.random() * 4000 + (i * 50)
        }))
      },
      ETH: {
        symbol: 'ETH',
        name: 'Ethereum',
        color: '#627EEA',
        price: 3988.50,
        change24h: 5.1,
        high24h: 4124.80,
        low24h: 3842.20,
        volume24h: 18.4,
        orderBook: {
          bids: [
            { price: 3988.00, amount: 5.234, total: 20872.39 },
            { price: 3987.50, amount: 8.456, total: 33720.06 },
            { price: 3986.00, amount: 3.892, total: 15511.51 },
            { price: 3984.50, amount: 12.145, total: 48393.73 },
            { price: 3983.00, amount: 6.789, total: 27035.79 }
          ],
          asks: [
            { price: 3989.00, amount: 4.892, total: 19518.19 },
            { price: 3990.50, amount: 7.456, total: 29752.45 },
            { price: 3992.00, amount: 5.734, total: 22889.73 },
            { price: 3994.50, amount: 9.234, total: 36886.84 },
            { price: 3996.00, amount: 3.567, total: 14251.93 }
          ]
        },
        chartData: Array.from({ length: 60 }, (_, i) => ({
          time: i,
          price: 3750 + Math.random() * 300 + (i * 4)
        }))
      },
      SOL: {
        symbol: 'SOL',
        name: 'Solana',
        color: '#14F195',
        price: 234.56,
        change24h: 8.7,
        high24h: 242.18,
        low24h: 226.34,
        volume24h: 5.8,
        orderBook: {
          bids: [
            { price: 234.50, amount: 45.234, total: 10607.37 },
            { price: 234.40, amount: 78.456, total: 18391.67 },
            { price: 234.30, amount: 34.892, total: 8176.26 },
            { price: 234.20, amount: 92.145, total: 21583.57 },
            { price: 234.10, amount: 56.789, total: 13295.35 }
          ],
          asks: [
            { price: 234.60, amount: 52.892, total: 12408.55 },
            { price: 234.70, amount: 65.456, total: 15365.55 },
            { price: 234.80, amount: 43.734, total: 10268.74 },
            { price: 234.90, amount: 89.234, total: 20962.87 },
            { price: 235.00, amount: 38.567, total: 9063.25 }
          ]
        },
        chartData: Array.from({ length: 60 }, (_, i) => ({
          time: i,
          price: 215 + Math.random() * 20 + (i * 0.3)
        }))
      }
    }
  });

  const [recentTrades, setRecentTrades] = useState([
    { price: 98436.50, amount: 0.234, time: '14:32:18', type: 'buy' },
    { price: 98435.20, amount: 0.567, time: '14:32:15', type: 'sell' },
    { price: 98437.80, amount: 1.234, time: '14:32:12', type: 'buy' },
    { price: 98434.90, amount: 0.892, time: '14:32:08', type: 'sell' },
    { price: 98438.20, amount: 0.445, time: '14:32:04', type: 'buy' }
  ]);

  const [openOrders, setOpenOrders] = useState([
    { id: 1, pair: 'BTC/USD', type: 'Limit', side: 'Buy', amount: 0.5, price: 97500.00, filled: 0, status: 'Open', time: '14:28:42' },
    { id: 2, pair: 'ETH/USD', type: 'Limit', side: 'Sell', amount: 2.5, price: 4100.00, filled: 0, status: 'Open', time: '14:24:18' }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Live price and order book updates
  useEffect(() => {
    if (loading) return;

    const updateInterval = setInterval(() => {
      setTradingData(prev => {
        const updated = { ...prev };
        
        Object.keys(updated.assets).forEach(symbol => {
          const asset = updated.assets[symbol];
          const randomWalk = (Math.random() - 0.48) * 0.6;
          const priceChange = asset.price * (randomWalk / 100);
          const newPrice = Math.max(asset.price * 0.85, Math.min(asset.price * 1.15, asset.price + priceChange));

          // Update order book with realistic spreads
          const spread = newPrice * 0.0001; // 0.01% spread
          
          updated.assets[symbol] = {
            ...asset,
            price: newPrice,
            orderBook: {
              bids: asset.orderBook.bids.map((bid, i) => ({
                price: newPrice - (spread * (i + 1)),
                amount: bid.amount + (Math.random() - 0.5) * 0.1,
                total: (newPrice - (spread * (i + 1))) * bid.amount
              })),
              asks: asset.orderBook.asks.map((ask, i) => ({
                price: newPrice + (spread * (i + 1)),
                amount: ask.amount + (Math.random() - 0.5) * 0.1,
                total: (newPrice + (spread * (i + 1))) * ask.amount
              }))
            }
          };
        });

        return updated;
      });

      // Update recent trades
      setRecentTrades(prev => {
        const asset = tradingData.assets[selectedAsset];
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        
        const newTrade = {
          price: asset.price + (Math.random() - 0.5) * (asset.price * 0.001),
          amount: Math.random() * 2,
          time: timeStr,
          type: Math.random() > 0.5 ? 'buy' : 'sell'
        };

        return [newTrade, ...prev.slice(0, 19)];
      });
    }, 2000);

    return () => clearInterval(updateInterval);
  }, [loading, selectedAsset, tradingData.assets]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 4 : 2
    }).format(value);
  };

  const formatNumber = (value, decimals = 3) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  };

  const currentAsset = tradingData.assets[selectedAsset];
  const estimatedTotal = amount && price ? parseFloat(amount) * parseFloat(price) : 
                         amount && orderType === 'market' ? parseFloat(amount) * currentAsset.price : 0;

  const PriceChart = ({ data, positive }) => {
    const width = 800;
    const height = 300;
    const prices = data.map(d => d.price);
    const max = Math.max(...prices);
    const min = Math.min(...prices);
    const range = max - min || 1;

    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((point.price - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    const isPositive = lastPrice > firstPrice;
    const color = isPositive ? '#10B981' : '#DC2626';

    return (
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={`0,${height} ${points} ${width},${height}`}
          fill="url(#chartGradient)"
        />
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

      

        .trading-container {
          min-height: calc(100vh - 64px);
          background: #0A0E1A;
        }

      

      

        .nav-item {
          color: #64748B;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s;
        }

        .nav-item.active {
          color: #E2E8F0;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(30, 41, 59, 0.3);
          border: 1px solid rgba(148, 163, 184, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          background: rgba(30, 41, 59, 0.5);
        }

        .trading-layout {
          display: grid;
          grid-template-columns: 300px 1fr 360px;
           min-height: 100%;
          gap: 1px;
          background: rgba(148, 163, 184, 0.04);
        }

        .left-panel {
          background: #0A0E1A;
          border-right: 1px solid rgba(148, 163, 184, 0.06);
          overflow-y: auto;
        }

        .asset-selector {
          padding: 20px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.06);
        }

        .selector-header {
          font-size: 11px;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
          margin-bottom: 12px;
        }

        .asset-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .asset-item {
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .asset-item:hover {
          background: rgba(15, 23, 42, 0.3);
        }

        .asset-item.active {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .asset-item-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .asset-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          color: white;
        }

        .asset-item-info h4 {
          font-size: 14px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 2px;
        }

        .asset-item-info p {
          font-size: 11px;
          color: #64748B;
        }

        .asset-item-right {
          text-align: right;
        }

        .asset-price {
          font-size: 13px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 2px;
          font-variant-numeric: tabular-nums;
        }

        .asset-change {
          font-size: 11px;
          font-weight: 500;
          font-variant-numeric: tabular-nums;
        }

        .asset-change.positive {
          color: #10B981;
        }

        .asset-change.negative {
          color: #DC2626;
        }

        .center-panel {
          background: #0A0E1A;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .trading-header {
          padding: 20px 24px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.06);
        }

        .trading-pair {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .pair-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 600;
          color: white;
        }

        .pair-info h2 {
          font-size: 20px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 2px;
        }

        .pair-info p {
          font-size: 12px;
          color: #64748B;
        }

        .price-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .price-stat h4 {
          font-size: 11px;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        .price-stat-value {
          font-size: 16px;
          font-weight: 600;
          color: #F8FAFC;
          font-variant-numeric: tabular-nums;
        }

        .price-stat-value.positive {
          color: #10B981;
        }

        .price-stat-value.negative {
          color: #DC2626;
        }

        .chart-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chart-controls {
          padding: 16px 24px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.06);
          display: flex;
          gap: 8px;
        }

        .timeframe-btn {
          padding: 6px 12px;
          border-radius: 6px;
          background: transparent;
          border: 1px solid rgba(148, 163, 184, 0.08);
          color: #64748B;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .timeframe-btn:hover {
          background: rgba(15, 23, 42, 0.3);
        }

        .timeframe-btn.active {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
          color: #3B82F6;
        }

        .chart-container {
          flex: 1;
          padding: 24px;
          overflow: hidden;
        }

        .market-data-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid rgba(148, 163, 184, 0.06);
        }

        .order-book, .recent-trades {
          padding: 20px 24px;
          overflow-y: auto;
          max-height: 300px;
        }

        .order-book {
          border-right: 1px solid rgba(148, 163, 184, 0.06);
        }

        .data-section-title {
          font-size: 13px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 16px;
        }

        .order-book-table, .trades-table {
          width: 100%;
          font-size: 12px;
        }

        .order-book-table th, .trades-table th {
          text-align: left;
          color: #64748B;
          font-weight: 500;
          font-size: 11px;
          padding-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .order-book-table td, .trades-table td {
          padding: 4px 0;
          font-variant-numeric: tabular-nums;
        }

        .bid-price {
          color: #10B981;
        }

        .ask-price {
          color: #DC2626;
        }

        .trade-buy {
          color: #10B981;
        }

        .trade-sell {
          color: #DC2626;
        }

        .right-panel {
          background: #0A0E1A;
          border-left: 1px solid rgba(148, 163, 184, 0.06);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .order-panel {
          padding: 24px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.06);
        }

        .order-panel-title {
          font-size: 15px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 20px;
        }

        .order-type-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }

        .order-type-tab {
          flex: 1;
          padding: 8px;
          border-radius: 6px;
          background: transparent;
          border: 1px solid rgba(148, 163, 184, 0.08);
          color: #64748B;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .order-type-tab.active {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
          color: #3B82F6;
        }

        .trade-direction-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 20px;
        }

        .direction-tab {
          padding: 12px;
          border-radius: 8px;
          border: 1px solid rgba(148, 163, 184, 0.08);
          background: transparent;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .direction-tab.buy {
          color: #10B981;
        }

        .direction-tab.buy.active {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .direction-tab.sell {
          color: #DC2626;
        }

        .direction-tab.sell.active {
          background: rgba(220, 38, 38, 0.1);
          border-color: rgba(220, 38, 38, 0.3);
        }

        .input-group {
          margin-bottom: 16px;
        }

        .input-label {
          font-size: 12px;
          color: #94A3B8;
          margin-bottom: 8px;
          display: block;
        }

        .input-wrapper {
          position: relative;
        }

        .trade-input {
          width: 100%;
          padding: 12px 16px;
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.08);
          border-radius: 8px;
          color: #E2E8F0;
          font-size: 14px;
          font-variant-numeric: tabular-nums;
          outline: none;
          transition: all 0.2s;
        }

        .trade-input:focus {
          border-color: rgba(59, 130, 246, 0.3);
          background: rgba(15, 23, 42, 0.6);
        }

        .input-suffix {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          color: #64748B;
        }

        .order-summary {
          background: rgba(15, 23, 42, 0.3);
          border: 1px solid rgba(148, 163, 184, 0.06);
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .summary-row:last-child {
          margin-bottom: 0;
          padding-top: 8px;
          border-top: 1px solid rgba(148, 163, 184, 0.06);
        }

        .summary-label {
          font-size: 12px;
          color: #64748B;
        }

        .summary-value {
          font-size: 13px;
          font-weight: 600;
          color: #F8FAFC;
          font-variant-numeric: tabular-nums;
        }

        .trade-button {
          width: 100%;
          padding: 14px;
          border-radius: 8px;
          border: none;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .trade-button.buy {
          background: #10B981;
          color: white;
        }

        .trade-button.buy:hover {
          background: #059669;
        }

        .trade-button.sell {
          background: #DC2626;
          color: white;
        }

        .trade-button.sell:hover {
          background: #B91C1C;
        }

        .trade-button:disabled {
          background: rgba(148, 163, 184, 0.2);
          color: #64748B;
          cursor: not-allowed;
        }

        .open-orders-section {
          padding: 24px;
        }

        .orders-table {
          width: 100%;
          font-size: 11px;
        }

        .orders-table th {
          text-align: left;
          color: #64748B;
          font-weight: 500;
          padding-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .orders-table td {
          padding: 12px 0;
          border-bottom: 1px solid rgba(148, 163, 184, 0.04);
          font-variant-numeric: tabular-nums;
        }

        .order-side-buy {
          color: #10B981;
          font-weight: 500;
        }

        .order-side-sell {
          color: #DC2626;
          font-weight: 500;
        }

        .cancel-btn {
          padding: 4px 8px;
          border-radius: 4px;
          background: rgba(220, 38, 38, 0.1);
          border: 1px solid rgba(220, 38, 38, 0.2);
          color: #DC2626;
          font-size: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cancel-btn:hover {
          background: rgba(220, 38, 38, 0.2);
        }

        @media (max-width: 1400px) {
          .trading-layout {
            grid-template-columns: 280px 1fr 340px;
          }
        }

        @media (max-width: 1200px) {
          .trading-layout {
            grid-template-columns: 1fr;
            height: auto;
          }

          .left-panel, .right-panel {
            border: none;
            border-bottom: 1px solid rgba(148, 163, 184, 0.06);
          }

          .market-data-section {
            grid-template-columns: 1fr;
          }

          .order-book {
            border-right: none;
            border-bottom: 1px solid rgba(148, 163, 184, 0.06);
          }
        }
      `}</style>

      <div className="trading-container">

        <div className="trading-layout">
          {/* Left Panel - Asset Selection */}
          <div className="left-panel">
            <div className="asset-selector">
              <div className="selector-header">Trading Pairs</div>
              <div className="asset-list">
                {Object.values(tradingData.assets).map((asset) => (
                  <div
                    key={asset.symbol}
                    className={`asset-item ${selectedAsset === asset.symbol ? 'active' : ''}`}
                    onClick={() => setSelectedAsset(asset.symbol)}
                  >
                    <div className="asset-item-left">
                      <div className="asset-icon" style={{ background: asset.color }}>
                        {asset.symbol.charAt(0)}
                      </div>
                      <div className="asset-item-info">
                        <h4>{asset.symbol}/USD</h4>
                        <p>{asset.name}</p>
                      </div>
                    </div>
                    <div className="asset-item-right">
                      <div className="asset-price">{formatCurrency(asset.price)}</div>
                      <div className={`asset-change ${asset.change24h >= 0 ? 'positive' : 'negative'}`}>
                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Panel - Chart & Market Data */}
          <div className="center-panel">
            <div className="trading-header">
              <div className="trading-pair">
                <div className="pair-icon" style={{ background: currentAsset.color }}>
                  {currentAsset.symbol.charAt(0)}
                </div>
                <div className="pair-info">
                  <h2>{currentAsset.symbol}/USD</h2>
                  <p>{currentAsset.name} to US Dollar</p>
                </div>
              </div>

              <div className="price-stats">
                <div className="price-stat">
                  <h4>Current Price</h4>
                  <div className="price-stat-value">{formatCurrency(currentAsset.price)}</div>
                </div>
                <div className="price-stat">
                  <h4>24h Change</h4>
                  <div className={`price-stat-value ${currentAsset.change24h >= 0 ? 'positive' : 'negative'}`}>
                    {currentAsset.change24h >= 0 ? '+' : ''}{currentAsset.change24h.toFixed(2)}%
                  </div>
                </div>
                <div className="price-stat">
                  <h4>24h High</h4>
                  <div className="price-stat-value">{formatCurrency(currentAsset.high24h)}</div>
                </div>
                <div className="price-stat">
                  <h4>24h Low</h4>
                  <div className="price-stat-value">{formatCurrency(currentAsset.low24h)}</div>
                </div>
              </div>
            </div>

            <div className="chart-section">
              <div className="chart-controls">
                {['5M', '15M', '1H', '4H', '1D', '1W'].map((tf) => (
                  <button
                    key={tf}
                    className={`timeframe-btn ${timeframe === tf ? 'active' : ''}`}
                    onClick={() => setTimeframe(tf)}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              <div className="chart-container">
                <PriceChart data={currentAsset.chartData} positive={currentAsset.change24h >= 0} />
              </div>
            </div>

            <div className="market-data-section">
              <div className="order-book">
                <div className="data-section-title">Order Book</div>
                <table className="order-book-table">
                  <thead>
                    <tr>
                      <th>Price (USD)</th>
                      <th>Amount</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAsset.orderBook.asks.slice().reverse().map((ask, i) => (
                      <tr key={`ask-${i}`}>
                        <td className="ask-price">{formatCurrency(ask.price)}</td>
                        <td>{formatNumber(ask.amount)}</td>
                        <td>{formatCurrency(ask.total)}</td>
                      </tr>
                    ))}
                    <tr style={{ height: '8px' }}></tr>
                    {currentAsset.orderBook.bids.map((bid, i) => (
                      <tr key={`bid-${i}`}>
                        <td className="bid-price">{formatCurrency(bid.price)}</td>
                        <td>{formatNumber(bid.amount)}</td>
                        <td>{formatCurrency(bid.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="recent-trades">
                <div className="data-section-title">Recent Trades</div>
                <table className="trades-table">
                  <thead>
                    <tr>
                      <th>Price (USD)</th>
                      <th>Amount</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTrades.slice(0, 15).map((trade, i) => (
                      <tr key={i}>
                        <td className={trade.type === 'buy' ? 'trade-buy' : 'trade-sell'}>
                          {formatCurrency(trade.price)}
                        </td>
                        <td>{formatNumber(trade.amount)}</td>
                        <td style={{ color: '#64748B' }}>{trade.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Panel - Order Entry */}
          <div className="right-panel">
            <div className="order-panel">
              <h3 className="order-panel-title">Place Order</h3>

              <div className="order-type-tabs">
                <button
                  className={`order-type-tab ${orderType === 'market' ? 'active' : ''}`}
                  onClick={() => setOrderType('market')}
                >
                  Market
                </button>
                <button
                  className={`order-type-tab ${orderType === 'limit' ? 'active' : ''}`}
                  onClick={() => setOrderType('limit')}
                >
                  Limit
                </button>
              </div>

              <div className="trade-direction-tabs">
                <button
                  className={`direction-tab buy ${tradeDirection === 'buy' ? 'active' : ''}`}
                  onClick={() => setTradeDirection('buy')}
                >
                  Buy
                </button>
                <button
                  className={`direction-tab sell ${tradeDirection === 'sell' ? 'active' : ''}`}
                  onClick={() => setTradeDirection('sell')}
                >
                  Sell
                </button>
              </div>

              {orderType === 'limit' && (
                <div className="input-group">
                  <label className="input-label">Price</label>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      className="trade-input"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <span className="input-suffix">USD</span>
                  </div>
                </div>
              )}

              <div className="input-group">
                <label className="input-label">Amount</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    className="trade-input"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <span className="input-suffix">{currentAsset.symbol}</span>
                </div>
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span className="summary-label">Order Type</span>
                  <span className="summary-value">{orderType === 'market' ? 'Market' : 'Limit'}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Price</span>
                  <span className="summary-value">
                    {orderType === 'market' 
                      ? formatCurrency(currentAsset.price)
                      : price ? formatCurrency(parseFloat(price)) : '—'
                    }
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Estimated Total</span>
                  <span className="summary-value">
                    {estimatedTotal > 0 ? formatCurrency(estimatedTotal) : '—'}
                  </span>
                </div>
              </div>

              <button
                className={`trade-button ${tradeDirection}`}
                disabled={!amount || (orderType === 'limit' && !price)}
              >
                {tradeDirection === 'buy' ? 'Buy' : 'Sell'} {currentAsset.symbol}
              </button>
            </div>

            <div className="open-orders-section">
              <h3 className="order-panel-title">Open Orders</h3>
              {openOrders.length > 0 ? (
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Pair</th>
                      <th>Side</th>
                      <th>Amount</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {openOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.pair}</td>
                        <td className={order.side === 'Buy' ? 'order-side-buy' : 'order-side-sell'}>
                          {order.side}
                        </td>
                        <td>{formatNumber(order.amount, 2)}</td>
                        <td>{formatCurrency(order.price)}</td>
                        <td>
                          <button className="cancel-btn">Cancel</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ color: '#64748B', fontSize: '12px' }}>No open orders</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}