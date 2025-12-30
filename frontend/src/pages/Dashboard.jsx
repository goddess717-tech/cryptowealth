import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight, Bell, Settings, User, Search, TrendingUp, DollarSign, PieChart, Award, Menu, X } from 'lucide-react';

export default function CryptoWealthDashboard() {
  const user = JSON.parse(localStorage.getItem('auth_user'));
  const [scrollPosition, setScrollPosition] = useState(0);
  const [txFilter, setTxFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  

  const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};


  
  
  // Core portfolio state - everything is derived from this
  
  const [portfolioData, setPortfolioData] = useState({
    assets: [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        color: '#F7931A',
        units: 3.2847,
        purchasePrice: 92194.31,
        currentPrice: 98436.00,
        weekAgoPrice: 91250.00,
        sparkline: [45, 48, 47, 52, 55, 51, 58, 62, 59, 65, 68, 66, 71, 75, 72, 78, 81, 79, 85, 88, 86, 91, 94, 92, 97, 100, 98, 103, 106, 104]
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        color: '#627EEA',
        units: 89.4721,
        purchasePrice: 3624.18,
        currentPrice: 3988.50,
        weekAgoPrice: 3695.00,
        sparkline: [38, 41, 39, 44, 47, 43, 49, 53, 50, 56, 59, 57, 62, 66, 63, 69, 72, 70, 75, 78, 76, 81, 84, 82, 87, 90, 88, 93, 96, 94]
      },
      {
        symbol: 'USDT',
        name: 'Tether',
        color: '#26A17B',
        units: 156031.24,
        purchasePrice: 0.9998,
        currentPrice: 1.0001,
        weekAgoPrice: 0.9999,
        sparkline: [50, 50, 50, 50, 50, 50, 51, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 51, 50, 50, 50, 50, 50, 50, 51, 50, 50, 50, 50]
      },
      {
        symbol: 'BNB',
        name: 'Binance Coin',
        color: '#F3BA2F',
        units: 294.8214,
        purchasePrice: 673.21,
        currentPrice: 657.08,
        weekAgoPrice: 678.50,
        sparkline: [65, 68, 64, 70, 73, 69, 66, 62, 58, 61, 59, 55, 52, 56, 53, 50, 54, 51, 48, 52, 49, 46, 50, 47, 44, 48, 45, 42, 46, 43]
      },
      {
        symbol: 'LTC',
        name: 'Litecoin',
        color: '#345D9D',
        units: 847.2914,
        purchasePrice: 105.56,
        currentPrice: 118.29,
        weekAgoPrice: 112.40,
        sparkline: [42, 45, 43, 48, 51, 49, 54, 57, 55, 60, 63, 61, 66, 69, 67, 72, 75, 73, 78, 81, 79, 84, 87, 85, 90, 93, 91, 96, 99, 97]
      }
    ]
  });

  // Derived calculations - all values computed from asset data
  const calculatePortfolioMetrics = () => {
    const assets = portfolioData.assets;
    
    // Current total value
    const totalValue = assets.reduce((sum, asset) => 
      sum + (asset.units * asset.currentPrice), 0
    );
    
    // Total value one week ago
    const weekAgoValue = assets.reduce((sum, asset) => 
      sum + (asset.units * asset.weekAgoPrice), 0
    );
    
    // Weekly change in dollars
    const weeklyChange = totalValue - weekAgoValue;
    
    // Calculate allocation percentages
    const assetsWithMetrics = assets.map(asset => {
      const totalValue = asset.units * asset.currentPrice;
      const costBasis = asset.units * asset.purchasePrice;
      const returnValue = totalValue - costBasis;
      const returnPercent = ((asset.currentPrice - asset.purchasePrice) / asset.purchasePrice) * 100;
      const allocation = (totalValue / totalValue) * 100;
      
      return {
        ...asset,
        totalValue,
        costBasis,
        returnValue,
        returnPercent,
        allocation: (totalValue / totalValue) * 100
      };
    });
    
    // Recalculate allocations based on total portfolio value
    const enrichedAssets = assetsWithMetrics.map(asset => ({
      ...asset,
      allocation: (asset.totalValue / totalValue) * 100
    }));
    
    return {
      totalValue,
      weeklyChange,
      weeklyChangePercent: (weeklyChange / weekAgoValue) * 100,
      assets: enrichedAssets
    };
  };

  const metrics = calculatePortfolioMetrics();

 // Live price simulation - updates every 2 seconds with realistic market behavior
  useEffect(() => {
    if (loading) return;
    
    const priceUpdateInterval = setInterval(() => {
      setPortfolioData(prev => ({
        assets: prev.assets.map(asset => {
          // Realistic bidirectional price fluctuation (-0.3% to +0.3%)
          // Slight upward bias to maintain long-term portfolio growth
          const randomWalk = (Math.random() - 0.48) * 0.6; // Subtle positive drift
          const priceChange = asset.currentPrice * (randomWalk / 100);
          
          // Allow genuine price discovery without artificial bounds
          let newPrice = asset.currentPrice + priceChange;
          
          // Soft boundaries to prevent extreme deviations (±15% from purchase)
          const lowerBound = asset.purchasePrice * 0.85;
          const upperBound = asset.purchasePrice * 1.25;
          
          if (newPrice < lowerBound) newPrice = lowerBound + Math.random() * (asset.purchasePrice * 0.02);
          if (newPrice > upperBound) newPrice = upperBound - Math.random() * (asset.purchasePrice * 0.02);
          
          // Update sparkline with realistic volatility
          const lastPoint = asset.sparkline[asset.sparkline.length - 1];
          
          // Calculate momentum based on recent trend
          const recentTrend = asset.sparkline.slice(-5);
          const momentum = recentTrend[recentTrend.length - 1] - recentTrend[0];
          
          // Add mean reversion tendency
          let sparklineChange = (Math.random() - 0.5) * 6;
          if (lastPoint > 70) sparklineChange -= 1; // Pull down from highs
          if (lastPoint < 30) sparklineChange += 1; // Pull up from lows
          if (momentum > 15) sparklineChange -= 0.5; // Resist overbought
          if (momentum < -15) sparklineChange += 0.5; // Resist oversold
          
          const newPoint = Math.max(5, Math.min(95, lastPoint + sparklineChange));
          
          return {
            ...asset,
            currentPrice: newPrice,
            sparkline: [...asset.sparkline.slice(1), newPoint]
          };
        })
      }));
    }, 2000);
    
    return () => clearInterval(priceUpdateInterval);
  }, [loading]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const allTransactions = [
    { 
      type: 'Investment', 
      category: 'Deposits',
      asset: 'Bitcoin', 
      subtext: 'Coinbase Commerce',
      market: '3.2847 BTC', 
      detail: 'TX: 0x7f9a...b21c',
      status: 'Confirmed', 
      date: 'Dec 18, 2025', 
      time: '14:23', 
      amount: 323284.00, 
      positive: true 
    },
    { 
      type: 'Investment', 
      category: 'Trades',
      asset: 'Ethereum', 
      subtext: 'Kraken OTC',
      market: '45.2 ETH', 
      detail: 'Fee: $127.50',
      status: 'Settled', 
      date: 'Dec 17, 2025', 
      time: '09:41', 
      amount: -180280.00, 
      positive: false 
    },
    { 
      type: 'Profit', 
      category: 'Rewards',
      asset: 'Ethereum', 
      subtext: 'Lido Finance',
      market: '0.7842 ETH', 
      detail: 'APY: 3.8%',
      status: 'Claimed', 
      date: 'Dec 16, 2025', 
      time: '00:00', 
      amount: 3127.18, 
      positive: true 
    },
    { 
      type: 'Investment', 
      category: 'Trades',
      asset: 'Binance Coin', 
      subtext: 'Binance OTC',
      market: '75.0 BNB', 
      detail: 'Partial: 45/75',
      status: 'Processing', 
      date: 'Dec 15, 2025', 
      time: '16:12', 
      amount: -49281.00, 
      positive: false 
    },
    { 
      type: 'Withdrawal', 
      category: 'Deposits',
      asset: 'USD', 
      subtext: 'JPM Chase ***4721',
      market: '$75,000', 
      detail: 'WR-2025-1215',
      status: 'Confirmed', 
      date: 'Dec 14, 2025', 
      time: '11:05', 
      amount: -75000.00, 
      positive: false 
    },
    { 
      type: 'Investment', 
      category: 'Trades',
      asset: 'Litecoin', 
      subtext: 'Coinbase Prime',
      market: '280.5 LTC', 
      detail: 'Fee: $66.25',
      status: 'Settled', 
      date: 'Dec 13, 2025', 
      time: '10:18', 
      amount: -33189.00, 
      positive: false 
    },
    { 
      type: 'Profit', 
      category: 'Rewards',
      asset: 'Bitcoin', 
      subtext: 'Yield Interest',
      market: '0.0521 BTC', 
      detail: 'APY: 4.5%',
      status: 'Claimed', 
      date: 'Dec 12, 2025', 
      time: '00:00', 
      amount: 5128.47, 
      positive: true 
    },
    { 
      type: 'Investment', 
      category: 'Deposits',
      asset: 'Tether', 
      subtext: 'Bitpay Gateway',
      market: '156,000 USDT', 
      detail: 'TX: 0x3c8f...92da',
      status: 'Confirmed', 
      date: 'Dec 11, 2025', 
      time: '13:47', 
      amount: 156015.60, 
      positive: true 
    }
  ];

  const transactions = txFilter === 'All' 
    ? allTransactions 
    : allTransactions.filter(tx => tx.category === txFilter);

  const scrollPortfolio = (direction) => {
    const container = document.getElementById('portfolio-scroll');
    const scrollAmount = 360;
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value, decimals = 4) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  };

  const CryptoIcon = ({ symbol, color }) => {
    const icons = {
      BTC: (
        <svg viewBox="0 0 32 32" width="40" height="40">
          <circle cx="16" cy="16" r="16" fill={color} />
          <path d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.113-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z" fill="white" />
        </svg>
      ),
      ETH: (
        <svg viewBox="0 0 32 32" width="40" height="40">
          <circle cx="16" cy="16" r="16" fill={color} />
          <path d="M16.498 4v8.87l7.497 3.35z" fill="white" fillOpacity="0.6" />
          <path d="M16.498 4L9 16.22l7.498-3.35z" fill="white" />
          <path d="M16.498 21.968v6.027L24 17.616z" fill="white" fillOpacity="0.6" />
          <path d="M16.498 27.995v-6.028L9 17.616z" fill="white" />
          <path d="M16.498 20.573l7.497-4.353-7.497-3.348z" fill="white" fillOpacity="0.2" />
          <path d="M9 16.22l7.498 4.353v-7.701z" fill="white" fillOpacity="0.6" />
        </svg>
      ),
      USDT: (
        <svg viewBox="0 0 32 32" width="40" height="40">
          <circle cx="16" cy="16" r="16" fill={color} />
          <path d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117" fill="white" />
        </svg>
      ),
      BNB: (
        <svg viewBox="0 0 32 32" width="40" height="40">
          <circle cx="16" cy="16" r="16" fill={color} />
          <path d="M16 6l-2.3 2.3-4.6 4.6L6.8 15.2 9.1 17.5l2.3-2.3L16 10.6l4.6 4.6 2.3 2.3 2.3-2.3-2.3-2.3-4.6-4.6L16 6zm0 5.3L11.4 16l-2.3 2.3 2.3 2.3L16 16l4.6 4.6 2.3-2.3-2.3-2.3L16 11.3zM11.4 16L9.1 18.3 11.4 20.6 13.7 18.3 11.4 16zm9.2 0l-2.3 2.3 2.3 2.3 2.3-2.3-2.3-2.3zM16 18.3l-4.6 4.6-2.3 2.3 2.3 2.3 4.6-4.6L18.3 25.2l2.3-2.3-4.6-4.6z" fill="white" />
        </svg>
      ),
      LTC: (
        <svg viewBox="0 0 32 32" width="40" height="40">
          <circle cx="16" cy="16" r="16" fill={color} />
          <path d="M10.427 19.214L9 23.799h14.822L24 21.34h-8.96l.39-1.335 1.563-.622.78-2.657-1.563.623 1.243-4.242h-3.383L12.004 19.1l-1.577.114z" fill="white" />
        </svg>
      )
    };
    return icons[symbol] || null;
  };

  const Sparkline = ({ data, positive }) => {
    const width = 140;
    const height = 50;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} style={{ display: 'block' }}>
        <defs>
          <linearGradient id={`gradient-${positive}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={positive ? '#10B981' : '#EF4444'} stopOpacity="0.2" />
            <stop offset="100%" stopColor={positive ? '#10B981' : '#EF4444'} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={`0,${height} ${points} ${width},${height}`}
          fill={`url(#gradient-${positive})`}
        />
        <polyline
          points={points}
          fill="none"
          stroke={positive ? '#10B981' : '#EF4444'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const SkeletonHero = () => (
    <div className="hero-section">
      <div className="skeleton skeleton-text" style={{ width: '120px', height: '14px', marginBottom: '8px' }}></div>
      <div className="skeleton skeleton-text" style={{ width: '240px', height: '28px', marginBottom: '32px' }}></div>
      <div className="skeleton skeleton-text" style={{ width: '180px', height: '12px', marginBottom: '12px' }}></div>
      <div className="skeleton skeleton-text" style={{ width: '280px', height: '48px', marginBottom: '12px' }}></div>
      <div className="skeleton skeleton-text" style={{ width: '180px', height: '14px' }}></div>
    </div>
  );

    const SkeletonBottom = () => (
    <div>
      <div className="skeleton skeleton-text" style={{ width: '120px', height: '14px', marginBottom: '8px' }}></div>
    </div>
  );

  const SkeletonAssetCard = () => (
    <div className="asset-card">
      <div className="asset-header">
        <div className="skeleton skeleton-icon" style={{ width: '40px', height: '40px' }}></div>
        <div style={{ flex: 1, marginLeft: '12px' }}>
          <div className="skeleton skeleton-text" style={{ width: '80px', height: '18px', marginBottom: '4px' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '60px', height: '12px' }}></div>
        </div>
      </div>
      <div className="skeleton skeleton-chart" style={{ width: '100%', height: '50px', margin: '20px 0' }}></div>
      <div className="skeleton skeleton-text" style={{ width: '100px', height: '14px', marginBottom: '12px' }}></div>
      <div className="skeleton skeleton-text" style={{ width: '140px', height: '20px' }}></div>
    </div>
  );

  const firstName = user?.fullName?.trim().split(/\s+/)[0] ?? "";


if (!user) {
  return null; // or redirect to /auth
}


  return (
    <>
      <style>{`
      

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

        .app-container {
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

        .dashboard-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 32px 32px 64px;
        }

        .hero-section {
          margin-bottom: 40px;
          padding: 36px 0;
          border-bottom: 1px solid rgba(148, 163, 184, 0.06);
          display: flex;
          justify-content: space-between;
          max-width:1200px;
          width:95%;
          margin: auto;
          
        }

        .greeting {
          font-size: 13px;
          color: #64748B;
          margin-bottom: 6px;
          font-weight: 400;
        }

        .client-name {
          font-size: 2.5rem;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 32px;
          letter-spacing: 1.2;
        }

        .total-balance-label {
          font-size: 11px;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .balance-amount {
          font-size: 48px;
          font-weight: 600;
          color: #F8FAFC;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 12px;
          font-variant-numeric: tabular-nums;
        }

        .weekly-delta {
          font-size: 14px;
          color: #64748B;
          font-weight: 400;
          font-variant-numeric: tabular-nums;
          display:flex;
          align-items: center;
          gap: 10px;
        }

        .weekly-delta .positive {
          color: #10B981;
        }

        .weekly-delta .negative {
          color: #EF4444;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 15px;
          font-weight: 600;
          color: #F8FAFC;
          letter-spacing: -0.01em;
        }

        .scroll-controls {
          display: flex;
          gap: 8px;
        }

        .scroll-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: 1px solid rgba(148, 163, 184, 0.08);
          background: rgba(30, 41, 59, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .scroll-btn:hover {
          background: rgba(30, 41, 59, 0.4);
        }

        .portfolio-scroll {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scrollbar-width: none;
          padding-bottom: 4px;
          margin-bottom: 40px;
        }

        .portfolio-scroll::-webkit-scrollbar {
          display: none;
        }

        .asset-card {
          min-width: 280px;
          background: rgba(15, 23, 42, 0.4);
          border-radius: 12px;
          padding: 24px;
          border: 1px solid rgba(148, 163, 184, 0.06);
          transition: all 0.2s;
        }

        .asset-card:hover {
          border-color: rgba(148, 163, 184, 0.12);
          background: rgba(15, 23, 42, 0.5);
        }

        .asset-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .asset-info {
          margin-left: 12px;
          flex: 1;
        }

        .asset-symbol {
          font-size: 16px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 2px;
        }

        .asset-name {
          font-size: 12px;
          color: #64748B;
        }

        .sparkline-container {
          margin-bottom: 20px;
        }

        .asset-metric {
          margin-bottom: 12px;
        }

        .asset-metric:last-child {
          margin-bottom: 0;
        }

        .metric-label {
          font-size: 11px;
          color: #64748B;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .metric-value {
          font-size: 16px;
          font-weight: 600;
          color: #F8FAFC;
          font-variant-numeric: tabular-nums;
        }

        .metric-value.positive {
          color: #10B981;
        }

        .metric-value.negative {
          color: #EF4444;
        }

        .section-title-transactions {
          font-size: 15px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 20px;
        }

        .filter-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }

        .filter-tab {
          padding: 6px 14px;
          background: transparent;
          color: #F8FAFC;
          border: 0;
      }
          .filter-tab.active {
      background: rgba(59, 130, 246, 0.1);
      border-color: rgba(59, 130, 246, 0.3);
    }

    .transaction-table {
      width: 100%;
    }

    .transaction-table thead th {
      text-align: left;
      padding: 12px 12px 12px 0;
      font-size: 11px;
      color: #64748B;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 500;
      border-bottom: 1px solid rgba(148, 163, 184, 0.06);
    }

    .transaction-table thead th:last-child {
      text-align: right;
      padding-right: 0;
    }

    .transaction-table tbody tr {
      border-bottom: 1px solid rgba(148, 163, 184, 0.04);
    }

    .transaction-table tbody td {
      padding: 16px 12px 16px 0;
      font-size: 13px;
    }

    .transaction-table tbody td:last-child {
      padding-right: 0;
    }

    .transaction-type {
      font-weight: 500;
      color: #E2E8F0;
    }

    .transaction-asset {
      color: #E2E8F0;
      font-weight: 500;
    }

    .transaction-subtext {
      color: #64748B;
      font-size: 12px;
      display: block;
      margin-top: 2px;
    }

    .transaction-market {
      color: #64748B;
      font-size: 12px;
    }

    .status-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 500;
    }

    .status-confirmed {
      background: rgba(16, 185, 129, 0.1);
      color: #10B981;
    }

    .status-settled {
      background: rgba(59, 130, 246, 0.1);
      color: #3B82F6;
    }

    .status-claimed {
      background: rgba(139, 92, 246, 0.1);
      color: #8B5CF6;
    }

    .status-processing {
      background: rgba(245, 158, 11, 0.1);
      color: #F59E0B;
    }

    .transaction-date {
      color: #94A3B8;
      font-size: 13px;
    }

    .transaction-time {
      color: #64748B;
      font-size: 12px;
      display: block;
      margin-top: 2px;
    }

    .transaction-amount {
      font-weight: 600;
      font-size: 14px;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }

    .transaction-amount.positive {
      color: #10B981;
    }

    .transaction-amount.negative {
      color: #E2E8F0;
    }

    @media (max-width: 1024px) {
      .nav-menu {
        display: none;
      }

      .dashboard-container {
        padding: 24px 24px 48px;
      }

      .asset-card {
        min-width: 260px;
      }
    }

    @media (max-width: 768px) {
      .top-nav {
        padding: 0 16px;
      }

      .dashboard-container {
        padding: 20px 16px 40px;
      }

      .hero-section{
        flex-direction: column
      }

      .client-name {
        font-size: 1.3rem;
      }

      .balance-amount {
        font-size: 36px;
      }

      .asset-card {
        min-width: 240px;
        padding: 20px;
      }

      .transaction-table thead {
        display: none;
      }

      .transaction-table tbody tr {
        display: block;
        margin-bottom: 16px;
        padding: 16px;
        background: rgba(15, 23, 42, 0.3);
        border-radius: 8px;
        border: 1px solid rgba(148, 163, 184, 0.06);
      }

      .transaction-table tbody td {
        display: block;
        padding: 6px 0;
        text-align: left !important;
      }

      .transaction-table tbody td::before {
        content: attr(data-label);
        font-size: 11px;
        color: #64748B;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        display: block;
        margin-bottom: 4px;
      }

      .transaction-amount {
        text-align: left !important;
      }
    }
      .hero-sparkline {
  width: 60px;
  height: 30px;
}

.hero-sparkline svg {
  width: 100%;
  height: 100%;
}

  `}</style>

  <div className="app-container">

    <div className="dashboard-container">
      {loading ? (
        <SkeletonHero />
      ) : (
        <div className="hero-section">
          <div>
               <div className="greeting">{getGreeting()},</div>
<div className="client-name text-uppercase">{firstName}</div>

          </div>
          <div>
            <div className="total-balance-label">Total Portfolio Value</div>
          <div className="balance-amount">{formatCurrency(metrics.totalValue)}</div>
          <div className="weekly-delta">
            <span className={metrics.weeklyChange >= 0 ? 'positive' : 'negative'}>
              {metrics.weeklyChange >= 0 ? '+' : ''}{formatCurrency(metrics.weeklyChange)}
            </span>
            {' '}this week
            <div className="hero-sparkline">
  <svg viewBox="0 0 300 100" preserveAspectRatio="none">
    <defs>
      <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(168, 85, 247, 0.45)" />
        <stop offset="100%" stopColor="rgba(168, 85, 247, 0.02)" />
      </linearGradient>
    </defs>

    {/* area */}
    <path
      d="
        M0,72
        C20,68 40,74 60,66
        C80,58 100,62 120,54
        C140,46 160,50 180,42
        C200,34 220,38 240,30
        C260,22 280,26 300,20
        L300,100 L0,100 Z
      "
      fill="url(#purpleGradient)"
    />

    {/* line */}
    <path
      d="
        M0,72
        C20,68 40,74 60,66
        C80,58 100,62 120,54
        C140,46 160,50 180,42
        C200,34 220,38 240,30
        C260,22 280,26 300,20
      "
      fill="none"
      stroke="#A855F7"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
</div>

          </div>
          </div>
          
          
        </div>
      )}

      <div className="section-header">
        <div className="section-title">Investment Portfolio</div>
        <div className="scroll-controls">
          <button className="scroll-btn" onClick={() => scrollPortfolio('left')}>
            <ChevronLeft size={16} color="#64748B" />
          </button>
          <button className="scroll-btn" onClick={() => scrollPortfolio('right')}>
            <ChevronRight size={16} color="#64748B" />
          </button>
        </div>
      </div>

      <div className="portfolio-scroll" id="portfolio-scroll">
        {loading ? (
          <>
            <SkeletonAssetCard />
            <SkeletonAssetCard />
            <SkeletonAssetCard />
            <SkeletonAssetCard />
          </>
        ) : (
          metrics.assets.map((asset, index) => (
            <div className="asset-card" key={index}>
              <div className="asset-header">
                <CryptoIcon symbol={asset.symbol} color={asset.color} />
                <div className="asset-info">
                  <div className="asset-symbol">{asset.symbol}</div>
                  <div className="asset-name">{asset.name}</div>
                </div>
              </div>

              <div className="sparkline-container">
                <Sparkline 
                  data={asset.sparkline} 
                  positive={asset.returnPercent >= 0}
                />
              </div>

              <div className="asset-metric">
                <div className="metric-label">Current Price</div>
                <div className="metric-value">
                  {formatCurrency(asset.currentPrice)}
                </div>
              </div>

              <div className="asset-metric">
                <div className="metric-label">Total Value</div>
                <div className="metric-value">
                  {formatCurrency(asset.totalValue)}
                </div>
              </div>

              <div className="asset-metric">
                <div className="metric-label">Total Return</div>
                <div className={`metric-value ${asset.returnPercent >= 0 ? 'positive' : 'negative'}`}>
                  {asset.returnPercent >= 0 ? '+' : ''}{asset.returnPercent.toFixed(2)}%
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div>
       { loading ? (
        <SkeletonBottom />
       ) : (<a href="/history" className='text-center d-block text-secondary mt-3'>Show Transaction History</a>)}
      </div>
    </div>
  </div>
</>
  )
}