import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Search, ArrowLeftRight, Award, TrendingUp, TrendingDown, X, Copy, CheckCircle, XCircle, ExternalLink } from 'lucide-react';

export default function EnhancedHistoryPage() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterMonth, setFilterMonth] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTx, setSelectedTx] = useState(null);
  const [copiedId, setCopiedId] = useState(false);
  const [allTransactions, setAllTransactions] = useState([]);
  const itemsPerPage = 20;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const generateTransactions = () => {
    const txs = [];
    const now = new Date();
    let id = 1, portfolio = 0, totalDeposited = 0, totalWithdrawn = 0, totalGrowth = 0, totalLosses = 0;

    const MONTHS = 60, DEPOSIT_STOP = 54, TARGET = 527809;
    const WD_M1 = 10, WD_M2 = 35, WD_1 = 165580, WD_2 = 150409;

    const assets = [
      { s: 'BTC', n: 'Bitcoin', d: 6, p: 42000, network: 'Bitcoin Network' },
      { s: 'ETH', n: 'Ethereum', d: 4, p: 2800, network: 'Ethereum Network' },
      { s: 'USDT', n: 'Tether', d: 2, p: 1, network: 'Ethereum (ERC-20)' },
      { s: 'SOL', n: 'Solana', d: 3, p: 95, network: 'Solana Network' },
      { s: 'BNB', n: 'Binance Coin', d: 3, p: 310, network: 'BNB Chain' }
    ];

    const sources = ['Stripe •••• 4832', 'Chase •••• 7621', 'Auto-deposit', 'Coinbase Gateway', 'Internal Wallet', 'Linked •••• 1245', 'Binance Pay', 'Kraken Connect'];
    const tradeSources = ['Coinbase Pro', 'Binance Spot', 'Kraken Exchange', 'Uniswap V3', 'PancakeSwap', 'OTC Desk'];
    const yieldSources = ['Lido Staking', 'Aave Protocol', 'Compound Finance', 'Curve Pool', 'Yearn Vault', 'Anchor Protocol'];

    const getDeposit = (m) => m >= DEPOSIT_STOP ? 0 : m < 12 ? 26390 : m < 24 ? 10990 : m < 36 ? 5280 : m < 48 ? 1320 : 50;
    const getRate = (b) => b < 100000 ? 0.015 : b < 300000 ? 0.018 : b < 600000 ? 0.022 : b < 1000000 ? 0.026 : b < 1500000 ? 0.029 : 0.032;
    
    // Generate realistic non-uniform timestamps
    const getTime = () => {
      const hours = [8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 20, 21, 22];
      const h = hours[Math.floor(Math.random() * hours.length)];
      const m = Math.floor(Math.random() * 60);
      return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
    };
    
    const getDay = () => Math.floor(Math.random() * 24) + 3;

    // Generate hash-like transaction IDs
    const genHash = () => `0x${Math.random().toString(16).substr(2, 16)}...${Math.random().toString(16).substr(2, 8)}`;
    const genWireRef = () => `WT${Math.random().toString(16).substr(2, 12).toUpperCase()}`;

    for (let m = 0; m < MONTHS; m++) {
      const md = new Date(now.getFullYear(), now.getMonth() - (MONTHS - m - 1), 1);

      // Investment deposits
      const dep = getDeposit(m);
      if (dep > 0 && totalDeposited < TARGET) {
        const amt = Math.min(dep, TARGET - totalDeposited);
        totalDeposited += amt; 
        portfolio += amt;
        const d = new Date(md); 
        d.setDate(getDay());
        if (d > now) d.setTime(now.getTime());

        
        txs.push({
          id: `TX${String(id++).padStart(8,'0')}`,
          type: 'Investment',
          category: 'Deposits',
          asset: 'USD',
          assetName: 'US Dollar',
          amount: amt,
          cryptoAmount: null,
          positive: true,
          date: d.toLocaleDateString('en-US', {year:'numeric', month:'short', day:'numeric'}),
          time: getTime(),
          timestamp: d.getTime(),
          status: 'Completed',
          source: sources[Math.floor(Math.random() * sources.length)],
          txHash: genHash(),
          network: 'ACH Transfer',
          fee: amt > 20000 ? 0 : 2.50,
          notes: 'Automated monthly investment'
        });
      }

      // Weekly yield earnings with realistic variation
      for (let w = 0; w < 4; w++) {
        const gr = portfolio * (getRate(portfolio) / 4);
        if (gr > 0) {
          portfolio += gr; 
          totalGrowth += gr;
          const d = new Date(md); 
          d.setDate(getDay() + (w * 7));
          if (d > now) d.setTime(now.getTime());
          const a = assets[Math.floor(Math.random() * assets.length)];
          const yieldSource = yieldSources[Math.floor(Math.random() * yieldSources.length)];
          
          txs.push({
            id: `TX${String(id++).padStart(8,'0')}`,
            type: 'Yield Earnings',
            category: 'Rewards',
            asset: a.s,
            assetName: a.n,
            amount: gr,
            cryptoAmount: (gr / a.p).toFixed(a.d),
            positive: true,
            date: d.toLocaleDateString('en-US', {year:'numeric', month:'short', day:'numeric'}),
            time: getTime(),
            timestamp: d.getTime(),
            status: 'Completed',
            source: yieldSource,
            txHash: genHash(),
            network: a.network,
            fee: 0,
            notes: `Weekly yield payout from ${yieldSource}`
          });
        }

        // Occasional market trades (buying/selling)
        if (Math.random() < 0.12 && portfolio > 10000) {
          const isBuy = Math.random() > 0.4;
          const tradeAmt = portfolio * (0.02 + Math.random() * 0.05);
          const a = assets[Math.floor(Math.random() * assets.length)];
          const tradeSource = tradeSources[Math.floor(Math.random() * tradeSources.length)];
          const tradeFee = tradeAmt * 0.005;
          
          if (isBuy) {
            portfolio -= (tradeAmt + tradeFee);
          } else {
            portfolio += (tradeAmt - tradeFee);
          }
          
          const d = new Date(md);
          d.setDate(getDay() + (w * 7) + 2);
          if (d > now) d.setTime(now.getTime());

          
          txs.push({
            id: `TX${String(id++).padStart(8,'0')}`,
            type: isBuy ? 'Market Buy' : 'Market Sell',
            category: 'Trade',
            asset: a.s,
            assetName: a.n,
            amount: tradeAmt,
            cryptoAmount: (tradeAmt / a.p).toFixed(a.d),
            positive: !isBuy,
            date: d.toLocaleDateString('en-US', {year:'numeric', month:'short', day:'numeric'}),
            time: getTime(),
            timestamp: d.getTime(),
            status: 'Completed',
            source: tradeSource,
            txHash: genHash(),
            network: a.network,
            fee: tradeFee,
            notes: `${isBuy ? 'Bought' : 'Sold'} ${a.s} on ${tradeSource}`
          });
        }

        // Market volatility adjustments (markdown/losses)
        if (Math.random() < 0.18 && w === 2 && portfolio > 5000) {
          const loss = portfolio * (0.02 + Math.random() * 0.02);
          portfolio -= loss; 
          totalLosses += loss;
          const d = new Date(md); 
          d.setDate(getDay() + 10);
          if (d > now) d.setTime(now.getTime());

          const a = assets[Math.floor(Math.random() * assets.length)];
          
          txs.push({
            id: `TX${String(id++).padStart(8,'0')}`,
            type: 'Market Markdown',
            category: 'Losses',
            asset: a.s,
            assetName: a.n,
            amount: loss,
            cryptoAmount: (loss / a.p).toFixed(a.d),
            positive: false,
            date: d.toLocaleDateString('en-US', {year:'numeric', month:'short', day:'numeric'}),
            time: getTime(),
            timestamp: d.getTime(),
            status: 'Completed',
            source: 'Market Volatility',
            txHash: genHash(),
            network: a.network,
            fee: 0,
            notes: 'Portfolio value adjustment due to market conditions'
          });
        }
      }

      // The two existing withdrawals - PRESERVED EXACTLY
      if (m === WD_M1 || m === WD_M2) {
        const wd = m === WD_M1 ? WD_1 : WD_2;
        portfolio -= wd; 
        totalWithdrawn += wd;
        const d = new Date(md); 
        d.setDate(getDay());
        if (d > now) d.setTime(now.getTime());

        
        txs.push({
          id: `TX${String(id++).padStart(8,'0')}`,
          type: 'Liquidity Withdrawal',
          category: 'Withdrawals',
          asset: 'USD',
          assetName: 'US Dollar',
          amount: wd,
          cryptoAmount: null,
          positive: false,
          date: d.toLocaleDateString('en-US', {year:'numeric', month:'short', day:'numeric'}),
          time: getTime(),
          timestamp: d.getTime(),
          status: 'Completed',
          source: 'Coin-to-Cash Gateway',
          txHash: genWireRef(),
          network: 'Wire Transfer',
          fee: 35.00,
          notes: 'Converted crypto assets to USD via payment gateway and transferred to bank'
        });
      }
    }

    console.log(`Portfolio Summary: Deposited: $${totalDeposited.toLocaleString()}, Withdrawn: $${totalWithdrawn.toLocaleString()}, Growth: $${totalGrowth.toLocaleString()}, Losses: $${totalLosses.toLocaleString()}`);
    return txs.sort((a, b) => b.timestamp - a.timestamp);
  };

  useEffect(() => {
  const userId = 'user-demo-001'; // replace with real user id later
  const key = `tx-history-${userId}`;

  const saved = localStorage.getItem(key);

  if (saved) {
    setAllTransactions(JSON.parse(saved));
  } else {
    const generated = generateTransactions();
    localStorage.setItem(key, JSON.stringify(generated));
    setAllTransactions(generated);
  }
}, []);


  const stats = {
    totalTransactions: allTransactions.length,
    totalDeposits: allTransactions.filter(t => t.category === 'Deposits').reduce((s, t) => s + t.amount, 0),
    totalWithdrawals: allTransactions.filter(t => t.category === 'Withdrawals').reduce((s, t) => s + t.amount, 0),
    totalGrowth: allTransactions.filter(t => t.category === 'Rewards').reduce((s, t) => s + t.amount, 0),
    totalLosses: allTransactions.filter(t => t.category === 'Losses').reduce((s, t) => s + t.amount, 0)
  };
  stats.netEarnings = stats.totalGrowth - stats.totalLosses;

  const filteredTransactions = allTransactions.filter(tx => {
    const sl = searchTerm.toLowerCase();
    const ms = !searchTerm || tx.type.toLowerCase().includes(sl) || tx.asset.toLowerCase().includes(sl) || tx.id.toLowerCase().includes(sl) || tx.source.toLowerCase().includes(sl);
    const mt = filterType === 'All' || tx.category === filterType;
    const mm = filterMonth === 'All' || tx.date.split(' ')[0] === filterMonth;
    return ms && mt && mm;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const fmt = (v) => new Intl.NumberFormat('en-US', {style:'currency', currency:'USD', minimumFractionDigits:2}).format(Math.abs(v));

  const copyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
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
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
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
          background: linear-gradient(90deg, rgba(30,41,59,0.4) 0%, rgba(51,65,85,0.6) 50%, rgba(30,41,59,0.4) 100%);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite linear;
        }
        
        .history-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 32px 32px 64px;
          min-height: 100vh;
        }
        
        .page-header {
          margin-bottom: 40px;
        }
        
        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }
        
        .page-title {
          font-size: 36px;
          font-weight: 700;
          color: #F8FAFC;
          margin-bottom: 8px;
          letter-spacing: -0.03em;
        }
        
        .page-subtitle {
          font-size: 16px;
          color: #94A3B8;
          font-weight: 400;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }
        
        .stat-card {
          background: rgba(15,23,42,0.6);
          backdrop-filter: blur(20px);
          border-radius: 14px;
          padding: 24px;
          border: 1px solid rgba(148,163,184,0.12);
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(0,0,0,0.4);
          border-color: rgba(148,163,184,0.25);
        }
        
        .stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        
        .stat-icon.blue {
          background: rgba(59,130,246,0.12);
          border: 1px solid rgba(59,130,246,0.25);
        }
        
        .stat-icon.green {
          background: rgba(16,185,129,0.12);
          border: 1px solid rgba(16,185,129,0.25);
        }
        
        .stat-icon.purple {
          background: rgba(139,92,246,0.12);
          border: 1px solid rgba(139,92,246,0.25);
        }
        
        .stat-icon.amber {
          background: rgba(245,158,11,0.12);
          border: 1px solid rgba(245,158,11,0.25);
        }
        
        .stat-label {
          font-size: 11px;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 8px;
          font-weight: 600;
        }
        
        .stat-value {
          font-size: 26px;
          font-weight: 700;
          color: #F8FAFC;
          letter-spacing: -0.02em;
        }
        
        .filters-section {
          background: rgba(15,23,42,0.6);
          backdrop-filter: blur(20px);
          border-radius: 14px;
          padding: 24px;
          border: 1px solid rgba(148,163,184,0.12);
          margin-bottom: 24px;
        }
        
        .filters-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 16px;
        }
        
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .filter-label {
          font-size: 11px;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
        }
        
        .search-box {
          position: relative;
        }
        
        .search-input {
          width: 100%;
          background: rgba(15,23,42,0.7);
          border: 1px solid rgba(148,163,184,0.15);
          border-radius: 10px;
          padding: 12px 12px 12px 44px;
          color: #E2E8F0;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }
        
        .search-input:focus {
          border-color: #3B82F6;
          background: rgba(15,23,42,0.9);
        }
        
        .search-input::placeholder {
          color: #64748B;
        }
        
        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #64748B;
          pointer-events: none;
        }
        
        .filter-select {
          width: 100%;
          background: rgba(15,23,42,0.7);
          border: 1px solid rgba(148,163,184,0.15);
          border-radius: 10px;
          padding: 12px 14px;
          color: #E2E8F0;
          font-size: 14px;
          outline: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .filter-select:focus {
          border-color: #3B82F6;
          background: rgba(15,23,42,0.9);
        }
        
        .filter-select option {
          background: #1E293B;
          color: #E2E8F0;
        }
        
        .transactions-table-container {
          background: rgba(15,23,42,0.6);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 32px;
          border: 1px solid rgba(148,163,184,0.12);
          box-shadow: 0 4px 24px rgba(0,0,0,0.2);
          margin-bottom: 24px;
        }
        
        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .table-title {
          font-size: 20px;
          font-weight: 700;
          color: #F8FAFC;
          letter-spacing: -0.02em;
        }
        
        .results-count {
          font-size: 14px;
          color: #64748B;
        }
        
        .transactions-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .transactions-table thead th {
          text-align: left;
          padding: 14px 16px;
          font-size: 11px;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
          border-bottom: 1px solid rgba(148,163,184,0.1);
          background: rgba(15,23,42,0.5);
        }
        
        .transactions-table tbody tr {
          border-bottom: 1px solid rgba(148,163,184,0.06);
          transition: all 0.2s;
          cursor: pointer;
        }
        
        .transactions-table tbody tr:hover {
          background: rgba(30,41,59,0.4);
        }
        
        .transactions-table tbody td {
          padding: 20px 16px;
          font-size: 14px;
          vertical-align: middle;
        }
        
        .transaction-type {
          font-weight: 600;
          color: #F8FAFC;
          font-size: 14px;
        }
        
        .transaction-asset {
          color: #E2E8F0;
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
        }
        
        .transaction-subtext {
          color: #64748B;
          font-size: 12px;
          display: block;
        }
        
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid;
        }
        
        .status-completed {
          background: rgba(16,185,129,0.12);
          color: #10B981;
          border-color: rgba(16,185,129,0.25);
        }
        
        .status-failed {
          background: rgba(239,68,68,0.12);
          color: #EF4444;
          border-color: rgba(239,68,68,0.25);
        }
        
        .transaction-date {
          color: #94A3B8;
          font-size: 13px;
          font-weight: 500;
        }
        
        .transaction-time {
          color: #64748B;
          font-size: 12px;
          display: block;
          margin-top: 4px;
        }
        
        .transaction-amount {
          font-weight: 700;
          font-size: 15px;
          text-align: right;
          font-variant-numeric: tabular-nums;
        }
        
        .transaction-amount.positive {
          color: #10B981;
        }
        
        .transaction-amount.negative {
          color: #F87171;
        }
        
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin-top: 32px;
          flex-wrap: wrap;
        }
        
        .pagination-btn {
          padding: 10px 18px;
          border-radius: 8px;
          background: rgba(30,41,59,0.6);
          border: 1px solid rgba(148,163,184,0.15);
          color: #E2E8F0;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .pagination-btn:hover:not(:disabled) {
          background: rgba(30,41,59,0.9);
          border-color: rgba(148,163,184,0.3);
        }
        
        .pagination-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        
        .pagination-btn.active {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          border-color: transparent;
          color: white;
        }
        
        .pagination-info {
          font-size: 14px;
          color: #94A3B8;
          padding: 0 12px;
        }
        
        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 1000;
          opacity: 0;
          animation: fadeIn 0.2s forwards;
        }
        
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        
        .drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 480px;
          max-width: 90vw;
          background: #0F172A;
          border-left: 1px solid rgba(148,163,184,0.15);
          z-index: 1001;
          transform: translateX(100%);
          animation: slideIn 0.3s forwards;
          overflow-y: auto;
          box-shadow: -4px 0 24px rgba(0,0,0,0.3);
        }
        
        @keyframes slideIn {
          to { transform: translateX(0); }
        }
        
        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid rgba(148,163,184,0.15);
          position: sticky;
          top: 0;
          background: #0F172A;
          z-index: 10;
        }
        
        .drawer-title {
          font-size: 20px;
          font-weight: 700;
          color: #F8FAFC;
        }
        
        .drawer-close {
          background: transparent;
          border: none;
          color: #94A3B8;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .drawer-close:hover {
          background: rgba(148,163,184,0.1);
          color: #E2E8F0;
        }
        
        .drawer-content {
          padding: 24px;
        }
        
        .drawer-section {
          margin-bottom: 32px;
        }
        
        .drawer-section:last-child {
          margin-bottom: 0;
        }
        
        .drawer-section-title {
          font-size: 11px;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
          margin-bottom: 16px;
        }
        
        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 12px 0;
          border-bottom: 1px solid rgba(148,163,184,0.08);
        }
        
        .detail-row:last-child {
          border-bottom: none;
        }
        
        .detail-label {
          font-size: 14px;
          color: #94A3B8;
        }
        
        .detail-value {
          font-size: 14px;
          color: #E2E8F0;
          font-weight: 500;
          text-align: right;
          max-width: 60%;
        }
        
        .detail-value.large {
          font-size: 28px;
          font-weight: 700;
        }
        
        .detail-value.positive {
          color: #10B981;
        }
        
        .detail-value.negative {
          color: #F87171;
        }
        
        .tx-id-container {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(15,23,42,0.6);
          padding: 14px;
          border-radius: 10px;
          border: 1px solid rgba(148,163,184,0.1);
        }
        
        .tx-id {
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: #94A3B8;
          flex: 1;
          word-break: break-all;
        }
        
        .copy-btn {
          background: transparent;
          border: 1px solid rgba(148,163,184,0.2);
          color: #94A3B8;
          cursor: pointer;
          padding: 7px;
          border-radius: 6px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        
        .copy-btn:hover {
          background: rgba(148,163,184,0.1);
          border-color: rgba(148,163,184,0.4);
        }
        
        .copy-btn.copied {
          border-color: rgba(16,185,129,0.4);
          color: #10B981;
        }
        
        .notes-box {
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 10px;
          padding: 14px;
          margin-top: 12px;
        }
        
        .notes-text {
          font-size: 13px;
          color: #94A3B8;
          line-height: 1.6;
        }
        
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .filters-row {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .history-container {
            padding: 20px 16px 40px;
          }
          
          .page-title {
            font-size: 28px;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .transactions-table-container {
            padding: 20px 16px;
            overflow-x: auto;
          }
          
          .transactions-table {
            min-width: 600px;
          }
          
          .drawer {
            width: 100%;
            max-width: 100vw;
          }
          
          .pagination {
            gap: 8px;
          }
          
          .pagination-info {
            width: 100%;
            text-align: center;
            padding: 8px 0;
          }
        }
        
        @media (max-width: 480px) {
          .page-title {
            font-size: 24px;
          }
          
          .stat-value {
            font-size: 22px;
          }
          
          .transactions-table-container {
            padding: 16px 12px;
          }
        }
      `}</style>

      <div className="history-container">
        <div className="page-header">
          <div className="header-top">
            <div>
              <h1 className="page-title">Transaction History</h1>
              <p className="page-subtitle">Complete record of your investment activity</p>
            </div>
          </div>

          {/* <div className="stats-grid">
            {loading ? (
              <>
                {[1, 2, 3, 4].map(i => (
                  <div className="stat-card" key={i}>
                    <div className="skeleton" style={{width:'44px', height:'44px', marginBottom:'16px', borderRadius:'10px'}} />
                    <div className="skeleton" style={{width:'120px', height:'11px', marginBottom:'8px', borderRadius:'4px'}} />
                    <div className="skeleton" style={{width:'140px', height:'26px', borderRadius:'4px'}} />
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="stat-card">
                  <div className="stat-icon blue">
                    <ArrowLeftRight size={22} color="#3B82F6" />
                  </div>
                  <div className="stat-label">Total Transactions</div>
                  <div className="stat-value">{stats.totalTransactions.toLocaleString()}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon green">
                    <TrendingUp size={22} color="#10B981" />
                  </div>
                  <div className="stat-label">Total Deposits</div>
                  <div className="stat-value">{fmt(stats.totalDeposits)}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon purple">
                    <TrendingDown size={22} color="#8B5CF6" />
                  </div>
                  <div className="stat-label">Total Withdrawals</div>
                  <div className="stat-value">{fmt(stats.totalWithdrawals)}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon amber">
                    <Award size={22} color="#F59E0B" />
                  </div>
                  <div className="stat-label">Net Earnings</div>
                  <div className="stat-value">{fmt(stats.netEarnings)}</div>
                </div>
              </>
            )}
          </div> */}
        </div>

        <div className="filters-section">
          <div className="filters-row">
            <div className="filter-group">
              <label className="filter-label">Search</label>
              <div className="search-box">
                <Search size={18} className="search-icon" />
                <input
                  className="search-input"
                  placeholder="Search transactions, assets, or sources..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
            <div className="filter-group">
              <label className="filter-label">Type</label>
              <select
                className="filter-select"
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Types</option>
                <option value="Deposits">Deposits</option>
                <option value="Trade">Trades</option>
                <option value="Rewards">Rewards</option>
                <option value="Losses">Losses</option>
                <option value="Withdrawals">Withdrawals</option>
              </select>
            </div>
            {/* <div className="filter-group">
              <label className="filter-label">Month</label>
              <select
                className="filter-select"
                value={filterMonth}
                onChange={(e) => {
                  setFilterMonth(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Months</option>
                {['Dec', 'Nov', 'Oct', 'Sep', 'Aug', 'Jul', 'Jun', 'May', 'Apr', 'Mar', 'Feb', 'Jan'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div> */}
          </div>
        </div>

        <div className="transactions-table-container">
          <div className="table-header">
            <h2 className="table-title">All Transactions</h2>
            <span className="results-count">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length}
            </span>
          </div>

          <table className="transactions-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Asset</th>
                <th style={{textAlign:'right'}}>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <>
                  {[...Array(10)].map((_, i) => (
                    <tr key={i}>
                      <td><div className="skeleton" style={{width:'100px', height:'14px', borderRadius:'4px'}} /></td>
                      <td>
                        <div className="skeleton" style={{width:'120px', height:'14px', marginBottom:'6px', borderRadius:'4px'}} />
                        <div className="skeleton" style={{width:'80px', height:'12px', borderRadius:'4px'}} />
                      </td>
                      <td><div className="skeleton" style={{width:'85px', height:'30px', borderRadius:'8px'}} /></td>
                      <td>
                        <div className="skeleton" style={{width:'100px', height:'13px', marginBottom:'4px', borderRadius:'4px'}} />
                        <div className="skeleton" style={{width:'60px', height:'12px', borderRadius:'4px'}} />
                      </td>
                      <td><div className="skeleton" style={{width:'120px', height:'15px', marginLeft:'auto', borderRadius:'4px'}} /></td>
                    </tr>
                  ))}
                </>
              ) : currentTransactions.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{textAlign:'center', padding:'40px', color:'#64748B'}}>
                    No transactions found matching your filters
                  </td>
                </tr>
              ) : (
                currentTransactions.map(tx => (
                  <tr key={tx.id} onClick={() => setSelectedTx(tx)}>
                    <td className="transaction-type">{tx.type}</td>
                    <td>
                      <span className="transaction-asset">{tx.asset}</span>
                      <span className="transaction-subtext">
                        {tx.cryptoAmount ? `${tx.cryptoAmount} ${tx.asset}` : tx.source}
                      </span>
                    </td>
                   <td>
                      <span className={`transaction-amount ${tx.positive ? 'positive' : 'negative'}`}>
                        {tx.positive ? '+' : '-'}{fmt(tx.amount)}
                      </span>
                    </td>
                    <td>
                      <span className="transaction-date">{tx.date}</span>
                      <span className="transaction-time">{tx.time}</span>
                    </td>
                     <td>
                      <span className={`status-badge status-${tx.status.toLowerCase()}`}>
                        {tx.status === 'Completed' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {!loading && filteredTransactions.length > itemsPerPage && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let p = totalPages <= 5 ? i + 1 : currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i;
                return (
                  <button
                    key={p}
                    className={`pagination-btn ${currentPage === p ? 'active' : ''}`}
                    onClick={() => setCurrentPage(p)}
                  >
                    {p}
                  </button>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="pagination-info">...</span>
                  <button className="pagination-btn" onClick={() => setCurrentPage(totalPages)}>
                    {totalPages}
                  </button>
                </>
              )}
              
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
              
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
        </div>
      </div>

      {selectedTx && (
        <>
          <div className="drawer-overlay" onClick={() => setSelectedTx(null)} />
          <div className="drawer">
            <div className="drawer-header">
              <h2 className="drawer-title">Transaction Details</h2>
              <button className="drawer-close" onClick={() => setSelectedTx(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-content">
              <div className="drawer-section">
                <div className="drawer-section-title">Amount</div>
                <div className="detail-row">
                  <span className="detail-label">Total</span>
                  <span className={`detail-value large ${selectedTx.positive ? 'positive' : 'negative'}`}>
                    {selectedTx.positive ? '+' : ''}{fmt(selectedTx.amount)}
                  </span>
                </div>
                {selectedTx.cryptoAmount && (
                  <div className="detail-row">
                    <span className="detail-label">Crypto Amount</span>
                    <span className="detail-value">{selectedTx.cryptoAmount} {selectedTx.asset}</span>
                  </div>
                )}
                {selectedTx.fee > 0 && (
                  <div className="detail-row">
                    <span className="detail-label">Transaction Fee</span>
                    <span className="detail-value">{fmt(selectedTx.fee)}</span>
                  </div>
                )}
              </div>

              <div className="drawer-section">
                <div className="drawer-section-title">Transaction Info</div>
                <div className="detail-row">
                  <span className="detail-label">Type</span>
                  <span className="detail-value">{selectedTx.type}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Asset</span>
                  <span className="detail-value">{selectedTx.assetName} ({selectedTx.asset})</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status</span>
                  <span className="detail-value">
                    <span className={`status-badge status-${selectedTx.status.toLowerCase()}`}>
                      {selectedTx.status === 'Completed' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {selectedTx.status}
                    </span>
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date & Time</span>
                  <span className="detail-value">{selectedTx.date} at {selectedTx.time}</span>
                </div>
              </div>

              <div className="drawer-section">
                <div className="drawer-section-title">Network & Source</div>
                <div className="detail-row">
                  <span className="detail-label">Network</span>
                  <span className="detail-value">{selectedTx.network}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Source</span>
                  <span className="detail-value">{selectedTx.source}</span>
                </div>
              </div>

              <div className="drawer-section">
                <div className="drawer-section-title">Transaction ID</div>
                <div className="tx-id-container">
                  <span className="tx-id">{selectedTx.txHash}</span>
                  <button
                    className={`copy-btn ${copiedId ? 'copied' : ''}`}
                    onClick={() => copyId(selectedTx.txHash)}
                  >
                    {copiedId ? <CheckCircle size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {selectedTx.notes && (
                <div className="drawer-section">
                  <div className="drawer-section-title">Notes</div>
                  <div className="notes-box">
                    <p className="notes-text">{selectedTx.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}