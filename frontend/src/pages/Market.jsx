import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Star, Search, ChevronDown, ArrowUpRight, ArrowDownRight, Filter, Bell, Settings, User, Zap, Activity } from 'lucide-react';

export default function CryptoMarketsPage() {
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('marketCap');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [watchlist, setWatchlist] = useState(['BTC', 'ETH', 'SOL']);

  const [marketData, setMarketData] = useState({
    globalMetrics: {
      totalMarketCap: 3.42,
      volume24h: 187.5,
      btcDominance: 54.2,
      fearGreedIndex: 68
    },
    topMovers: [
      { symbol: 'AVAX', name: 'Avalanche', change24h: 18.4, price: 42.18, volume: 892.4 },
      { symbol: 'LINK', name: 'Chainlink', change24h: 15.2, price: 16.84, volume: 645.2 },
      { symbol: 'MATIC', name: 'Polygon', change24h: -12.8, price: 0.89, volume: 423.8 }
    ],
    assets: [
      {
        rank: 1,
        symbol: 'BTC',
        name: 'Bitcoin',
        color: '#F7931A',
        price: 98436.00,
        change24h: 3.2,
        change7d: 8.4,
        marketCap: 1.94,
        volume24h: 42.8,
        circulatingSupply: 19.7,
        sparkline: [45, 47, 46, 48, 52, 51, 54, 58, 56, 61, 64, 62, 67, 71, 69, 74, 72, 68, 65, 67, 71, 69, 73, 76, 74, 78, 81, 79, 83, 85]
      },
      {
        rank: 2,
        symbol: 'ETH',
        name: 'Ethereum',
        color: '#627EEA',
        price: 3988.50,
        change24h: 5.1,
        change7d: 12.3,
        marketCap: 0.48,
        volume24h: 18.4,
        circulatingSupply: 120.3,
        sparkline: [38, 41, 39, 44, 47, 45, 49, 53, 51, 56, 59, 57, 62, 66, 64, 69, 67, 63, 60, 62, 66, 64, 68, 71, 69, 73, 76, 74, 78, 80]
      },
      {
        rank: 3,
        symbol: 'USDT',
        name: 'Tether',
        color: '#26A17B',
        price: 1.0001,
        change24h: 0.01,
        change7d: -0.02,
        marketCap: 0.12,
        volume24h: 89.2,
        circulatingSupply: 119.8,
        sparkline: [50, 50, 51, 50, 50, 49, 50, 51, 50, 50, 50, 49, 50, 50, 51, 50, 50, 50, 50, 51, 50, 49, 50, 50, 51, 50, 50, 50, 50, 50]
      },
      {
        rank: 4,
        symbol: 'BNB',
        name: 'BNB',
        color: '#F3BA2F',
        price: 657.08,
        change24h: -2.4,
        change7d: -5.8,
        marketCap: 0.095,
        volume24h: 2.1,
        circulatingSupply: 144.5,
        sparkline: [68, 66, 64, 61, 58, 56, 53, 50, 48, 45, 43, 41, 39, 37, 35, 38, 40, 42, 40, 38, 36, 39, 37, 35, 38, 36, 34, 37, 35, 33]
      },
      {
        rank: 5,
        symbol: 'SOL',
        name: 'Solana',
        color: '#14F195',
        price: 234.56,
        change24h: 8.7,
        change7d: 15.2,
        marketCap: 0.112,
        volume24h: 5.8,
        circulatingSupply: 477.2,
        sparkline: [35, 38, 36, 41, 44, 42, 47, 51, 49, 54, 58, 56, 61, 65, 63, 68, 66, 62, 59, 61, 65, 63, 67, 71, 69, 74, 77, 75, 79, 82]
      },
      {
        rank: 6,
        symbol: 'XRP',
        name: 'XRP',
        color: '#23292F',
        price: 2.34,
        change24h: -1.8,
        change7d: 4.2,
        marketCap: 0.134,
        volume24h: 3.2,
        circulatingSupply: 57.2,
        sparkline: [55, 57, 56, 58, 60, 59, 61, 59, 57, 55, 53, 51, 49, 52, 54, 53, 51, 49, 47, 50, 52, 51, 49, 48, 50, 52, 51, 49, 48, 47]
      },
      {
        rank: 7,
        symbol: 'ADA',
        name: 'Cardano',
        color: '#0033AD',
        price: 1.08,
        change24h: 6.3,
        change7d: 9.1,
        marketCap: 0.038,
        volume24h: 1.4,
        circulatingSupply: 35.2,
        sparkline: [42, 44, 43, 46, 49, 47, 51, 54, 52, 56, 59, 57, 61, 64, 62, 66, 64, 61, 58, 60, 63, 61, 65, 68, 66, 70, 73, 71, 75, 77]
      },
      {
        rank: 8,
        symbol: 'AVAX',
        name: 'Avalanche',
        color: '#E84142',
        price: 42.18,
        change24h: 18.4,
        change7d: 24.8,
        marketCap: 0.017,
        volume24h: 0.89,
        circulatingSupply: 402.8,
        sparkline: [28, 31, 29, 34, 37, 35, 40, 44, 42, 48, 52, 50, 56, 61, 59, 65, 69, 67, 72, 68, 71, 74, 72, 76, 79, 77, 82, 85, 83, 88]
      },
      {
        rank: 9,
        symbol: 'DOGE',
        name: 'Dogecoin',
        color: '#C2A633',
        price: 0.38,
        change24h: 2.1,
        change7d: -3.4,
        marketCap: 0.056,
        volume24h: 2.8,
        circulatingSupply: 147.3,
        sparkline: [48, 50, 49, 51, 53, 52, 54, 52, 50, 48, 46, 44, 46, 48, 47, 49, 51, 50, 48, 47, 49, 51, 50, 52, 51, 49, 48, 50, 51, 50]
      },
      {
        rank: 10,
        symbol: 'TRX',
        name: 'TRON',
        color: '#FF0013',
        price: 0.25,
        change24h: -0.8,
        change7d: 1.2,
        marketCap: 0.022,
        volume24h: 0.64,
        circulatingSupply: 88.0,
        sparkline: [52, 51, 50, 49, 48, 47, 46, 45, 44, 46, 47, 46, 45, 47, 48, 47, 49, 50, 49, 48, 47, 48, 49, 48, 50, 51, 50, 49, 50, 51]
      },
      {
        rank: 11,
        symbol: 'DOT',
        name: 'Polkadot',
        color: '#E6007A',
        price: 7.84,
        change24h: 4.2,
        change7d: 7.8,
        marketCap: 0.012,
        volume24h: 0.38,
        circulatingSupply: 1.53,
        sparkline: [40, 42, 41, 44, 47, 45, 49, 52, 50, 54, 57, 55, 59, 62, 60, 64, 62, 59, 56, 58, 61, 59, 63, 66, 64, 68, 71, 69, 73, 75]
      },
      {
        rank: 12,
        symbol: 'MATIC',
        name: 'Polygon',
        color: '#8247E5',
        price: 0.89,
        change24h: -12.8,
        change7d: -18.4,
        marketCap: 0.009,
        volume24h: 0.42,
        circulatingSupply: 10.1,
        sparkline: [72, 70, 68, 65, 62, 59, 56, 53, 50, 47, 44, 41, 38, 36, 34, 37, 39, 38, 36, 34, 32, 35, 33, 31, 34, 32, 30, 33, 31, 29]
      }
    ]
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Live price updates
  useEffect(() => {
    if (loading) return;

    const priceUpdateInterval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        assets: prev.assets.map(asset => {
          const randomWalk = (Math.random() - 0.48) * 0.6;
          const priceChange = asset.price * (randomWalk / 100);
          const newPrice = Math.max(asset.price * 0.85, Math.min(asset.price * 1.15, asset.price + priceChange));

          const lastPoint = asset.sparkline[asset.sparkline.length - 1];
          const recentTrend = asset.sparkline.slice(-5);
          const momentum = recentTrend[recentTrend.length - 1] - recentTrend[0];
          
          let sparklineChange = (Math.random() - 0.5) * 6;
          if (lastPoint > 70) sparklineChange -= 1;
          if (lastPoint < 30) sparklineChange += 1;
          if (momentum > 15) sparklineChange -= 0.5;
          if (momentum < -15) sparklineChange += 0.5;
          
          const newPoint = Math.max(5, Math.min(95, lastPoint + sparklineChange));

          return {
            ...asset,
            price: newPrice,
            sparkline: [...asset.sparkline.slice(1), newPoint]
          };
        })
      }));
    }, 2000);

    return () => clearInterval(priceUpdateInterval);
  }, [loading]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 4 : 2
    }).format(value);
  };

  const formatMarketCap = (value) => {
    return `$${value.toFixed(2)}T`;
  };

  const formatVolume = (value) => {
    if (value >= 1) return `$${value.toFixed(1)}B`;
    return `$${(value * 1000).toFixed(0)}M`;
  };

  const Sparkline = ({ data }) => {
    const width = 80;
    const height = 30;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    const firstThird = data.slice(0, Math.floor(data.length / 3));
    const lastThird = data.slice(-Math.floor(data.length / 3));
    const avgFirst = firstThird.reduce((a, b) => a + b, 0) / firstThird.length;
    const avgLast = lastThird.reduce((a, b) => a + b, 0) / lastThird.length;
    const netMovement = avgLast - avgFirst;
    
    const isPositive = netMovement > 1;
    const isNegative = netMovement < -1;
    const strokeColor = isPositive ? '#10B981' : isNegative ? '#DC2626' : '#64748B';

    return (
      <svg width={width} height={height} style={{ display: 'block' }}>
        <polyline
          points={points}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const CryptoIcon = ({ symbol, color, size = 32 }) => {
    const icons = {
      BTC: (
        <svg viewBox="0 0 32 32" width={size} height={size}>
          <circle cx="16" cy="16" r="16" fill={color} />
          <path d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.113-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z" fill="white" />
        </svg>
      ),
      ETH: (
        <svg viewBox="0 0 32 32" width={size} height={size}>
          <circle cx="16" cy="16" r="16" fill={color} />
          <path d="M16.498 4v8.87l7.497 3.35z" fill="white" fillOpacity="0.6" />
          <path d="M16.498 4L9 16.22l7.498-3.35z" fill="white" />
          <path d="M16.498 21.968v6.027L24 17.616z" fill="white" fillOpacity="0.6" />
          <path d="M16.498 27.995v-6.028L9 17.616z" fill="white" />
          <path d="M16.498 20.573l7.497-4.353-7.497-3.348z" fill="white" fillOpacity="0.2" />
          <path d="M9 16.22l7.498 4.353v-7.701z" fill="white" fillOpacity="0.6" />
        </svg>
      )
    };
    
    return icons[symbol] || (
      <div style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.4,
        fontWeight: 600,
        color: 'white'
      }}>
        {symbol.charAt(0)}
      </div>
    );
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  const toggleWatchlist = (symbol) => {
    setWatchlist(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const sortedAssets = [...marketData.assets].sort((a, b) => {
    let aVal, bVal;
    
    switch(sortBy) {
      case 'marketCap':
        aVal = a.marketCap;
        bVal = b.marketCap;
        break;
      case 'price':
        aVal = a.price;
        bVal = b.price;
        break;
      case 'change24h':
        aVal = a.change24h;
        bVal = b.change24h;
        break;
      case 'volume':
        aVal = a.volume24h;
        bVal = b.volume24h;
        break;
      default:
        aVal = a.rank;
        bVal = b.rank;
    }
    
    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
  });

  const filteredAssets = sortedAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || 
                           (filterCategory === 'Watchlist' && watchlist.includes(asset.symbol));
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
          background: #0A0E1A;
          color: #E2E8F0;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .skeleton {
          background: linear-gradient(90deg, rgba(30, 41, 59, 0.3) 0%, rgba(51, 65, 85, 0.5) 50%, rgba(30, 41, 59, 0.3) 100%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite linear;
          border-radius: 6px;
        }

        .markets-container {
          min-height: 100vh;
          background: #0A0E1A;
        }

        .top-nav {
          background: rgba(10, 14, 26, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
          padding: 0 32px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 48px;
        }

        .logo {
          font-size: 15px;
          font-weight: 600;
          color: #94A3B8;
          letter-spacing: 0.05em;
        }

        .nav-menu {
          display: flex;
          gap: 32px;
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

        .markets-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 32px 32px 64px;
        }

        .hero-section {
          margin-bottom: 32px;
        }

        .page-title {
          font-size: 26px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          font-size: 14px;
          color: #64748B;
        }

        .global-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .metric-card {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.06);
          border-radius: 12px;
          padding: 20px;
          transition: all 0.2s;
        }

        .metric-card:hover {
          border-color: rgba(148, 163, 184, 0.12);
          background: rgba(15, 23, 42, 0.5);
        }

        .metric-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .metric-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(59, 130, 246, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .metric-label {
          font-size: 12px;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        .metric-value {
          font-size: 24px;
          font-weight: 600;
          color: #F8FAFC;
          font-variant-numeric: tabular-nums;
        }

        .metric-change {
          font-size: 12px;
          color: #64748B;
          margin-top: 4px;
        }

        .metric-change.positive {
          color: #10B981;
        }

        .top-movers {
          margin-bottom: 32px;
        }

        .section-title {
          font-size: 15px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 16px;
        }

        .movers-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .mover-card {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.06);
          border-radius: 12px;
          padding: 20px;
          transition: all 0.2s;
          cursor: pointer;
        }

        .mover-card:hover {
          border-color: rgba(148, 163, 184, 0.12);
          background: rgba(15, 23, 42, 0.5);
        }

        .mover-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .mover-info h4 {
          font-size: 16px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 2px;
        }

        .mover-info p {
          font-size: 12px;
          color: #64748B;
        }

        .mover-change {
          font-size: 20px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }

        .mover-change.positive {
          color: #10B981;
        }

        .mover-change.negative {
          color: #DC2626;
        }

        .mover-stats {
          display: flex;
          justify-content: space-between;
        }

        .mover-stat {
          flex: 1;
        }

        .mover-stat-label {
          font-size: 11px;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }

        .mover-stat-value {
          font-size: 14px;
          font-weight: 600;
          color: #E2E8F0;
          font-variant-numeric: tabular-nums;
        }

        .controls-section {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .search-box {
          flex: 1;
          position: relative;
        }

        .search-input {
          width: 100%;
          height: 44px;
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.08);
          border-radius: 8px;
          padding: 0 16px 0 44px;
          font-size: 14px;
          color: #E2E8F0;
          outline: none;
          transition: all 0.2s;
        }

        .search-input:focus {
          border-color: rgba(59, 130, 246, 0.3);
          background: rgba(15, 23, 42, 0.6);
        }

        .search-input::placeholder {
          color: #64748B;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
        }

        .filter-buttons {
          display: flex;
          gap: 8px;
        }

        .filter-btn {
          height: 44px;
          padding: 0 16px;
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.08);
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #64748B;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .filter-btn:hover {
          border-color: rgba(148, 163, 184, 0.12);
          background: rgba(15, 23, 42, 0.5);
        }

        .filter-btn.active {
          color: #3B82F6;
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .market-table {
          background: rgba(15, 23, 42, 0.3);
          border: 1px solid rgba(148, 163, 184, 0.06);
          border-radius: 12px;
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
        }

        th {
          text-align: left;
          padding: 16px 20px;
          font-size: 11px;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
          cursor: pointer;
          user-select: none;
          transition: color 0.2s;
        }

        th:hover {
          color: #94A3B8;
        }

        th.sortable {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        tbody tr {
          border-bottom: 1px solid rgba(148, 163, 184, 0.04);
          transition: background 0.2s;
        }

        tbody tr:hover {
          background: rgba(15, 23, 42, 0.3);
        }

        td {
          padding: 16px 20px;
          font-size: 14px;
        }

        .rank-cell {
          color: #64748B;
          font-weight: 500;
          width: 60px;
        }

        .watchlist-cell {
          width: 40px;
        }

        .star-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: transform 0.2s;
        }

        .star-btn:hover {
          transform: scale(1.1);
        }

        .asset-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .asset-name-wrapper h4 {
          font-size: 14px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 2px;
        }

        .asset-name-wrapper p {
          font-size: 12px;
          color: #64748B;
        }

        .price-cell {
          font-weight: 600;
          color: #F8FAFC;
          font-variant-numeric: tabular-nums;
        }

        .change-cell {
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }

        .change-cell.positive {
          color: #10B981;
        }

        .change-cell.negative {
          color: #DC2626;
        }

        .marketcap-cell {
          color: #E2E8F0;
          font-variant-numeric: tabular-nums;
        }

        .volume-cell {
          color: #94A3B8;
          font-variant-numeric: tabular-nums;
        }

        @media (max-width: 1024px) {
          .global-metrics {
            grid-template-columns: repeat(2, 1fr);
          }

          .movers-grid {
            grid-template-columns: 1fr;
          }

          .nav-menu {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .top-nav {
            padding: 0 16px;
          }

          .markets-content {
            padding: 20px 16px 40px;
          }

          .global-metrics {
            grid-template-columns: 1fr;
          }

          .controls-section {
            flex-direction: column;
          }

          .filter-buttons {
            overflow-x: auto;
            flex-wrap: nowrap;
          }

          table {
            display: block;
            overflow-x: auto;
          }

          th, td {
            padding: 12px 16px;
          }
        }
      `}</style>

      <div className="markets-container">
        

        <div className="markets-content">
          <div className="hero-section">
            <h1 className="page-title">Markets</h1>
            <p className="page-subtitle">Real-time market data and insights across major digital assets</p>
          </div>

          {loading ? (
            <>
              <div className="global-metrics">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="metric-card">
                    <div className="skeleton" style={{ width: '100px', height: '14px', marginBottom: '12px' }}></div>
                    <div className="skeleton" style={{ width: '140px', height: '28px' }}></div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="global-metrics">
                <div className="metric-card">
                  <div className="metric-header">
                    <div className="metric-icon">
                      <TrendingUp size={16} color="#3B82F6" />
                    </div>
                  </div>
                  <div className="metric-label">Market Cap</div>
                  <div className="metric-value">{formatMarketCap(marketData.globalMetrics.totalMarketCap)}</div>
                  <div className="metric-change positive">+2.4% today</div>
                </div>

                <div className="metric-card">
                  <div className="metric-header">
                    <div className="metric-icon">
                      <Activity size={16} color="#3B82F6" />
                    </div>
                  </div>
                  <div className="metric-label">24h Volume</div>
                  <div className="metric-value">{formatVolume(marketData.globalMetrics.volume24h)}</div>
                  <div className="metric-change">Market activity</div>
                </div>

                <div className="metric-card">
                  <div className="metric-header">
                    <div className="metric-icon">
                      <Zap size={16} color="#3B82F6" />
                    </div>
                  </div>
                  <div className="metric-label">BTC Dominance</div>
                  <div className="metric-value">{marketData.globalMetrics.btcDominance}%</div>
                  <div className="metric-change">Market share</div>
                </div>

                <div className="metric-card">
                  <div className="metric-header">
                    <div className="metric-icon">
                      <TrendingUp size={16} color="#3B82F6" />
                    </div>
                  </div>
                  <div className="metric-label">Fear & Greed</div>
                  <div className="metric-value">{marketData.globalMetrics.fearGreedIndex}</div>
                  <div className="metric-change positive">Greed</div>
                </div>
              </div>

              <div className="top-movers">
                <h2 className="section-title">Top Movers (24h)</h2>
                <div className="movers-grid">
                  {marketData.topMovers.map((mover, index) => (
                    <div key={index} className="mover-card">
                      <div className="mover-header">
                        <div className="mover-info">
                          <h4>{mover.symbol}</h4>
                          <p>{mover.name}</p>
                        </div>
                        <div className={`mover-change ${mover.change24h >= 0 ? 'positive' : 'negative'}`}>
                          {mover.change24h >= 0 ? '+' : ''}{mover.change24h.toFixed(1)}%
                        </div>
                      </div>
                      <div className="mover-stats">
                        <div className="mover-stat">
                          <div className="mover-stat-label">Price</div>
                          <div className="mover-stat-value">{formatCurrency(mover.price)}</div>
                        </div>
                        <div className="mover-stat">
                          <div className="mover-stat-label">Volume</div>
                          <div className="mover-stat-value">{formatVolume(mover.volume)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="controls-section">
            <div className="search-box">
              <Search size={18} color="#64748B" className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search cryptocurrencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterCategory === 'All' ? 'active' : ''}`}
                onClick={() => setFilterCategory('All')}
              >
                All Markets
              </button>
              <button
                className={`filter-btn ${filterCategory === 'Watchlist' ? 'active' : ''}`}
                onClick={() => setFilterCategory('Watchlist')}
              >
                <Star size={14} />
                Watchlist
              </button>
            </div>
          </div>

          <div className="market-table">
            <table>
              <thead>
                <tr>
                  <th style={{ width: '40px' }}></th>
                  <th style={{ width: '60px' }}>#</th>
                  <th>Name</th>
                  <th style={{ cursor: 'pointer' }} onClick={() => handleSort('price')}>
                    Price {sortBy === 'price' && (sortDirection === 'desc' ? '↓' : '↑')}
                  </th>
                  <th style={{ cursor: 'pointer' }} onClick={() => handleSort('change24h')}>
                    24h % {sortBy === 'change24h' && (sortDirection === 'desc' ? '↓' : '↑')}
                  </th>
                  <th>7d %</th>
                  <th style={{ cursor: 'pointer' }} onClick={() => handleSort('marketCap')}>
                    Market Cap {sortBy === 'marketCap' && (sortDirection === 'desc' ? '↓' : '↑')}
                  </th>
                  <th style={{ cursor: 'pointer' }} onClick={() => handleSort('volume')}>
                    Volume (24h) {sortBy === 'volume' && (sortDirection === 'desc' ? '↓' : '↑')}
                  </th>
                  <th>Last 7 Days</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
                  <tr key={asset.symbol}>
                    <td className="watchlist-cell">
                      <button 
                        className="star-btn"
                        onClick={() => toggleWatchlist(asset.symbol)}
                      >
                        <Star 
                          size={16} 
                          color={watchlist.includes(asset.symbol) ? '#F59E0B' : '#64748B'}
                          fill={watchlist.includes(asset.symbol) ? '#F59E0B' : 'none'}
                        />
                      </button>
                    </td>
                    <td className="rank-cell">{asset.rank}</td>
                    <td>
                      <div className="asset-cell">
                        <CryptoIcon symbol={asset.symbol} color={asset.color} />
                        <div className="asset-name-wrapper">
                          <h4>{asset.symbol}</h4>
                          <p>{asset.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="price-cell">{formatCurrency(asset.price)}</td>
                    <td className={`change-cell ${asset.change24h >= 0 ? 'positive' : 'negative'}`}>
                      {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                    </td>
                    <td className={`change-cell ${asset.change7d >= 0 ? 'positive' : 'negative'}`}>
                      {asset.change7d >= 0 ? '+' : ''}{asset.change7d.toFixed(2)}%
                    </td>
                    <td className="marketcap-cell">{formatMarketCap(asset.marketCap)}</td>
                    <td className="volume-cell">{formatVolume(asset.volume24h)}</td>
                    <td>
                      <Sparkline data={asset.sparkline} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}