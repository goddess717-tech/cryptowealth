import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Lock, Zap, TrendingUp, Clock, Shield, DollarSign, Percent, Calendar, ChevronRight, CheckCircle, Info, Bell, Settings, User, Activity, Target, Wallet } from 'lucide-react';
import { useUnlock } from '../UnlockContext';

export default function InvestPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('fixed');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const {openUnlock} = useUnlock();
  

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const fixedYieldPackages = [
    {
      id: 'fixed-1',
      name: 'Bitcoin Starter',
      asset: 'BTC',
      icon: '₿',
      color: '#F7931A',
      apy: '4.5%',
      term: '30 Days',
      minInvest: '$1,000',
      maxInvest: '$50,000',
      totalCap: '$5M',
      raised: '$3.2M',
      progress: 64,
      risk: 'Low',
      features: ['Daily payouts', 'Principal protected', 'Auto-compound option'],
      payout: 'Daily',
      popular: false
    },
    {
      id: 'fixed-2',
      name: 'Ethereum Growth',
      asset: 'ETH',
      icon: 'Ξ',
      color: '#627EEA',
      apy: '6.2%',
      term: '90 Days',
      minInvest: '$5,000',
      maxInvest: '$100,000',
      totalCap: '$10M',
      raised: '$7.8M',
      progress: 78,
      risk: 'Low',
      features: ['Weekly payouts', 'Institutional grade', 'Insurance coverage'],
      payout: 'Weekly',
      popular: true
    },
    {
      id: 'fixed-3',
      name: 'Stablecoin Premium',
      asset: 'USDT',
      icon: '₮',
      color: '#26A17B',
      apy: '8.5%',
      term: '180 Days',
      minInvest: '$10,000',
      maxInvest: '$500,000',
      totalCap: '$25M',
      raised: '$18.5M',
      progress: 74,
      risk: 'Very Low',
      features: ['Monthly payouts', 'Zero volatility', 'Guaranteed returns'],
      payout: 'Monthly',
      popular: false
    },
    {
      id: 'fixed-4',
      name: 'Multi-Asset Elite',
      asset: 'Mixed',
      icon: '◈',
      color: '#8B5CF6',
      apy: '12.8%',
      term: '365 Days',
      minInvest: '$25,000',
      maxInvest: '$1,000,000',
      totalCap: '$50M',
      raised: '$31.2M',
      progress: 62,
      risk: 'Medium',
      features: ['Quarterly payouts', 'Diversified portfolio', 'Premium support'],
      payout: 'Quarterly',
      popular: true
    }
  ];

  const flexiblePackages = [
    {
      id: 'flex-1',
      name: 'DeFi Liquidity Pool',
      protocol: 'Uniswap V3',
      asset: 'ETH/USDC',
      icon: '🦄',
      color: '#FF007A',
      apyRange: '15-42%',
      apyCurrent: '28.4%',
      minInvest: '$500',
      tvl: '$847M',
      risk: 'Medium',
      features: ['Withdraw anytime', 'Real-time APY', 'Trading fees share'],
      lockPeriod: 'None',
      type: 'Liquidity Mining'
    },
    {
      id: 'flex-2',
      name: 'Staking Rewards Pro',
      protocol: 'Lido Finance',
      asset: 'stETH',
      icon: '🎯',
      color: '#00A3FF',
      apyRange: '3.2-5.8%',
      apyCurrent: '4.1%',
      minInvest: '$100',
      tvl: '$21.4B',
      risk: 'Low',
      features: ['Instant liquidity', 'No lock period', 'Auto-compounding'],
      lockPeriod: 'None',
      type: 'Liquid Staking'
    },
    {
      id: 'flex-3',
      name: 'Yield Farming Vault',
      protocol: 'Aave + Curve',
      asset: 'Multiple',
      icon: '🌾',
      color: '#B6509E',
      apyRange: '8-25%',
      apyCurrent: '18.7%',
      minInvest: '$1,000',
      tvl: '$1.2B',
      risk: 'Medium-High',
      features: ['Auto-harvest', 'Strategy optimization', 'Gas efficient'],
      lockPeriod: 'None',
      type: 'Yield Aggregator'
    },
    {
      id: 'flex-4',
      name: 'Lending Protocol',
      protocol: 'Compound Finance',
      asset: 'USDC',
      icon: '🏦',
      color: '#00D395',
      apyRange: '2.5-12%',
      apyCurrent: '5.8%',
      minInvest: '$50',
      tvl: '$3.8B',
      risk: 'Low',
      features: ['Withdraw anytime', 'Collateral borrowing', 'No impermanent loss'],
      lockPeriod: 'None',
      type: 'Lending'
    },
    {
      id: 'flex-5',
      name: 'Options Vault',
      protocol: 'Ribbon Finance',
      asset: 'BTC/ETH',
      icon: '📊',
      color: '#FF6B6B',
      apyRange: '10-35%',
      apyCurrent: '22.3%',
      minInvest: '$2,500',
      tvl: '$156M',
      risk: 'High',
      features: ['Weekly epochs', 'Covered calls', 'Premium capture'],
      lockPeriod: '7 Days',
      type: 'Options Strategy'
    },
    {
      id: 'flex-6',
      name: 'Index Fund',
      protocol: 'Index Coop',
      asset: 'DPI',
      icon: '📈',
      color: '#4A90E2',
      apyRange: '5-18%',
      apyCurrent: '11.2%',
      minInvest: '$200',
      tvl: '$428M',
      risk: 'Medium',
      features: ['Diversified exposure', 'Rebalancing included', 'Low fees'],
      lockPeriod: 'None',
      type: 'Index Token'
    }
  ];

  const activeInvestments = [
    {
      package: 'Ethereum Growth',
      type: 'Fixed Yield',
      amount: '$50,000',
      apy: '6.2%',
      earned: '$1,847.23',
      status: 'Active',
      startDate: 'Nov 15, 2025',
      endDate: 'Feb 13, 2026',
      daysRemaining: 56,
      progress: 38
    },
    {
      package: 'DeFi Liquidity Pool',
      type: 'Flexible',
      amount: '$25,000',
      apy: '28.4%',
      earned: '$3,284.92',
      status: 'Active',
      startDate: 'Oct 8, 2025',
      endDate: 'Flexible',
      daysRemaining: null,
      progress: null
    },
    {
      package: 'Staking Rewards Pro',
      type: 'Flexible',
      amount: '$75,000',
      apy: '4.1%',
      earned: '$894.16',
      status: 'Active',
      startDate: 'Dec 1, 2025',
      endDate: 'Flexible',
      daysRemaining: null,
      progress: null
    }
  ];

  const SkeletonPackageCard = () => (
    <div className="package-card">
      <div className="skeleton skeleton-badge" style={{ width: '80px', height: '24px', marginBottom: '20px' }}></div>
      <div className="package-header">
        <div className="skeleton skeleton-icon" style={{ width: '48px', height: '48px' }}></div>
        <div style={{ flex: 1 }}>
          <div className="skeleton skeleton-text" style={{ width: '160px', height: '20px', marginBottom: '6px' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '120px', height: '12px' }}></div>
        </div>
      </div>
      <div className="apy-display">
        <div className="skeleton skeleton-text" style={{ width: '100px', height: '40px' }}></div>
      </div>
      <div className="package-details">
        {[1, 2, 3].map(i => (
          <div key={i} style={{ marginBottom: '12px' }}>
            <div className="skeleton skeleton-text" style={{ width: '80px', height: '12px', marginBottom: '6px' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '120px', height: '14px' }}></div>
          </div>
        ))}
      </div>
      <div className="skeleton skeleton-button" style={{ width: '100%', height: '44px' }}></div>
    </div>
  );

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

        .invest-container {
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

        .invest-content {
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

        .stat-icon.blue {
          background: rgba(59, 130, 246, 0.1);
        }

        .stat-icon.green {
          background: rgba(16, 185, 129, 0.1);
        }

        .stat-icon.purple {
          background: rgba(139, 92, 246, 0.1);
        }

        .stat-icon.amber {
          background: rgba(245, 158, 11, 0.1);
        }

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
          color: #64748B;
        }

        .stat-change.positive {
          color: #10B981;
        }

        .tab-container {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          background: rgba(15, 23, 42, 0.4);
          padding: 4px;
          border-radius: 8px;
          border: 1px solid rgba(148, 163, 184, 0.08);
          width: fit-content;
        }

        .tab-btn {
          padding: 8px 24px;
          font-size: 13px;
          font-weight: 500;
          color: #64748B;
          background: transparent;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tab-btn:hover {
          color: #E2E8F0;
        }

        .tab-btn.active {
          background: rgba(59, 130, 246, 0.1);
          color: #3B82F6;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .package-card {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.06);
          border-radius: 12px;
          padding: 24px;
          transition: all 0.2s;
          position: relative;
        }

        .package-card:hover {
          border-color: rgba(148, 163, 184, 0.12);
          background: rgba(15, 23, 42, 0.5);
        }

        .popular-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(245, 158, 11, 0.15);
          color: #F59E0B;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .package-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .package-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          border: 1px solid rgba(148, 163, 184, 0.1);
        }

        .package-info {
          flex: 1;
        }

        .package-name {
          font-size: 16px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 2px;
          letter-spacing: -0.01em;
        }

        .package-asset {
          font-size: 12px;
          color: #64748B;
          font-weight: 400;
        }

        .apy-display {
          text-align: center;
          padding: 20px;
          background: rgba(59, 130, 246, 0.05);
          border-radius: 10px;
          border: 1px solid rgba(59, 130, 246, 0.15);
          margin-bottom: 20px;
        }

        .apy-label {
          font-size: 11px;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .apy-value {
          font-size: 36px;
          font-weight: 600;
          color: #3B82F6;
          letter-spacing: -0.02em;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }

        .apy-range {
          font-size: 12px;
          color: #64748B;
          margin-top: 6px;
        }

        .package-details {
          margin-bottom: 20px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(148, 163, 184, 0.06);
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .detail-label {
          font-size: 12px;
          color: #64748B;
          font-weight: 400;
        }

        .detail-value {
          font-size: 13px;
          color: #E2E8F0;
          font-weight: 500;
          font-variant-numeric: tabular-nums;
        }

        .risk-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
        }

        .risk-very-low, .risk-low {
          background: rgba(16, 185, 129, 0.1);
          color: #10B981;
        }

        .risk-medium, .risk-medium-high {
          background: rgba(245, 158, 11, 0.1);
          color: #F59E0B;
        }

        .risk-high {
          background: rgba(239, 68, 68, 0.1);
          color: #EF4444;
        }

        .progress-section {
          margin-bottom: 20px;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 12px;
          color: #64748B;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: rgba(148, 163, 184, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%);
          border-radius: 10px;
          transition: width 0.3s ease;
        }

        .features-list {
          margin-bottom: 20px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
          font-size: 12px;
          color: #94A3B8;
        }

        .invest-btn {
          width: 100%;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          background: rgba(59, 130, 246, 0.1);
          color: #3B82F6;
          border: 1px solid rgba(59, 130, 246, 0.2);
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .invest-btn:hover {
          background: rgba(59, 130, 246, 0.15);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .section-title {
          font-size: 15px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
        }

        .investment-card {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.06);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 16px;
          transition: all 0.2s;
        }

        .investment-card:hover {
          border-color: rgba(148, 163, 184, 0.12);
          background: rgba(15, 23, 42, 0.5);
        }

        .investment-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .investment-name {
          font-size: 16px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 4px;
        }

        .investment-type {
          font-size: 12px;
          color: #64748B;
        }

        .investment-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 16px;
        }

        .investment-stat-label {
          font-size: 11px;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .investment-stat-value {
          font-size: 16px;
          font-weight: 600;
          color: #F8FAFC;
          font-variant-numeric: tabular-nums;
        }

        .status-badge {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
          background: rgba(16, 185, 129, 0.1);
          color: #10B981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .investment-progress {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(148, 163, 184, 0.06);
        }

        .progress-dates {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          font-size: 11px;
          color: #64748B;
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .packages-grid {
            grid-template-columns: 1fr;
          }

          .investment-stats {
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

          .invest-content {
            padding: 20px 16px 40px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .tab-container {
            width: 100%;
          }

          .investment-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="invest-container">
        <div className="invest-content">
          <div className="page-header">
            <h1 className="page-title">Investment Packages</h1>
            <p className="page-subtitle">Grow your crypto wealth with curated investment opportunities</p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {loading ? (
              <>
                {[1, 2, 3, 4].map(i => (
                  <div className="stat-card" key={i}>
                    <div className="skeleton skeleton-icon" style={{ width: '32px', height: '32px', marginBottom: '12px' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '100px', height: '12px', marginBottom: '8px' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '120px', height: '24px', marginBottom: '4px' }}></div>
                    <div className="skeleton skeleton-text" style={{ width: '80px', height: '12px' }}></div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="stat-card">
                  <div className="stat-header">
                    <div className="stat-icon blue">
                      <Wallet size={16} color="#3B82F6" />
                    </div>
                  </div>
                  <div className="stat-label">Total Invested</div>
                  <div className="stat-value">$550,000</div>
                  {/* <div className="stat-change positive">+$50K this month</div> */}
                </div>
                <div className="stat-card">
                  <div className="stat-header">
                    <div className="stat-icon green">
                      <TrendingUp size={16} color="#10B981" />
                    </div>
                  </div>
                  <div className="stat-label">Net Earnings</div>
                  <div className="stat-value">$1,066,026.31</div>
                  <div className="stat-change positive">+12.8% APY avg</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header">
                    <div className="stat-icon purple">
                      <Target size={16} color="#8B5CF6" />
                    </div>
                  </div>
                  <div className="stat-label">Active Packages</div>
                  <div className="stat-value">3</div>
                  <div className="stat-change">2 Fixed, 1 Flexible</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header">
                    <div className="stat-icon amber">
                      <Activity size={16} color="#F59E0B" />
                    </div>
                  </div>
                  <div className="stat-label">Avg APY</div>
                  <div className="stat-value">9.2%</div>
                  <div className="stat-change">Across all positions</div>
                </div>
              </>
            )}
          </div>

          {/* Tab Selector */}
          <div className="tab-container">
            <button 
              className={`tab-btn ${activeTab === 'fixed' ? 'active' : ''}`}
              onClick={() => setActiveTab('fixed')}
            >
              <Lock size={16} />
              Fixed Yield
            </button>
            <button 
              className={`tab-btn ${activeTab === 'flexible' ? 'active' : ''}`}
              onClick={() => setActiveTab('flexible')}
            >
              <Zap size={16} />
              Flexible Earn
            </button>
          </div>

          {/* Fixed Packages Grid */}
          {activeTab === 'fixed' && (
            <div className="packages-grid">
              {loading ? (
                <>
                  <SkeletonPackageCard />
                  <SkeletonPackageCard />
                  <SkeletonPackageCard />
                  <SkeletonPackageCard />
                </>
              ) : (
                fixedYieldPackages.map(pkg => (
                  <div className="package-card" key={pkg.id}>
                    {pkg.popular && <div className="popular-badge">⭐ Popular</div>}
                    
                    <div className="package-header">
                      <div className="package-icon" style={{ backgroundColor: `${pkg.color}15`, borderColor: `${pkg.color}30` }}>
                        <span style={{ color: pkg.color }}>{pkg.icon}</span>
                      </div>
                      <div className="package-info">
                        <div className="package-name">{pkg.name}</div>
                        <div className="package-asset">{pkg.asset} Investment</div>
                      </div>
                    </div>

                    <div className="apy-display">
                      <div className="apy-label">Annual Yield</div>
                      <div className="apy-value">{pkg.apy}</div>
                    </div>

                    <div className="package-details">
                      <div className="detail-row">
                        <span className="detail-label">Lock Period</span>
                        <span className="detail-value">{pkg.term}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Min Investment</span>
                        <span className="detail-value">{pkg.minInvest}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Payout Schedule</span>
                        <span className="detail-value">{pkg.payout}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Risk Level</span>
                        <span className={`risk-badge risk-${pkg.risk.toLowerCase().replace(' ', '-')}`}>{pkg.risk}</span>
                      </div>
                    </div>

                    <div className="progress-section">
                      <div className="progress-header">
                        <span>Pool Capacity</span>
                        <span>{pkg.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${pkg.progress}%` }}></div>
                      </div>
                      <div className="progress-dates" style={{ marginTop: '6px' }}>
                        <span>{pkg.raised}</span>
                        <span>{pkg.totalCap}</span>
                      </div>
                    </div>

                    <div className="features-list">
                      {pkg.features.map((feature, idx) => (
                        <div className="feature-item" key={idx}>
                          <CheckCircle size={14} color="#10B981" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <button onClick={openUnlock} className="invest-btn">
                      Invest Now
                      <ChevronRight size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Flexible Packages Grid */}
          {activeTab === 'flexible' && (
            <div className="packages-grid">
              {loading ? (
                <>
                  <SkeletonPackageCard />
                  <SkeletonPackageCard />
                  <SkeletonPackageCard />
                  <SkeletonPackageCard />
                  <SkeletonPackageCard />
                  <SkeletonPackageCard />
                </>
              ) : (
                flexiblePackages.map(pkg => (
                  <div className="package-card" key={pkg.id}>
                    <div className="package-header">
                      <div className="package-icon" style={{ backgroundColor: `${pkg.color}15`, borderColor: `${pkg.color}30` }}>
                        <span>{pkg.icon}</span>
                      </div>
                      <div className="package-info">
                        <div className="package-name">{pkg.name}</div>
                        <div className="package-asset">{pkg.protocol}</div>
                      </div>
                    </div>

                    <div className="apy-display">
                      <div className="apy-label">Current APY</div>
                      <div className="apy-value">{pkg.apyCurrent}</div>
                      <div className="apy-range">Range: {pkg.apyRange}</div>
                    </div>

                    <div className="package-details">
                      <div className="detail-row">
                        <span className="detail-label">Strategy Type</span>
                        <span className="detail-value">{pkg.type}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Asset Pair</span>
                        <span className="detail-value">{pkg.asset}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Min Investment</span>
                        <span className="detail-value">{pkg.minInvest}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Lock Period</span>
                        <span className="detail-value">{pkg.lockPeriod}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">TVL</span>
                        <span className="detail-value">{pkg.tvl}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Risk Level</span>
                        <span className={`risk-badge risk-${pkg.risk.toLowerCase().replace('-', '-')}`}>{pkg.risk}</span>
                      </div>
                    </div>

                    <div className="features-list">
                      {pkg.features.map((feature, idx) => (
                        <div className="feature-item" key={idx}>
                          <CheckCircle size={14} color="#10B981" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <button className="invest-btn">
                      Start Earning
                      <ChevronRight size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

         <button onClick={openUnlock} className="invest-btn" >
                      Show active investments
                      <ChevronRight size={16} />
                    </button>
          {/* Active Investments */}
          {/* <div className="active-investments">
            <h2 className="section-title">Your Active Investments</h2>
            {loading ? (
              <>
                {[1, 2, 3].map(i => (
                  <div className="investment-card" key={i}>
                    <div className="skeleton skeleton-text" style={{ width: '200px', height: '18px', marginBottom: '20px' }}></div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                      {[1, 2, 3, 4].map(j => (
                        <div key={j}>
                          <div className="skeleton skeleton-text" style={{ width: '80px', height: '11px', marginBottom: '8px' }}></div>
                          <div className="skeleton skeleton-text" style={{ width: '100px', height: '16px' }}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              activeInvestments.map((inv, idx) => (
                <div className="investment-card" key={idx}>
                  <div className="investment-header">
                    <div>
                      <div className="investment-name">{inv.package}</div>
                      <div className="investment-type">{inv.type}</div>
                    </div>
                    <span className="status-badge">{inv.status}</span>
                  </div>

                  <div className="investment-stats">
                    <div>
                      <div className="investment-stat-label">Amount Invested</div>
                      <div className="investment-stat-value">{inv.amount}</div>
                    </div>
                    <div>
                      <div className="investment-stat-label">Current APY</div>
                      <div className="investment-stat-value" style={{ color: '#10B981' }}>{inv.apy}</div>
                    </div>
                    <div>
                      <div className="investment-stat-label">Total Earned</div>
                      <div className="investment-stat-value" style={{ color: '#10B981' }}>+{inv.earned}</div>
                    </div>
                    <div>
                      <div className="investment-stat-label">{inv.daysRemaining ? 'Days Remaining' : 'Withdraw'}</div>
                      <div className="investment-stat-value">{inv.daysRemaining || 'Anytime'}</div>
                    </div>
                  </div>

                  {inv.progress !== null && (
                    <div className="investment-progress">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${inv.progress}%` }}></div>
                      </div>
                      <div className="progress-dates">
                        <span>Started: {inv.startDate}</span>
                        <span>Ends: {inv.endDate}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}