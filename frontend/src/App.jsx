import React, { useState, useEffect, createContext, useContext } from 'react';
import { Home, CreditCard, ArrowLeftRight, FileText, DollarSign, Settings, HelpCircle, Menu, Download, Filter, MoreHorizontal, TrendingUp, TrendingDown, AlertTriangle, Clock, Percent, ChevronRight, Eye, EyeOff, LogOut, Shield, User } from 'lucide-react';

const AppContext = createContext();
const useApp = () => useContext(AppContext);

const authService = {
  getCurrentUser: () => ({
    id: 'CUS-2847392847',
    customerId: '2847392847',
    name: 'Jennifer Morrison',
    email: 'j.morrison@email.com',
    lastLogin: new Date(Date.now() - 7200000)
  })
};

const accountService = {
  getAccounts: () => [
    {
      id: 'ACC-847392',
      displayNumber: '****2847',
      type: 'CHECKING',
      productName: 'Advantage Plus Checking',
      nickname: 'Primary Checking',
      ledgerBalance: 8472.89,
      availableBalance: 8247.14,
      status: 'ACTIVE',
      interestRate: 0.01
    },
    {
      id: 'ACC-294183',
      displayNumber: '****8472',
      type: 'SAVINGS',
      productName: 'High Yield Savings',
      nickname: 'Emergency Fund',
      ledgerBalance: 47821.34,
      availableBalance: 47821.34,
      status: 'ACTIVE',
      interestRate: 4.35,
      apy: 4.44,
      monthlyInterestAccrued: 173.21
    },
    {
      id: 'ACC-184729',
      displayNumber: '****4738',
      type: 'MONEY_MARKET',
      productName: 'Premier Money Market',
      nickname: 'Investment Savings',
      ledgerBalance: 125847.92,
      availableBalance: 125847.92,
      status: 'ACTIVE',
      interestRate: 4.85,
      apy: 4.96,
      monthlyInterestAccrued: 508.47
    },
    {
      id: 'CRD-847291',
      displayNumber: '****2847',
      type: 'CREDIT_CARD',
      productName: 'Platinum Rewards Card',
      ledgerBalance: -3847.28,
      availableBalance: 21152.72,
      creditLimit: 25000.00,
      status: 'ACTIVE',
      apr: 18.99,
      dueDate: '2025-01-18'
    }
  ],
  
  getTransactions: () => [
    {
      id: 'TXN-1',
      accountId: 'ACC-847392',
      date: new Date(Date.now() - 3600000),
      description: 'STARBUCKS STORE 18472',
      category: 'Dining',
      amount: -6.47,
      runningBalance: 8247.14,
      status: 'PENDING',
      refNumber: 'REF-847392847'
    },
    {
      id: 'TXN-2',
      accountId: 'ACC-847392',
      date: new Date(Date.now() - 43200000),
      description: 'AMAZON.COM*M84KD72PQ',
      category: 'Shopping',
      amount: -127.84,
      runningBalance: 8253.61,
      status: 'PENDING',
      refNumber: 'REF-847392846'
    },
    {
      id: 'TXN-3',
      accountId: 'ACC-847392',
      date: new Date(Date.now() - 86400000),
      description: 'WHOLEFDS MKT 10234 SEATTLE WA',
      category: 'Groceries',
      amount: -184.72,
      runningBalance: 8381.45,
      status: 'POSTED',
      refNumber: 'REF-847392845'
    },
    {
      id: 'TXN-4',
      accountId: 'ACC-847392',
      date: new Date(Date.now() - 172800000),
      description: 'SHELL OIL 28472948274',
      category: 'Gas & Fuel',
      amount: -67.42,
      runningBalance: 8566.17,
      status: 'POSTED',
      refNumber: 'REF-847392844'
    },
    {
      id: 'TXN-5',
      accountId: 'ACC-847392',
      date: new Date(Date.now() - 259200000),
      description: 'ACH CREDIT TECH SOLUTIONS INC PAYROLL',
      category: 'Income',
      amount: 4827.92,
      runningBalance: 8633.59,
      status: 'POSTED',
      refNumber: 'REF-847392843'
    }
  ]
};

const DesktopSidebar = () => {
  const { currentView, setCurrentView, sidebarExpanded } = useApp();
  const user = authService.getCurrentUser();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const primaryNav = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'accounts', label: 'Accounts', icon: DollarSign },
    { id: 'transfers', label: 'Transfer & Pay', icon: ArrowLeftRight },
    { id: 'transactions', label: 'Activity', icon: FileText, badge: 2 },
    { id: 'cards', label: 'Cards', icon: CreditCard },
    { id: 'statements', label: 'Statements', icon: Download }
  ];

  const secondaryNav = [
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'support', label: 'Help', icon: HelpCircle }
  ];

  return (
    <div className={`sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="brand-icon"></div>
          {sidebarExpanded && <span className="brand-name">GLOBAL FINANCIAL</span>}
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-group">
          {primaryNav.map(item => (
            <button
              key={item.id}
              className={`nav-link ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              <item.icon size={20} />
              {sidebarExpanded && <span className="nav-label">{item.label}</span>}
              {item.badge && sidebarExpanded && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </div>

        <div className="nav-group">
          {secondaryNav.map(item => (
            <button
              key={item.id}
              className={`nav-link ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              <item.icon size={20} />
              {sidebarExpanded && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="user-trigger" onClick={() => setShowUserMenu(!showUserMenu)}>
          <div className="user-avatar">JM</div>
          {sidebarExpanded && (
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-meta">ID: {user.customerId}</div>
            </div>
          )}
          {sidebarExpanded && <MoreHorizontal size={16} />}
        </button>
        
        {showUserMenu && sidebarExpanded && (
          <div className="user-menu">
            <div className="user-menu-header">
              <div className="user-menu-name">{user.name}</div>
              <div className="user-menu-email">{user.email}</div>
            </div>
            <div className="user-menu-item"><User size={16} /><span>Profile</span></div>
            <div className="user-menu-item"><Shield size={16} /><span>Security</span></div>
            <div className="user-menu-divider"></div>
            <div className="user-menu-item danger"><LogOut size={16} /><span>Sign Out</span></div>
          </div>
        )}
      </div>
    </div>
  );
};

const MobileBottomNav = () => {
  const { currentView, setCurrentView } = useApp();
  
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'accounts', icon: DollarSign, label: 'Accounts' },
    { id: 'transfers', icon: ArrowLeftRight, label: 'Move' },
    { id: 'transactions', icon: FileText, label: 'Activity', badge: 2 },
    { id: 'menu', icon: Menu, label: 'Menu' }
  ];

  return (
    <div className="mobile-nav">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`mobile-nav-item ${currentView === item.id ? 'active' : ''}`}
          onClick={() => setCurrentView(item.id)}
        >
          <div className="mobile-nav-icon">
            <item.icon size={22} />
            {item.badge && <span className="mobile-nav-badge">{item.badge}</span>}
          </div>
          <span className="mobile-nav-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

const TransactionDetailDrawer = ({ transaction, account, onClose, balanceVisible }) => {
  const formatCurrency = (amount, showSign = false) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
    
    if (showSign && amount !== 0) {
      return amount > 0 ? `+${formatted}` : `-${formatted}`;
    }
    return formatted;
  };

  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (!transaction) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose}></div>
      <div className="transaction-drawer">
        <div className="drawer-header">
          <div className="drawer-header-content">
            <h2 className="drawer-title">Transaction Details</h2>
            <p className="drawer-subtitle">{transaction.refNumber}</p>
          </div>
          <button className="drawer-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="drawer-body">
          <div className="transaction-amount-section">
            <div className={`transaction-amount-large ${transaction.amount < 0 ? 'debit' : 'credit'}`}>
              {formatCurrency(transaction.amount, true)}
            </div>
            <div className={`transaction-status-badge ${transaction.status.toLowerCase()}`}>
              {transaction.status === 'PENDING' && <Clock size={14} />}
              {transaction.status === 'POSTED' && <CheckCircle size={14} />}
              <span>{transaction.status}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3 className="section-title">Merchant Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Description</span>
                <span className="detail-value">{transaction.description}</span>
              </div>
              {transaction.merchant && (
                <div className="detail-item">
                  <span className="detail-label">Merchant Name</span>
                  <span className="detail-value">{transaction.merchant}</span>
                </div>
              )}
              {transaction.category && (
                <div className="detail-item">
                  <span className="detail-label">Category</span>
                  <span className="detail-value">
                    <span className="category-badge">{transaction.category}</span>
                  </span>
                </div>
              )}
              {transaction.mcc && (
                <div className="detail-item">
                  <span className="detail-label">Merchant Category Code</span>
                  <span className="detail-value">{transaction.mcc}</span>
                </div>
              )}
            </div>
          </div>

          <div className="detail-section">
            <h3 className="section-title">Transaction Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Transaction Date</span>
                <span className="detail-value">{formatDateTime(transaction.date)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Post Date</span>
                <span className="detail-value">{formatDateTime(transaction.postDate)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Transaction Type</span>
                <span className="detail-value">{transaction.type.replace('_', ' ')}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Reference Number</span>
                <span className="detail-value">{transaction.refNumber}</span>
              </div>
              {transaction.authCode && (
                <div className="detail-item">
                  <span className="detail-label">Authorization Code</span>
                  <span className="detail-value">{transaction.authCode}</span>
                </div>
              )}
              {transaction.checkNumber && (
                <div className="detail-item">
                  <span className="detail-label">Check Number</span>
                  <span className="detail-value">#{transaction.checkNumber}</span>
                </div>
              )}
            </div>
          </div>

          <div className="detail-section">
            <h3 className="section-title">Account Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Account</span>
                <span className="detail-value">
                  {account?.nickname || account?.productName} ({account?.displayNumber})
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Account ID</span>
                <span className="detail-value">{transaction.accountId}</span>
              </div>
              {transaction.status === 'POSTED' && (
                <div className="detail-item">
                  <span className="detail-label">Running Balance</span>
                  <span className="detail-value">
                    {balanceVisible ? formatCurrency(transaction.runningBalance) : '••••••••'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {transaction.achDetails && (
            <div className="detail-section">
              <h3 className="section-title">ACH Details</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Company Name</span>
                  <span className="detail-value">{transaction.achDetails.companyName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Company ID</span>
                  <span className="detail-value">{transaction.achDetails.companyId}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Description</span>
                  <span className="detail-value">{transaction.achDetails.description}</span>
                </div>
              </div>
            </div>
          )}

          {transaction.status === 'PENDING' && (
            <div className="detail-alert">
              <AlertTriangle size={18} />
              <div className="alert-text-content">
                <strong>Pending Transaction</strong>
                <p>This transaction is still processing and may take 1-3 business days to post to your account.</p>
              </div>
            </div>
          )}
        </div>

        <div className="drawer-footer">
          <button className="drawer-action-btn secondary">
            <Download size={16} />
            Download Receipt
          </button>
          <button className="drawer-action-btn secondary">
            <AlertTriangle size={16} />
            Report Issue
          </button>
        </div>
      </div>
    </>
  );
};

const ActivityPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      setAccounts(accountService.getAccounts());
      setTransactions(accountService.getTransactions());
      setLoading(false);
    };
    loadData();
  }, []);

  const formatCurrency = (amount, showSign = false) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
    
    if (showSign && amount !== 0) {
      return amount > 0 ? `+${formatted}` : `-${formatted}`;
    }
    return formatted;
  };

  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  };

  const filteredTransactions = transactions.filter(txn => {
    const matchesAccount = selectedAccount === 'all' || txn.accountId === selectedAccount;
    const matchesStatus = selectedStatus === 'all' || txn.status === selectedStatus;
    const matchesSearch = searchQuery === '' || 
      txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.merchant?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.category?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesAccount && matchesStatus && matchesSearch;
  });

  const totalDebits = filteredTransactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalCredits = filteredTransactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading transactions...</p>
      </div>
    );
  }

  return (
    <>
      <div className="activity-page">
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">Activity</h1>
            <p className="page-subtitle">View and manage your transaction history</p>
          </div>
          <div className="header-actions">
            <button className="btn-outline">
              <Filter size={16} />
              <span>Advanced Filters</span>
            </button>
            <button className="btn-outline">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="activity-summary">
          <div className="summary-stat">
            <div className="stat-label">Total Spent</div>
            <div className="stat-value negative">
              {balanceVisible ? formatCurrency(totalDebits) : '••••••••'}
            </div>
            <div className="stat-meta">{filteredTransactions.filter(t => t.amount < 0).length} transactions</div>
          </div>
          <div className="summary-stat">
            <div className="stat-label">Total Received</div>
            <div className="stat-value positive">
              {balanceVisible ? formatCurrency(totalCredits) : '••••••••'}
            </div>
            <div className="stat-meta">{filteredTransactions.filter(t => t.amount > 0).length} transactions</div>
          </div>
          <div className="summary-stat">
            <div className="stat-label">Net Change</div>
            <div className={`stat-value ${(totalCredits - totalDebits) >= 0 ? 'positive' : 'negative'}`}>
              {balanceVisible ? formatCurrency(totalCredits - totalDebits, true) : '••••••••'}
            </div>
            <div className="stat-meta">This period</div>
          </div>
        </div>

        <div className="activity-toolbar">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="toolbar-filters">
            <select 
              className="filter-select" 
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              <option value="all">All Accounts</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>
                  {acc.nickname || acc.productName} ({acc.displayNumber})
                </option>
              ))}
            </select>
            <select 
              className="filter-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="POSTED">Posted</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
        </div>

        <div className="transactions-container">
          <div className="transactions-table">
            <div className="table-header">
              <div className="table-cell">Date</div>
              <div className="table-cell">Description</div>
              <div className="table-cell">Category</div>
              <div className="table-cell">Account</div>
              <div className="table-cell">Status</div>
              <div className="table-cell text-right">Amount</div>
            </div>
            
            {filteredTransactions.map((txn, index) => {
              const showDateDivider = index === 0 || formatDate(txn.date) !== formatDate(filteredTransactions[index - 1].date);
              const account = accounts.find(a => a.id === txn.accountId);
              
              return (
                <React.Fragment key={txn.id}>
                  {showDateDivider && (
                    <div className="table-date-divider">{formatDate(txn.date)}</div>
                  )}
                  <div 
                    className={`table-row ${txn.status === 'PENDING' ? 'pending' : ''}`}
                    onClick={() => setSelectedTransaction(txn)}
                  >
                    <div className="table-cell">
                      <div className="cell-time">
                        {new Intl.DateTimeFormat('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        }).format(txn.date)}
                      </div>
                    </div>
                    <div className="table-cell">
                      <div className="cell-merchant">
                        <div className={`merchant-icon ${txn.amount < 0 ? 'debit' : 'credit'}`}>
                          {txn.amount < 0 ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
                        </div>
                        <div className="merchant-info">
                          <div className="merchant-name">{txn.description}</div>
                          <div className="merchant-ref">{txn.refNumber}</div>
                        </div>
                      </div>
                    </div>
                    <div className="table-cell">
                      {txn.category && (
                        <span className="table-category-badge">{txn.category}</span>
                      )}
                    </div>
                    <div className="table-cell">
                      <div className="cell-account">
                        {account?.displayNumber}
                      </div>
                    </div>
                    <div className="table-cell">
                      <span className={`table-status-badge ${txn.status.toLowerCase()}`}>
                        {txn.status === 'PENDING' && <Clock size={12} />}
                        {txn.status === 'POSTED' && <CheckCircle size={12} />}
                        {txn.status}
                      </span>
                    </div>
                    <div className="table-cell text-right">
                      <div className={`table-amount ${txn.amount < 0 ? 'debit' : 'credit'}`}>
                        {formatCurrency(txn.amount, true)}
                      </div>
                      {txn.status === 'POSTED' && (
                        <div className="table-balance">
                          Bal: {balanceVisible ? formatCurrency(txn.runningBalance) : '••••'}
                        </div>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="empty-state">
              <FileText size={48} />
              <h3>No transactions found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>

      {selectedTransaction && (
        <TransactionDetailDrawer
          transaction={selectedTransaction}
          account={accounts.find(a => a.id === selectedTransaction.accountId)}
          onClose={() => setSelectedTransaction(null)}
          balanceVisible={balanceVisible}
        />
      )}
    </>
  );
};

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      setAccounts(accountService.getAccounts());
      setLoading(false);
    };
    loadData();
  }, []);

  const formatCurrency = (amount, showSign = false) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
    
    if (showSign && amount !== 0) {
      return amount > 0 ? `+${formatted}` : `-${formatted}`;
    }
    return formatted;
  };

  const filteredAccounts = filterType === 'all' 
    ? accounts 
    : accounts.filter(acc => {
        if (filterType === 'deposit') return acc.type !== 'CREDIT_CARD';
        if (filterType === 'credit') return acc.type === 'CREDIT_CARD';
        return true;
      });

  const totalBalance = accounts
    .filter(a => a.type !== 'CREDIT_CARD')
    .reduce((sum, acc) => sum + acc.availableBalance, 0);

  const totalCredit = accounts
    .filter(a => a.type === 'CREDIT_CARD')
    .reduce((sum, acc) => sum + acc.availableBalance, 0);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading your accounts...</p>
      </div>
    );
  }

  return (
    <div className="accounts-page">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Accounts</h1>
          <p className="page-subtitle">Manage all your banking accounts in one place</p>
        </div>
        <div className="header-actions">
          <button className="btn-outline">
            <Download size={16} />
            <span>Export</span>
          </button>
          <button className="btn-primary">
            <span>Open New Account</span>
          </button>
        </div>
      </div>

      <div className="accounts-summary">
        <div className="summary-item">
          <div className="summary-label">Total Deposits</div>
          <div className="summary-value">
            {balanceVisible ? formatCurrency(totalBalance) : '••••••••'}
          </div>
          <div className="summary-meta">{filteredAccounts.filter(a => a.type !== 'CREDIT_CARD').length} accounts</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Total Available Credit</div>
          <div className="summary-value">
            {balanceVisible ? formatCurrency(totalCredit) : '••••••••'}
          </div>
          <div className="summary-meta">{filteredAccounts.filter(a => a.type === 'CREDIT_CARD').length} card</div>
        </div>
        <div className="summary-item">
          <button className="visibility-btn" onClick={() => setBalanceVisible(!balanceVisible)}>
            {balanceVisible ? <Eye size={20} /> : <EyeOff size={20} />}
            <span>{balanceVisible ? 'Hide' : 'Show'} Balances</span>
          </button>
        </div>
      </div>

      <div className="accounts-toolbar">
        <div className="filter-group">
          <button 
            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All Accounts ({accounts.length})
          </button>
          <button 
            className={`filter-btn ${filterType === 'deposit' ? 'active' : ''}`}
            onClick={() => setFilterType('deposit')}
          >
            Deposit Accounts ({accounts.filter(a => a.type !== 'CREDIT_CARD').length})
          </button>
          <button 
            className={`filter-btn ${filterType === 'credit' ? 'active' : ''}`}
            onClick={() => setFilterType('credit')}
          >
            Credit Cards ({accounts.filter(a => a.type === 'CREDIT_CARD').length})
          </button>
        </div>
        <div className="view-toggle">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>

      <div className={`accounts-container ${viewMode}`}>
        {filteredAccounts.map(account => (
          <div key={account.id} className="account-detail-card">
            <div className="account-card-header">
              <div className="account-info">
                <div className="account-type-badge-large">
                  {account.type.replace('_', ' ')}
                </div>
                <h3 className="account-title">{account.nickname || account.productName}</h3>
                <p className="account-number-text">{account.displayNumber} • {account.id}</p>
              </div>
              <button className="account-menu-btn">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="account-balance-section">
              {account.type === 'CREDIT_CARD' ? (
                <>
                  <div className="balance-group">
                    <div className="balance-item">
                      <span className="balance-label-text">Current Balance</span>
                      <span className="balance-value-large negative">
                        {balanceVisible ? formatCurrency(Math.abs(account.ledgerBalance)) : '••••••••'}
                      </span>
                    </div>
                    <div className="balance-item">
                      <span className="balance-label-text">Available Credit</span>
                      <span className="balance-value-large">
                        {balanceVisible ? formatCurrency(account.availableBalance) : '••••••••'}
                      </span>
                    </div>
                  </div>
                  <div className="credit-details">
                    <div className="credit-limit-bar">
                      <div className="credit-limit-label">
                        <span>Credit Utilization</span>
                        <span className="credit-percentage">
                          {((Math.abs(account.ledgerBalance) / account.creditLimit) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="credit-progress-bar">
                        <div 
                          className="credit-progress-fill"
                          style={{width: `${(Math.abs(account.ledgerBalance) / account.creditLimit) * 100}%`}}
                        ></div>
                      </div>
                      <div className="credit-limit-text">
                        {balanceVisible ? formatCurrency(Math.abs(account.ledgerBalance)) : '••••••'} of {balanceVisible ? formatCurrency(account.creditLimit) : '••••••'}
                      </div>
                    </div>
                    <div className="credit-info-grid">
                      <div className="info-item">
                        <span className="info-label">APR</span>
                        <span className="info-value">{account.apr}%</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Payment Due</span>
                        <span className="info-value">{account.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="balance-group">
                    <div className="balance-item primary">
                      <span className="balance-label-text">Available Balance</span>
                      <span className="balance-value-large">
                        {balanceVisible ? formatCurrency(account.availableBalance) : '••••••••'}
                      </span>
                    </div>
                    {account.ledgerBalance !== account.availableBalance && (
                      <div className="balance-item">
                        <span className="balance-label-text">Ledger Balance</span>
                        <span className="balance-value-large secondary">
                          {balanceVisible ? formatCurrency(account.ledgerBalance) : '••••••••'}
                        </span>
                      </div>
                    )}
                  </div>
                  {account.interestRate > 0 && (
                    <div className="interest-info-card">
                      <div className="interest-rate">
                        <Percent size={16} />
                        <span className="rate-text">
                          {account.apy?.toFixed(2) || account.interestRate.toFixed(2)}% APY
                        </span>
                      </div>
                      {account.monthlyInterestAccrued && (
                        <div className="interest-earned-text">
                          <TrendingUp size={14} />
                          <span>+{formatCurrency(account.monthlyInterestAccrued)} earned this month</span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="account-card-actions">
              <button className="action-btn secondary">
                <FileText size={16} />
                View Transactions
              </button>
              {account.type === 'CREDIT_CARD' ? (
                <button className="action-btn primary">
                  <DollarSign size={16} />
                  Make Payment
                </button>
              ) : (
                <button className="action-btn secondary">
                  <ArrowLeftRight size={16} />
                  Transfer Money
                </button>
              )}
              <button className="action-btn secondary">
                <Download size={16} />
                Statements
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const user = authService.getCurrentUser();

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 600));
      setAccounts(accountService.getAccounts());
      setTransactions(accountService.getTransactions());
      setLoading(false);
    };
    loadData();
  }, []);

  const totalAssets = accounts
    .filter(a => a.type !== 'CREDIT_CARD')
    .reduce((sum, acc) => sum + acc.availableBalance, 0);

  const totalLiabilities = accounts
    .filter(a => a.type === 'CREDIT_CARD')
    .reduce((sum, acc) => sum + Math.abs(acc.ledgerBalance), 0);

  const netWorth = totalAssets - totalLiabilities;
  const pendingTransactions = transactions.filter(t => t.status === 'PENDING');

  const formatCurrency = (amount, showSign = false) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
    
    if (showSign && amount !== 0) {
      return amount > 0 ? `+${formatted}` : `-${formatted}`;
    }
    return formatted;
  };

  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Securely loading your accounts...</p>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-top">
          <div className="header-left">
            <h1 className="page-title">Overview</h1>
            <div className="session-info">
              <span>Last accessed: {formatDateTime(user.lastLogin)}</span>
              <span className="session-divider">•</span>
              <span className="session-secure"><Shield size={12} />Secure session</span>
            </div>
          </div>
          <div className="header-actions">
            <button className="btn-outline"><Download size={16} /><span>Export</span></button>
            <button className="btn-outline"><Filter size={16} /><span>Filter</span></button>
          </div>
        </div>
      </div>

      <div className="dashboard-body">
        <div className="summary-cards">
          <div className="summary-card primary">
            <div className="card-header">
              <div className="card-label">
                <span>Net Worth</span>
                <button className="visibility-toggle" onClick={() => setBalanceVisible(!balanceVisible)}>
                  {balanceVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>
            <div className="card-value">{balanceVisible ? formatCurrency(netWorth) : '••••••••'}</div>
            <div className="card-change positive">
              <TrendingUp size={14} /><span>+2.4% vs last month</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-label">Total Assets</div>
            <div className="card-value secondary">{balanceVisible ? formatCurrency(totalAssets) : '••••••••'}</div>
            <div className="card-meta">{accounts.filter(a => a.type !== 'CREDIT_CARD').length} accounts</div>
          </div>

          <div className="summary-card">
            <div className="card-label">Total Liabilities</div>
            <div className="card-value secondary">{balanceVisible ? formatCurrency(totalLiabilities) : '••••••••'}</div>
            <div className="card-meta">{accounts.filter(a => a.type === 'CREDIT_CARD').length} credit account</div>
          </div>
        </div>

        {pendingTransactions.length > 0 && (
          <div className="alert-container">
            <div className="alert warning">
              <AlertTriangle size={18} />
              <div className="alert-content">
                <div className="alert-title">Pending Transactions</div>
                <div className="alert-text">
                  You have {pendingTransactions.length} pending transaction{pendingTransactions.length > 1 ? 's' : ''} totaling {formatCurrency(pendingTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0))}.
                </div>
              </div>
              <button className="alert-action">Review</button>
            </div>
          </div>
        )}

        <div className="content-grid">
          <div className="accounts-panel">
            <div className="panel-header">
              <h2 className="panel-title">Accounts</h2>
              <button className="link-action">View all<ChevronRight size={14} /></button>
            </div>

            <div className="accounts-list">
              {accounts.map(account => (
                <div key={account.id} className="account-card">
                  <div className="account-header">
                    <div className="account-type-badge">{account.type.replace('_', ' ')}</div>
                  </div>
                  <div className="account-name">{account.nickname || account.productName}</div>
                  <div className="account-number">{account.displayNumber} • {account.id}</div>
                  
                  <div className="account-balances">
                    {account.type === 'CREDIT_CARD' ? (
                      <>
                        <div className="balance-row">
                          <span className="balance-label">Current Balance</span>
                          <span className="balance-amount negative">
                            {balanceVisible ? formatCurrency(Math.abs(account.ledgerBalance)) : '••••••'}
                          </span>
                        </div>
                        <div className="balance-row">
                          <span className="balance-label">Available Credit</span>
                          <span className="balance-amount">
                            {balanceVisible ? formatCurrency(account.availableBalance) : '••••••'}
                          </span>
                        </div>
                        <div className="credit-util-bar">
                          <div className="credit-util-fill" style={{width: `${(Math.abs(account.ledgerBalance) / account.creditLimit) * 100}%`}}></div>
                        </div>
                        <div className="credit-meta">
                          {((Math.abs(account.ledgerBalance) / account.creditLimit) * 100).toFixed(1)}% utilization • Due {account.dueDate}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="balance-row main">
                          <span className="balance-label">Available Balance</span>
                          <span className="balance-amount">
                            {balanceVisible ? formatCurrency(account.availableBalance) : '••••••'}
                          </span>
                        </div>
                        {account.interestRate > 0 && (
                          <div className="account-interest">
                            <Percent size={12} />
                            <span>{account.apy?.toFixed(2) || account.interestRate.toFixed(2)}% APY</span>
                            {account.monthlyInterestAccrued && (
                              <span className="interest-earned">+{formatCurrency(account.monthlyInterestAccrued)} this month</span>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="account-actions">
                    <button className="account-action-btn">View Details</button>
                    {account.type === 'CREDIT_CARD' ? (
                      <button className="account-action-btn primary">Make Payment</button>
                    ) : (
                      <button className="account-action-btn">Transfer</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="activity-panel">
            <div className="panel-header">
              <h2 className="panel-title">Recent Activity</h2>
              <button className="link-action">View all<ChevronRight size={14} /></button>
            </div>

            <div className="activity-filters">
              <button className="filter-chip active">All Accounts</button>
              <button className="filter-chip">Checking</button>
              <button className="filter-chip">Credit Card</button>
            </div>

            <div className="transactions-list">
              {transactions.map((txn, index) => {
                const showDateDivider = index === 0 || formatDate(txn.date) !== formatDate(transactions[index - 1].date);
                
                return (
                  <React.Fragment key={txn.id}>
                    {showDateDivider && <div className="date-divider">{formatDate(txn.date)}</div>}
                    <div className={`transaction-row ${txn.status === 'PENDING' ? 'pending' : ''}`}>
                      <div className="transaction-icon">
                        <div className={`icon-wrapper ${txn.amount < 0 ? 'debit' : 'credit'}`}>
                          {txn.amount < 0 ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
                        </div>
                      </div>
                      <div className="transaction-details">
                        <div className="transaction-merchant">{txn.description}</div>
                        <div className="transaction-meta">
                          {txn.category && <span>{txn.category}</span>}
                          <span>•</span>
                          <span>{accounts.find(a => a.id === txn.accountId)?.displayNumber}</span>
                          {txn.status === 'PENDING' && (
                            <><span>•</span><span className="status-pending"><Clock size={11} />Pending</span></>
                          )}
                        </div>
                        <div className="transaction-ref">{txn.refNumber}</div>
                      </div>
                      <div className="transaction-amount-col">
                        <div className={`transaction-amount ${txn.amount < 0 ? 'debit' : 'credit'}`}>
                          {formatCurrency(txn.amount, true)}
                        </div>
                        {txn.status === 'POSTED' && (
                          <div className="transaction-balance">
                            Bal: {balanceVisible ? formatCurrency(txn.runningBalance) : '••••••'}
                          </div>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {selectedTransaction && (
        <TransactionDetailDrawer
          transaction={selectedTransaction}
          account={accounts.find(a => a.id === selectedTransaction.accountId)}
          onClose={() => setSelectedTransaction(null)}
          balanceVisible={balanceVisible}
        />
      )}
    </div>
    </>
  );
};

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(window.innerWidth >= 1200);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setSidebarExpanded(window.innerWidth >= 1200);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderView = () => {
    switch(currentView) {
      case 'accounts':
        return <AccountsPage />;
      case 'transactions':
        return <ActivityPage />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppContext.Provider value={{ currentView, setCurrentView, sidebarExpanded, setSidebarExpanded, isMobile }}>
      <div className="app">
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          
          .app { display: flex; height: 100vh; background: #f5f7fa; }
          
          .sidebar { background: #1a1d29; color: #fff; display: flex; flex-direction: column; transition: width 0.3s; }
          .sidebar.expanded { width: 260px; }
          .sidebar.collapsed { width: 72px; }
          
          .sidebar-header { padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); }
          .sidebar-brand { display: flex; align-items: center; gap: 12px; }
          .brand-icon { width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; }
          .brand-name { font-size: 14px; font-weight: 600; letter-spacing: 0.5px; }
          
          .sidebar-nav { flex: 1; padding: 16px 0; overflow-y: auto; }
          .nav-group { padding: 0 12px; margin-bottom: 24px; }
          .nav-link { width: 100%; display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: none; border: none; color: rgba(255,255,255,0.7); border-radius: 8px; cursor: pointer; transition: all 0.2s; font-size: 14px; }
          .nav-link:hover { background: rgba(255,255,255,0.05); color: #fff; }
          .nav-link.active { background: rgba(102, 126, 234, 0.15); color: #667eea; }
          .nav-label { flex: 1; text-align: left; }
          .nav-badge { background: #ef4444; color: #fff; font-size: 11px; padding: 2px 6px; border-radius: 10px; font-weight: 600; }
          
          .sidebar-footer { padding: 16px; border-top: 1px solid rgba(255,255,255,0.1); }
          .user-trigger { width: 100%; display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(255,255,255,0.05); border: none; border-radius: 8px; cursor: pointer; color: #fff; }
          .user-avatar { width: 36px; height: 36px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; }
          .user-info { flex: 1; text-align: left; }
          .user-name { font-size: 13px; font-weight: 500; }
          .user-meta { font-size: 11px; color: rgba(255,255,255,0.5); }
          
          .user-menu { position: absolute; bottom: 80px; left: 16px; right: 16px; background: #2a2d3a; border-radius: 8px; padding: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
          .user-menu-header { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); }
          .user-menu-name { font-size: 13px; font-weight: 600; }
          .user-menu-email { font-size: 11px; color: rgba(255,255,255,0.5); }
          .user-menu-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; color: rgba(255,255,255,0.8); cursor: pointer; border-radius: 4px; font-size: 13px; }
          .user-menu-item:hover { background: rgba(255,255,255,0.05); }
          .user-menu-item.danger { color: #ef4444; }
          .user-menu-divider { height: 1px; background: rgba(255,255,255,0.1); margin: 4px 0; }
          
          .main-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
          
          .dashboard { flex: 1; overflow-y: auto; }
          .dashboard-header { background: #fff; border-bottom: 1px solid #e5e7eb; padding: 24px 32px; }
          .header-top { display: flex; justify-content: space-between; align-items: flex-start; }
          .page-title { font-size: 28px; font-weight: 700; color: #111827; margin-bottom: 8px; }
          .session-info { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #6b7280; }
          .session-divider { color: #d1d5db; }
          .session-secure { display: flex; align-items: center; gap: 4px; color: #10b981; }
          .header-actions { display: flex; gap: 12px; }
          .btn-outline { display: flex; align-items: center; gap: 8px; padding: 10px 16px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; cursor: pointer; transition: all 0.2s; }
          .btn-outline:hover { border-color: #667eea; color: #667eea; }
          
          .dashboard-body { padding: 32px; }
          .summary-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 32px; }
          .summary-card { background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
          .summary-card.primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; }
          .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
          .card-label { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500; opacity: 0.9; }
          .visibility-toggle { background: none; border: none; color: inherit; cursor: pointer; padding: 4px; }
          .period-selector { background: rgba(255,255,255,0.15); border: none; color: #fff; padding: 6px 10px; border-radius: 6px; font-size: 12px; cursor: pointer; }
          .card-value { font-size: 36px; font-weight: 700; margin-bottom: 12px; }
          .card-value.secondary { font-size: 28px; color: #111827; }
          .card-change { display: flex; align-items: center; gap: 6px; font-size: 13px; }
          .card-change.positive { color: rgba(255,255,255,0.9); }
          .card-meta { font-size: 13px; color: #6b7280; margin-top: 8px; }
          
          .alert-container { margin-bottom: 32px; }
          .alert { display: flex; align-items: flex-start; gap: 16px; background: #fef3c7; border: 1px solid #fbbf24; border-radius: 12px; padding: 20px; }
          .alert-content { flex: 1; }
          .alert-title { font-size: 14px; font-weight: 600; color: #92400e; margin-bottom: 4px; }
          .alert-text { font-size: 13px; color: #78350f; }
          .alert-action { background: #f59e0b; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; }
          
          .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
          .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
          .panel-title { font-size: 18px; font-weight: 600; color: #111827; }
          .link-action { display: flex; align-items: center; gap: 4px; background: none; border: none; color: #667eea; font-size: 13px; font-weight: 500; cursor: pointer; }
          
          .accounts-panel, .activity-panel { background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
          .accounts-list { display: flex; flex-direction: column; gap: 16px; }
          .account-card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; transition: all 0.2s; }
          .account-card:hover { border-color: #667eea; box-shadow: 0 4px 12px rgba(102,126,234,0.1); }
          .account-header { display: flex; gap: 8px; margin-bottom: 12px; }
          .account-type-badge { background: #ede9fe; color: #5b21b6; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 6px; text-transform: uppercase; }
          .account-name { font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 4px; }
          .account-number { font-size: 13px; color: #6b7280; margin-bottom: 16px; }
          .account-balances { margin-bottom: 16px; }
          .balance-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
          .balance-row.main .balance-amount { font-size: 20px; font-weight: 700; color: #111827; }
          .balance-label { font-size: 13px; color: #6b7280; }
          .balance-amount { font-size: 15px; font-weight: 600; color: #111827; }
          .balance-amount.secondary { color: #6b7280; }
          .balance-amount.negative { color: #dc2626; }
          .credit-util-bar { height: 6px; background: #e5e7eb; border-radius: 3px; margin: 12px 0 8px; overflow: hidden; }
          .credit-util-fill { height: 100%; background: linear-gradient(90deg, #10b981, #fbbf24, #ef4444); transition: width 0.3s; }
          .credit-meta { font-size: 12px; color: #6b7280; }
          .account-interest { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #059669; background: #d1fae5; padding: 6px 10px; border-radius: 6px; margin-top: 8px; }
          .interest-earned { margin-left: auto; font-weight: 600; }
          .account-actions { display: flex; gap: 8px; }
          .account-action-btn { flex: 1; padding: 10px; background: #f3f4f6; border: none; border-radius: 6px; font-size: 13px; font-weight: 500; color: #374151; cursor: pointer; transition: all 0.2s; }
          .account-action-btn:hover { background: #e5e7eb; }
          .account-action-btn.primary { background: #667eea; color: #fff; }
          .account-action-btn.primary:hover { background: #5568d3; }
          
          .activity-filters { display: flex; gap: 8px; margin-bottom: 20px; }
          .filter-chip { background: #f3f4f6; border: none; padding: 8px 14px; border-radius: 20px; font-size: 13px; font-weight: 500; color: #6b7280; cursor: pointer; transition: all 0.2s; }
          .filter-chip:hover { background: #e5e7eb; }
          .filter-chip.active { background: #667eea; color: #fff; }
          
          .transactions-list { display: flex; flex-direction: column; }
          .date-divider { font-size: 13px; font-weight: 600; color: #6b7280; padding: 12px 0 8px; border-top: 1px solid #e5e7eb; margin-top: 8px; }
          .date-divider:first-child { border-top: none; margin-top: 0; }
          .transaction-row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f3f4f6; transition: background 0.2s; cursor: pointer; }
          .transaction-row:hover { background: #f9fafb; margin: 0 -12px; padding: 12px; border-radius: 8px; }
          .transaction-row.pending { opacity: 0.7; }
          .transaction-icon { flex-shrink: 0; }
          .icon-wrapper { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
          .icon-wrapper.debit { background: #fee2e2; color: #dc2626; }
          .icon-wrapper.credit { background: #d1fae5; color: #059669; }
          .transaction-details { flex: 1; min-width: 0; }
          .transaction-merchant { font-size: 14px; font-weight: 500; color: #111827; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .transaction-meta { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #6b7280; }
          .transaction-ref { font-size: 11px; color: #9ca3af; margin-top: 2px; }
          .status-pending { display: flex; align-items: center; gap: 3px; color: #f59e0b; }
          .transaction-amount-col { text-align: right; }
          .transaction-amount { font-size: 15px; font-weight: 600; }
          .transaction-amount.debit { color: #dc2626; }
          .transaction-amount.credit { color: #059669; }
          .transaction-balance { font-size: 12px; color: #6b7280; margin-top: 4px; }
          
          .loading-container { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 60px; }
          .loading-spinner { width: 48px; height: 48px; border: 4px solid #e5e7eb; border-top-color: #667eea; border-radius: 50%; animation: spin 0.8s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }
          .loading-text { margin-top: 20px; font-size: 14px; color: #6b7280; }
          
          .accounts-page { flex: 1; overflow-y: auto; background: #f5f7fa; }
          .page-header { background: #fff; border-bottom: 1px solid #e5e7eb; padding: 32px; }
          .header-content { margin-bottom: 24px; }
          .page-subtitle { font-size: 14px; color: #6b7280; margin-top: 8px; }
          .btn-primary { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #667eea; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
          .btn-primary:hover { background: #5568d3; }
          
          .accounts-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 32px; background: #fff; border-bottom: 1px solid #e5e7eb; }
          .summary-item { padding: 20px; background: #f9fafb; border-radius: 12px; }
          .summary-label { font-size: 13px; color: #6b7280; margin-bottom: 8px; }
          .summary-value { font-size: 32px; font-weight: 700; color: #111827; margin-bottom: 4px; }
          .summary-meta { font-size: 13px; color: #6b7280; }
          .visibility-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; height: 100%; background: #667eea; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
          .visibility-btn:hover { background: #5568d3; }
          
          .accounts-toolbar { display: flex; justify-content: space-between; align-items: center; padding: 24px 32px; background: #fff; }
          .filter-group { display: flex; gap: 8px; }
          .filter-btn { padding: 10px 16px; background: #f3f4f6; border: none; border-radius: 8px; font-size: 13px; font-weight: 500; color: #6b7280; cursor: pointer; transition: all 0.2s; }
          .filter-btn:hover { background: #e5e7eb; }
          .filter-btn.active { background: #667eea; color: #fff; }
          .view-toggle { display: flex; gap: 4px; background: #f3f4f6; padding: 4px; border-radius: 8px; }
          .view-btn { padding: 8px 16px; background: transparent; border: none; border-radius: 6px; font-size: 13px; font-weight: 500; color: #6b7280; cursor: pointer; transition: all 0.2s; }
          .view-btn.active { background: #fff; color: #111827; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
          
          .accounts-container { padding: 32px; }
          .accounts-container.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(480px, 1fr)); gap: 24px; }
          .accounts-container.list { display: flex; flex-direction: column; gap: 16px; }
          
          .account-detail-card { background: #fff; border-radius: 16px; padding: 28px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.3s; }
          .account-detail-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.12); transform: translateY(-2px); }
          
          .account-card-header { display: flex; justify-content: space-between; margin-bottom: 24px; }
          .account-info { flex: 1; }
          .account-type-badge-large { display: inline-block; background: #ede9fe; color: #5b21b6; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
          .account-title { font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 6px; }
          .account-number-text { font-size: 13px; color: #6b7280; }
          .account-menu-btn { background: none; border: none; color: #6b7280; cursor: pointer; padding: 8px; border-radius: 6px; transition: all 0.2s; }
          .account-menu-btn:hover { background: #f3f4f6; }
          
          .account-balance-section { margin-bottom: 24px; }
          .balance-group { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px; }
          .balance-item { padding: 16px; background: #f9fafb; border-radius: 10px; }
          .balance-item.primary { background: linear-gradient(135deg, #667eea15, #764ba215); }
          .balance-label-text { display: block; font-size: 12px; color: #6b7280; margin-bottom: 8px; font-weight: 500; }
          .balance-value-large { display: block; font-size: 24px; font-weight: 700; color: #111827; }
          .balance-value-large.secondary { color: #6b7280; font-size: 20px; }
          .balance-value-large.negative { color: #dc2626; }
          
          .credit-details { padding: 20px; background: #f9fafb; border-radius: 10px; }
          .credit-limit-bar { margin-bottom: 16px; }
          .credit-limit-label { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 13px; font-weight: 500; color: #374151; }
          .credit-percentage { font-weight: 700; color: #667eea; }
          .credit-progress-bar { height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; margin-bottom: 8px; }
          .credit-progress-fill { height: 100%; background: linear-gradient(90deg, #10b981, #fbbf24, #ef4444); transition: width 0.3s; }
          .credit-limit-text { font-size: 12px; color: #6b7280; }
          .credit-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .info-item { display: flex; flex-direction: column; }
          .info-label { font-size: 12px; color: #6b7280; margin-bottom: 4px; }
          .info-value { font-size: 15px; font-weight: 600; color: #111827; }
          
          .interest-info-card { padding: 16px; background: #d1fae5; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; }
          .interest-rate { display: flex; align-items: center; gap: 8px; color: #059669; font-weight: 600; }
          .rate-text { font-size: 15px; }
          .interest-earned-text { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #047857; font-weight: 500; }
          
          .account-card-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
          .action-btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 16px; border: none; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
          .action-btn.primary { background: #667eea; color: #fff; }
          .action-btn.primary:hover { background: #5568d3; }
          .action-btn.secondary { background: #f3f4f6; color: #374151; }
          .action-btn.secondary:hover { background: #e5e7eb; }
          
          .drawer-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); z-index: 1000; animation: fadeIn 0.2s ease; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          
          .transaction-drawer { position: fixed; top: 0; right: 0; bottom: 0; width: 600px; max-width: 90vw; background: #fff; box-shadow: -4px 0 24px rgba(0,0,0,0.15); z-index: 1001; display: flex; flex-direction: column; animation: slideIn 0.3s ease; }
          @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
          
          .drawer-header { padding: 24px 32px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: flex-start; }
          .drawer-header-content { flex: 1; }
          .drawer-title { font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 4px; }
          .drawer-subtitle { font-size: 13px; color: #6b7280; }
          .drawer-close { background: none; border: none; color: #6b7280; cursor: pointer; padding: 8px; border-radius: 6px; transition: all 0.2s; }
          .drawer-close:hover { background: #f3f4f6; }
          
          .drawer-body { flex: 1; overflow-y: auto; padding: 32px; }
          .transaction-amount-section { text-align: center; padding: 24px; background: #f9fafb; border-radius: 12px; margin-bottom: 32px; }
          .transaction-amount-large { font-size: 48px; font-weight: 700; margin-bottom: 12px; }
          .transaction-amount-large.debit { color: #dc2626; }
          .transaction-amount-large.credit { color: #059669; }
          .transaction-status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
          .transaction-status-badge.pending { background: #fef3c7; color: #92400e; }
          .transaction-status-badge.posted { background: #d1fae5; color: #065f46; }
          
          .detail-section { margin-bottom: 32px; }
          .section-title { font-size: 14px; font-weight: 600; color: #111827; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px; }
          .detail-grid { display: flex; flex-direction: column; gap: 16px; }
          .detail-item { display: flex; flex-direction: column; gap: 4px; }
          .detail-label { font-size: 12px; color: #6b7280; font-weight: 500; }
          .detail-value { font-size: 15px; color: #111827; font-weight: 500; }
          .category-badge { display: inline-block; background: #ede9fe; color: #5b21b6; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }
          
          .detail-alert { display: flex; gap: 12px; padding: 16px; background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; margin-top: 24px; }
          .alert-text-content { flex: 1; }
          .alert-text-content strong { display: block; font-size: 13px; color: #92400e; margin-bottom: 4px; }
          .alert-text-content p { font-size: 13px; color: #78350f; margin: 0; }
          
          .drawer-footer { padding: 24px 32px; border-top: 1px solid #e5e7eb; display: flex; gap: 12px; }
          .drawer-action-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 16px; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
          .drawer-action-btn.secondary { background: #f3f4f6; color: #374151; }
          .drawer-action-btn.secondary:hover { background: #e5e7eb; }
          
          .activity-page { flex: 1; overflow-y: auto; background: #f5f7fa; }
          .activity-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 32px; background: #fff; border-bottom: 1px solid #e5e7eb; }
          .summary-stat { padding: 20px; background: #f9fafb; border-radius: 12px; }
          .stat-label { font-size: 13px; color: #6b7280; margin-bottom: 8px; }
          .stat-value { font-size: 32px; font-weight: 700; margin-bottom: 4px; }
          .stat-value.negative { color: #dc2626; }
          .stat-value.positive { color: #059669; }
          .stat-meta { font-size: 13px; color: #6b7280; }
          
          .activity-toolbar { display: flex; gap: 16px; padding: 24px 32px; background: #fff; align-items: center; }
          .search-box { flex: 1; display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; }
          .search-box input { flex: 1; background: none; border: none; outline: none; font-size: 14px; color: #111827; }
          .search-box input::placeholder { color: #9ca3af; }
          .toolbar-filters { display: flex; gap: 12px; }
          .filter-select { padding: 10px 16px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; color: #374151; cursor: pointer; }
          
          .transactions-container { padding: 32px; }
          .transactions-table { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
          .table-header { display: grid; grid-template-columns: 100px 2fr 140px 140px 100px 140px; padding: 16px 24px; background: #f9fafb; border-bottom: 2px solid #e5e7eb; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; }
          .table-cell { display: flex; align-items: center; }
          .table-cell.text-right { justify-content: flex-end; text-align: right; }
          
          .table-date-divider { padding: 12px 24px; background: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 13px; font-weight: 600; color: #374151; }
          .table-row { display: grid; grid-template-columns: 100px 2fr 140px 140px 100px 140px; padding: 16px 24px; border-bottom: 1px solid #f3f4f6; cursor: pointer; transition: all 0.2s; }
          .table-row:hover { background: #f9fafb; }
          .table-row.pending { opacity: 0.75; }
          
          .cell-time { font-size: 13px; color: #6b7280; }
          .cell-merchant { display: flex; align-items: center; gap: 12px; }
          .merchant-icon { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
          .merchant-icon.debit { background: #fee2e2; color: #dc2626; }
          .merchant-icon.credit { background: #d1fae5; color: #059669; }
          .merchant-info { min-width: 0; }
          .merchant-name { font-size: 14px; font-weight: 500; color: #111827; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .merchant-ref { font-size: 12px; color: #9ca3af; }
          
          .table-category-badge { display: inline-block; background: #f3f4f6; color: #374151; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 500; }
          .cell-account { font-size: 13px; color: #6b7280; font-family: 'Courier New', monospace; }
          .table-status-badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
          .table-status-badge.pending { background: #fef3c7; color: #92400e; }
          .table-status-badge.posted { background: #d1fae5; color: #065f46; }
          
          .table-amount { font-size: 15px; font-weight: 600; }
          .table-amount.debit { color: #dc2626; }
          .table-amount.credit { color: #059669; }
          .table-balance { font-size: 12px; color: #9ca3af; margin-top: 2px; }
          
          .empty-state { padding: 80px 32px; text-align: center; color: #9ca3af; }
          .empty-state svg { margin: 0 auto 16px; opacity: 0.5; }
          .empty-state h3 { font-size: 18px; color: #6b7280; margin-bottom: 8px; }
          .empty-state p { font-size: 14px; }
          
          .mobile-nav { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: #fff; border-top: 1px solid #e5e7eb; padding: 8px 0; z-index: 100; }
          .mobile-nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; background: none; border: none; color: #6b7280; cursor: pointer; padding: 8px; }
          .mobile-nav-item.active { color: #667eea; }
          .mobile-nav-icon { position: relative; margin-bottom: 4px; }
          .mobile-nav-badge { position: absolute; top: -4px; right: -8px; background: #ef4444; color: #fff; font-size: 10px; padding: 2px 5px; border-radius: 10px; font-weight: 600; }
          .mobile-nav-label { font-size: 11px; font-weight: 500; }
          
          @media (max-width: 1024px) {
            .sidebar { display: none; }
            .content-grid { grid-template-columns: 1fr; }
            .mobile-nav { display: flex; }
            .main-content { padding-bottom: 70px; }
            .dashboard-header { padding: 20px; }
            .dashboard-body { padding: 20px; }
            .header-actions { display: none; }
            .summary-cards { grid-template-columns: 1fr; }
            .page-header { padding: 20px; }
            .accounts-summary { grid-template-columns: 1fr; padding: 20px; }
            .accounts-toolbar { flex-direction: column; gap: 16px; padding: 20px; }
            .filter-group { width: 100%; flex-wrap: wrap; }
            .accounts-container { padding: 20px; }
            .accounts-container.grid { grid-template-columns: 1fr; }
            .balance-group { grid-template-columns: 1fr; }
            .account-card-actions { grid-template-columns: 1fr; }
            .activity-summary { grid-template-columns: 1fr; padding: 20px; }
            .activity-toolbar { flex-direction: column; padding: 20px; }
            .toolbar-filters { width: 100%; flex-direction: column; }
            .filter-select { width: 100%; }
            .transactions-container { padding: 20px; }
            .table-header { display: none; }
            .table-row { grid-template-columns: 1fr; gap: 12px; padding: 16px; }
            .table-cell { justify-content: flex-start !important; }
            .cell-merchant { flex-direction: column; align-items: flex-start; }
            .transaction-drawer { width: 100%; max-width: 100%; }
            .drawer-header { padding: 20px; }
            .drawer-body { padding: 20px; }
            .drawer-footer { flex-direction: column; }
          }
          
          @media (max-width: 640px) {
            .page-title { font-size: 24px; }
            .card-value { font-size: 28px; }
            .session-info { flex-wrap: wrap; font-size: 12px; }
            .summary-value { font-size: 24px; }
            .filter-btn { font-size: 12px; padding: 8px 12px; }
          }
        `}</style>
        
        {!isMobile && <DesktopSidebar />}
        
        <div className="main-content">
          {renderView()}
        </div>
        
        {isMobile && <MobileBottomNav />}
      </div>
    </AppContext.Provider>
  );
};

export default App;