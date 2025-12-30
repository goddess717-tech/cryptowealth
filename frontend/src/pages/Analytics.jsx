import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Activity, Calendar, ArrowUpRight, ArrowDownRight, Target, Award, Bell, Settings, User } from 'lucide-react';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('7d');
  const [portfolioHistory, setPortfolioHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize portfolio history data
  useEffect(() => {
    const generateHistoryData = () => {
      const days = timeframe === '24h' ? 24 : timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 365;
      const data = [];
      let value = 1200000;

      for (let i = 0; i < days; i++) {
        const change = (Math.random() - 0.45) * 15000;
        value = Math.max(1000000, value + change);
        data.push({
          time: i,
          value: value,
          btc: value * 0.388,
          eth: value * 0.258,
          others: value * 0.354
        });
      }
      return data;
    };

    setPortfolioHistory(generateHistoryData());
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, [timeframe]);

  // Animate chart progression
  useEffect(() => {
    if (loading || portfolioHistory.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= portfolioHistory.length - 1) {
          const lastValue = portfolioHistory[portfolioHistory.length - 1].value;
          const change = (Math.random() - 0.45) * 15000;
          const newValue = Math.max(1000000, lastValue + change);
          
          setPortfolioHistory(prev => [
            ...prev.slice(1),
            {
              time: prev[prev.length - 1].time + 1,
              value: newValue,
              btc: newValue * 0.388,
              eth: newValue * 0.258,
              others: newValue * 0.354
            }
          ]);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [loading, portfolioHistory]);

  const assetAllocation = [
    { name: 'Bitcoin', symbol: 'BTC', value: 487293, percentage: 38.8, color: '#F7931A' },
    { name: 'Ethereum', symbol: 'ETH', value: 324156, percentage: 25.8, color: '#627EEA' },
    { name: 'Tether', symbol: 'USDT', value: 156000, percentage: 12.4, color: '#26A17B' },
    { name: 'Binance Coin', symbol: 'BNB', value: 198472, percentage: 15.8, color: '#F3BA2F' },
    { name: 'Litecoin', symbol: 'LTC', value: 89431, percentage: 7.1, color: '#345D9D' }
  ];

  const performanceMetrics = [
    { label: 'Total Return', value: '+$88,754', percentage: '+7.6%', positive: true, icon: TrendingUp },
    { label: 'Best Performer', value: 'Bitcoin', percentage: '+12.4%', positive: true, icon: Award },
    { label: 'Worst Performer', value: 'BNB', percentage: '-2.3%', positive: false, icon: TrendingDown },
    { label: 'Avg Daily Return', value: '+$1,247', percentage: '+0.11%', positive: true, icon: Activity }
  ];

  const transactionStats = [
    { type: 'Deposits', count: 28, amount: '$847,293', color: '#10B981' },
    { type: 'Withdrawals', count: 12, amount: '$289,450', color: '#EF4444' },
    { type: 'Trades', count: 45, amount: '$1,284,920', color: '#3B82F6' },
    { type: 'Rewards', count: 18, amount: '$12,847', color: '#8B5CF6' }
  ];

  const monthlyPerformance = [
    { month: 'Jan', profit: 12450 },
    { month: 'Feb', profit: 8920 },
    { month: 'Mar', profit: 15680 },
    { month: 'Apr', profit: -2340 },
    { month: 'May', profit: 18750 },
    { month: 'Jun', profit: 22100 },
    { month: 'Jul', profit: 19450 },
    { month: 'Aug', profit: 24680 },
    { month: 'Sep', profit: 16890 },
    { month: 'Oct', profit: 28340 },
    { month: 'Nov', profit: 31250 },
    { month: 'Dec', profit: 25890 }
  ];

  const topHoldings = [
    { rank: 1, asset: 'Bitcoin', symbol: 'BTC', amount: '5.2847 BTC', value: '$487,293', return: '+12.4%', positive: true, color: '#F7931A' },
    { rank: 2, asset: 'Ethereum', symbol: 'ETH', amount: '89.4721 ETH', value: '$324,156', return: '+8.7%', positive: true, color: '#627EEA' },
    { rank: 3, asset: 'Binance Coin', symbol: 'BNB', amount: '294.8214 BNB', value: '$198,472', return: '-2.3%', positive: false, color: '#F3BA2F' },
    { rank: 4, asset: 'Tether', symbol: 'USDT', amount: '156,031.24 USDT', value: '$156,000', return: '+0.02%', positive: true, color: '#26A17B' },
    { rank: 5, asset: 'Litecoin', symbol: 'LTC', amount: '847.2914 LTC', value: '$89,431', return: '+5.2%', positive: true, color: '#345D9D' }
  ];

  const formatValue = (value) => {
    return `$${value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const currentValue = portfolioHistory[Math.min(currentIndex, portfolioHistory.length - 1)]?.value || 1255352;
  const startValue = portfolioHistory[0]?.value || 1200000;
  const valueChange = currentValue - startValue;
  const percentChange = ((valueChange / startValue) * 100);

  const LineChart = ({ data, width = 800, height = 300 }) => {
    if (!data || data.length === 0) return null;

    const visibleData = data.slice(0, currentIndex + 1);
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue || 1;

    const points = visibleData.map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((d.value - minValue) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    const areaPoints = visibleData.length > 0
      ? `0,${height} ${points} ${(visibleData.length - 1) / (data.length - 1) * width},${height}`
      : '';

    const isPositive = percentChange >= 0;
    const color = isPositive ? '#10B981' : '#DC2626';

    return (
      <svg width={width} height={height} style={{ display: 'block', width: '100%', height: 'auto' }}>
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {visibleData.length > 0 && (
          <>
            <polygon points={areaPoints} fill="url(#chartGradient)" />
            <polyline
              points={points}
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>
    );
  };

  const PieChartComponent = ({ data, size = 180 }) => {
    let currentAngle = -90;
    const total = data.reduce((sum, item) => sum + item.percentage, 0);

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
        {data.map((item, index) => {
          const percentage = (item.percentage / total) * 100;
          const angle = (percentage / 100) * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;

          const x1 = size / 2 + (size / 2 - 10) * Math.cos((startAngle * Math.PI) / 180);
          const y1 = size / 2 + (size / 2 - 10) * Math.sin((startAngle * Math.PI) / 180);
          const x2 = size / 2 + (size / 2 - 10) * Math.cos((endAngle * Math.PI) / 180);
          const y2 = size / 2 + (size / 2 - 10) * Math.sin((endAngle * Math.PI) / 180);

          const largeArc = angle > 180 ? 1 : 0;

          const path = `M ${size / 2} ${size / 2} L ${x1} ${y1} A ${size / 2 - 10} ${size / 2 - 10} 0 ${largeArc} 1 ${x2} ${y2} Z`;

          currentAngle = endAngle;

          return (
            <path
              key={index}
              d={path}
              fill={item.color}
              opacity="0.85"
              stroke="rgba(10, 14, 26, 0.5)"
              strokeWidth="2"
            />
          );
        })}
        <circle cx={size / 2} cy={size / 2} r={size / 4} fill="rgba(10, 14, 26, 0.9)" />
      </svg>
    );
  };

  const BarChart = ({ data, width = 600, height = 200 }) => {
    const maxProfit = Math.max(...data.map(d => Math.abs(d.profit)));
    const barWidth = width / data.length - 8;

    return (
      <svg width={width} height={height} style={{ display: 'block', width: '100%', height: 'auto' }}>
        {data.map((item, index) => {
          const barHeight = Math.abs(item.profit / maxProfit) * (height - 40);
          const x = index * (width / data.length) + 4;
          const y = item.profit >= 0 ? height / 2 - barHeight : height / 2;
          const color = item.profit >= 0 ? '#10B981' : '#DC2626';

          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={color}
                opacity="0.8"
                rx="3"
              />
              <text
                x={x + barWidth / 2}
                y={height - 5}
                textAnchor="middle"
                fill="#64748B"
                fontSize="10"
                fontWeight="500"
              >
                {item.month}
              </text>
            </g>
          );
        })}
        <line
          x1="0"
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke="rgba(148, 163, 184, 0.2)"
          strokeWidth="1"
          strokeDasharray="4"
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

        .analytics-container {
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

        .analytics-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 32px 32px 64px;
        }

        .page-header {
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.06);
          border-radius: 12px;
          padding: 20px;
          transition: all 0.2s;
        }

        .stat-card:hover {
          border-color: rgba(148, 163, 184, 0.12);
          background: rgba(15, 23, 42, 0.5);
        }

        .stat-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .stat-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon.blue { background: rgba(59, 130, 246, 0.1); }
        .stat-icon.green { background: rgba(16, 185, 129, 0.1); }
        .stat-icon.amber { background: rgba(245, 158, 11, 0.1); }
        .stat-icon.purple { background: rgba(139, 92, 246, 0.1); }

        .stat-label {
          font-size: 12px;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 600;
          color: #F8FAFC;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
          font-variant-numeric: tabular-nums;
        }

        .stat-change {
          font-size: 12px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .stat-change.positive { color: #10B981; }
        .stat-change.negative { color: #DC2626; }

        .chart-section {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.06);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          transition: all 0.2s;
        }

        .chart-section:hover {
          border-color: rgba(148, 163, 184, 0.12);
          background: rgba(15, 23, 42, 0.5);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .chart-title {
          font-size: 15px;
          font-weight: 600;
          color: #F8FAFC;
          letter-spacing: -0.01em;
        }

        .chart-value {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .chart-main-value {
          font-size: 28px;
          font-weight: 600;
          color: #F8FAFC;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
        }

        .chart-change {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 500;
          margin-top: 4px;
        }

        .chart-change.positive { color: #10B981; }
        .chart-change.negative { color: #DC2626; }

        .timeframe-selector {
          display: flex;
          gap: 8px;
          background: rgba(15, 23, 42, 0.4);
          padding: 4px;
          border-radius: 8px;
          margin-bottom: 20px;
          border: 1px solid rgba(148, 163, 184, 0.08);
        }

        .timeframe-btn {
          padding: 6px 16px;
          font-size: 12px;
          font-weight: 500;
          color: #64748B;
          background: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .timeframe-btn:hover {
          color: #E2E8F0;
        }

        .timeframe-btn.active {
          background: rgba(59, 130, 246, 0.1);
          color: #3B82F6;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .two-column-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 15px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
        }

        .allocation-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(148, 163, 184, 0.06);
        }

        .allocation-item:last-child {
          border-bottom: none;
        }

        .allocation-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .allocation-indicator {
          width: 10px;
          height: 10px;
          border-radius: 2px;
        }

        .allocation-info {
          display: flex;
          flex-direction: column;
        }

        .allocation-name {
          font-size: 13px;
          font-weight: 500;
          color: #F8FAFC;
        }

        .allocation-symbol {
          font-size: 11px;
          color: #64748B;
        }

        .allocation-right {
          text-align: right;
        }

        .allocation-value {
          font-size: 13px;
          font-weight: 600;
          color: #E2E8F0;
          font-variant-numeric: tabular-nums;
        }

        .allocation-percentage {
          font-size: 11px;
          color: #64748B;
          margin-top: 2px;
        }

        .pie-chart-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px 0;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .metric-card {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 8px;
          padding: 16px;
          border: 1px solid rgba(148, 163, 184, 0.06);
        }

        .metric-label {
          font-size: 11px;
          color: #64748B;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        .metric-value {
          font-size: 18px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 4px;
          font-variant-numeric: tabular-nums;
        }

        .metric-subvalue {
          font-size: 12px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
          color: #64748B;
        }

        .metric-subvalue.positive { color: #10B981; }
        .metric-subvalue.negative { color: #DC2626; }

        .transaction-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .transaction-stat {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 8px;
          padding: 16px;
          border: 1px solid rgba(148, 163, 184, 0.06);
        }

        .transaction-stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .transaction-type {
          font-size: 11px;
          color: #64748B;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .transaction-count {
          font-size: 14px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 4px;
          background: rgba(59, 130, 246, 0.1);
          color: #3B82F6;
        }

        .transaction-amount {
          font-size: 18px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }

        .holdings-table {
          width: 100%;
        }

        .holdings-table thead th {
          text-align: left;
          padding: 12px;
          font-size: 11px;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
        }

        .holdings-table tbody tr {
          border-bottom: 1px solid rgba(148, 163, 184, 0.04);
          transition: all 0.2s;
        }

        .holdings-table tbody tr:hover {
          background: rgba(15, 23, 42, 0.3);
        }

        .holdings-table tbody td {
          padding: 14px 12px;
          font-size: 13px;
        }

        .rank-cell {
          color: #64748B;
          font-weight: 600;
        }

        .asset-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .asset-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .asset-name {
          font-weight: 500;
          color: #F8FAFC;
        }

        .asset-symbol {
          font-size: 11px;
          color: #64748B;
          margin-left: 6px;
        }

        .amount-cell {
          color: #94A3B8;
          font-weight: 400;
          font-variant-numeric: tabular-nums;
        }

        .value-cell {
          color: #E2E8F0;
          font-weight: 500;
          font-variant-numeric: tabular-nums;
        }

        .return-cell {
          font-weight: 500;
          font-variant-numeric: tabular-nums;
        }

        .return-cell.positive { color: #10B981; }
        .return-cell.negative { color: #DC2626; }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .two-column-grid {
            grid-template-columns: 1fr;
          }

          .transaction-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .nav-menu {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .top-nav {
            padding: 0 16px;
          }

          .analytics-content {
            padding: 20px 16px 40px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .chart-section {
            padding: 20px 16px;
          }

          .chart-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .chart-value {
            align-items: flex-start;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .transaction-stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="analytics-container">

        <div className="analytics-content">
          <div className="page-header">
            <h1 className="page-title">Analytics Dashboard</h1>
            <p className="page-subtitle">Comprehensive insights into your portfolio performance and trends</p>
          </div>

          {/* Performance Stats */}
          <div className="stats-grid">
            {loading ? (
              <>
                {[1, 2, 3, 4].map(i => (
                  <div className="stat-card" key={i}>
                    <div className="skeleton" style={{ width: '32px', height: '32px', marginBottom: '12px' }}></div>
                    <div className="skeleton" style={{ width: '100px', height: '12px', marginBottom: '8px' }}></div>
                    <div className="skeleton" style={{ width: '120px', height: '24px', marginBottom: '4px' }}></div>
                    <div className="skeleton" style={{ width: '80px', height: '12px' }}></div>
                  </div>
                ))}
              </>
            ) : (
              performanceMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div className="stat-card" key={index}>
                    <div className="stat-header">
                      <div className={`stat-icon ${index === 0 ? 'blue' : index === 1 ? 'green' : index === 2 ? 'amber' : 'purple'}`}>
                        <Icon size={16} color={index === 0 ? '#3B82F6' : index === 1 ? '#10B981' : index === 2 ? '#F59E0B' : '#8B5CF6'} />
                      </div>
                    </div>
                    <div className="stat-label">{metric.label}</div>
                    <div className="stat-value">{metric.value}</div>
                    <div className={`stat-change ${metric.positive ? 'positive' : 'negative'}`}>
                      {metric.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {metric.percentage}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Portfolio Value Chart */}
          <div className="chart-section">
            <div className="chart-header">
              {/* <h2 className="chart-title">Portfolio Value Over Time</h2> */}
              <div className="chart-value">
                {/* <div className="chart-main-value">{formatValue(currentValue)}</div> */}
                {/* <div className={`chart-change ${percentChange >= 0 ? 'positive' : 'negative'}`}>
                  {percentChange >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
                </div> */}
              </div>
            </div>

            <div className="timeframe-selector">
              <button 
                className={`timeframe-btn ${timeframe === '24h' ? 'active' : ''}`}
                onClick={() => setTimeframe('24h')}
              >
                24H
              </button>
              <button 
                className={`timeframe-btn ${timeframe === '7d' ? 'active' : ''}`}
                onClick={() => setTimeframe('7d')}
              >
                7D
              </button>
              <button 
                className={`timeframe-btn ${timeframe === '30d' ? 'active' : ''}`}
                onClick={() => setTimeframe('30d')}
              >
                30D
              </button>
              <button 
                className={`timeframe-btn ${timeframe === '1y' ? 'active' : ''}`}
                onClick={() => setTimeframe('1y')}
              >
                1Y
              </button>
            </div>

            {loading ? (
              <div className="skeleton" style={{ width: '100%', height: '300px' }}></div>
            ) : (
              <LineChart data={portfolioHistory} />
            )}
          </div>

          {/* Two Column Section */}
          <div className="two-column-grid">
            {/* Asset Allocation */}
            <div className="chart-section">
              <h3 className="section-title">Asset Allocation</h3>
              
              {loading ? (
                <div className="skeleton" style={{ width: '100%', height: '400px' }}></div>
              ) : (
                <>
                  <div className="pie-chart-container">
                    <PieChartComponent data={assetAllocation} />
                  </div>

                  <div>
                    {assetAllocation.map((asset, index) => (
                      <div className="allocation-item" key={index}>
                        <div className="allocation-left">
                          <div 
                            className="allocation-indicator" 
                            style={{ backgroundColor: asset.color }}
                          ></div>
                          <div className="allocation-info">
                            <span className="allocation-name">{asset.name}</span>
                            <span className="allocation-symbol">{asset.symbol}</span>
                          </div>
                        </div>
                        <div className="allocation-right">
                          <div className="allocation-value">${asset.value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                          <div className="allocation-percentage">{asset.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Performance Metrics */}
            {/* <div className="chart-section">
              <h3 className="section-title">Key Metrics</h3>
              
              {loading ? (
                <div className="skeleton" style={{ width: '100%', height: '400px' }}></div>
              ) : (
                <div className="metrics-grid">
                  <div className="metric-card">
                    <div className="metric-label">Total Invested</div>
                    <div className="metric-value">$1,166,598</div>
                    <div className="metric-subvalue">Principal Amount</div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Current Value</div>
                    <div className="metric-value">$1,255,352</div>
                    <div className="metric-subvalue positive">
                      <ArrowUpRight size={12} />
                      +$88,754
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Realized Gains</div>
                    <div className="metric-value">$42,847</div>
                    <div className="metric-subvalue">From 45 trades</div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Unrealized Gains</div>
                    <div className="metric-value">$45,907</div>
                    <div className="metric-subvalue">Current holdings</div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Best Day</div>
                    <div className="metric-value">+$8,420</div>
                    <div className="metric-subvalue">
                      <Calendar size={12} />
                      Nov 28, 2025
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Worst Day</div>
                    <div className="metric-value">-$3,240</div>
                    <div className="metric-subvalue">
                      <Calendar size={12} />
                      Oct 15, 2025
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Win Rate</div>
                    <div className="metric-value">68.9%</div>
                    <div className="metric-subvalue">
                      <Target size={12} />
                      31/45 trades
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-label">Sharpe Ratio</div>
                    <div className="metric-value">1.84</div>
                    <div className="metric-subvalue">
                      <Activity size={12} />
                      Risk-adjusted
                    </div>
                  </div>
                </div>
              )}
            </div> */}
          </div>

          {/* Transaction Statistics */}
          {/* <div className="chart-section">
            <h3 className="section-title">Transaction Activity</h3>
            
            {loading ? (
              <div className="skeleton" style={{ width: '100%', height: '120px' }}></div>
            ) : (
              <div className="transaction-stats-grid">
                {transactionStats.map((stat, index) => (
                  <div className="transaction-stat" key={index}>
                    <div className="transaction-stat-header">
                      <span className="transaction-type">{stat.type}</span>
                      <span className="transaction-count">{stat.count}</span>
                    </div>
                    <div className="transaction-amount" style={{ color: stat.color }}>
                      {stat.amount}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div> */}

          {/* Monthly Performance Chart */}
          <div className="chart-section">
            <h3 className="section-title">Monthly Profit/Loss</h3>
            
            {loading ? (
              <div className="skeleton" style={{ width: '100%', height: '220px' }}></div>
            ) : (
              <div style={{ padding: '16px 0' }}>
                <BarChart data={monthlyPerformance} />
              </div>
            )}
          </div>

          {/* Top Holdings Table */}
          <div className="chart-section">
            <h3 className="section-title">Top Holdings by Value</h3>
            
            {loading ? (
              <div className="skeleton" style={{ width: '100%', height: '300px' }}></div>
            ) : (
              <table className="holdings-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Asset</th>
                    <th>Amount</th>
                    <th>Value</th>
                    <th>Return</th>
                  </tr>
                </thead>
                <tbody>
                  {topHoldings.map((holding) => (
                    <tr key={holding.rank}>
                      <td className="rank-cell">{holding.rank}</td>
                      <td>
                        <div className="asset-cell">
                          <div 
                            className="asset-indicator" 
                            style={{ backgroundColor: holding.color }}
                          ></div>
                          <span className="asset-name">
                            {holding.asset}
                            <span className="asset-symbol">{holding.symbol}</span>
                          </span>
                        </div>
                      </td>
                      <td className="amount-cell">{holding.amount}</td>
                      <td className="value-cell">{holding.value}</td>
                      <td className={`return-cell ${holding.positive ? 'positive' : 'negative'}`}>
                        {holding.return}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}