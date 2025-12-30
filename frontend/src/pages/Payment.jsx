import React, { useState, useEffect } from 'react';
import { ArrowDownLeft, ArrowUpRight, Copy, Check, AlertCircle, Wallet, CreditCard, Building, Shield, Clock, X } from 'lucide-react';
import { useUnlock } from '../UnlockContext';

export default function CryptoPaymentPage() {
  const [activeTab, setActiveTab] = useState('deposit');
  const [step, setStep] = useState('form');
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});
  const [processingProgress, setProcessingProgress] = useState(0);
    const {openUnlock} = useUnlock();
  

  const cryptoOptions = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      balance: 5.2847,
      usdValue: 520183.92,
      color: '#F7931A',
      minWithdraw: 0.001,
      fee: 0.0005,
      networks: ['Bitcoin', 'Lightning Network']
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 89.4721,
      usdValue: 356789.44,
      color: '#627EEA',
      minWithdraw: 0.01,
      fee: 0.005,
      networks: ['Ethereum (ERC20)', 'Polygon', 'Arbitrum']
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      balance: 156031.24,
      usdValue: 156078.55,
      color: '#26A17B',
      minWithdraw: 10,
      fee: 1,
      networks: ['Ethereum (ERC20)', 'Tron (TRC20)', 'BSC (BEP20)']
    },
    {
      symbol: 'BNB',
      name: 'Binance Coin',
      balance: 294.8214,
      usdValue: 193746.78,
      color: '#F3BA2F',
      minWithdraw: 0.1,
      fee: 0.005,
      networks: ['BSC (BEP20)', 'Ethereum (ERC20)']
    }
  ];

  const paymentMethods = [
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      description: 'Deposit via crypto wallet',
      icon: <Wallet size={24} />,
      fee: '0%',
      time: '10-30 mins',
      color: '#3B82F6'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard accepted',
      icon: <CreditCard size={24} />,
      fee: '2.5%',
      time: 'Instant',
      color: '#8B5CF6'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Wire transfer or ACH',
      icon: <Building size={24} />,
      fee: '1%',
      time: '1-3 business days',
      color: '#10B981'
    }
  ];

  useEffect(() => {
    if (step === 'processing') {
      const interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('success'), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateWithdraw = () => {
    const newErrors = {};
    
    if (!selectedCrypto) {
      newErrors.crypto = 'Please select a cryptocurrency';
    }
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (selectedCrypto && parseFloat(amount) < selectedCrypto.minWithdraw) {
      newErrors.amount = `Minimum withdrawal is ${selectedCrypto.minWithdraw} ${selectedCrypto.symbol}`;
    } else if (selectedCrypto && parseFloat(amount) > selectedCrypto.balance) {
      newErrors.amount = 'Insufficient balance';
    }
    if (!walletAddress) {
      newErrors.wallet = 'Please enter a wallet address';
    } else if (walletAddress.length < 26) {
      newErrors.wallet = 'Invalid wallet address';
    }
    if (!selectedNetwork) {
      newErrors.network = 'Please select a network';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDeposit = () => {
    const newErrors = {};
    
    if (!selectedCrypto) {
      newErrors.crypto = 'Please select a cryptocurrency';
    }
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!selectedNetwork) {
      newErrors.network = 'Please select a network';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceed = () => {
    if (activeTab === 'withdraw') {
      if (validateWithdraw()) {
        setStep('processing');
      }
    } else {
      if (validateDeposit()) {
        setStep('gateway');
      }
    }
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setStep('processing');
  };

  const handleReset = () => {
    setStep('form');
    setSelectedCrypto(null);
    setSelectedNetwork(null);
    setAmount('');
    setWalletAddress('');
    setPaymentMethod(null);
    setErrors({});
    setProcessingProgress(0);
  };

  const depositAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8';
  const networkFee = selectedCrypto ? `${selectedCrypto.fee} ${selectedCrypto.symbol}` : '0';
  const receiveAmount = amount && selectedCrypto ? (parseFloat(amount) - selectedCrypto.fee).toFixed(8) : '0';

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

        .payment-container {
          min-height: 100vh;
          background: #0A0E1A;
          padding: 40px 20px;
        }

        .payment-wrapper {
          max-width: 600px;
          margin: 0 auto;
        }

        .payment-header {
          text-align: center;
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

        .tabs {
          display: flex;
          gap: 8px;
          padding: 4px;
          background: rgba(15, 23, 42, 0.4);
          border-radius: 8px;
          margin-bottom: 24px;
          border: 1px solid rgba(148, 163, 184, 0.08);
        }

        .tab {
          flex: 1;
          padding: 10px 20px;
          border-radius: 6px;
          background: transparent;
          border: none;
          color: #64748B;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .tab.active {
          background: rgba(59, 130, 246, 0.1);
          color: #3B82F6;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .tab:hover:not(.active) {
          background: rgba(30, 41, 59, 0.4);
        }

        .payment-card {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.06);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 500;
          color: #E2E8F0;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .form-description {
          font-size: 11px;
          color: #64748B;
          margin-top: 6px;
        }

        .crypto-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .crypto-option {
          padding: 14px;
          background: rgba(30, 41, 59, 0.3);
          border: 1px solid rgba(148, 163, 184, 0.08);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .crypto-option:hover {
          background: rgba(30, 41, 59, 0.5);
          border-color: rgba(148, 163, 184, 0.12);
        }

        .crypto-option.selected {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .crypto-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: white;
          font-size: 12px;
          flex-shrink: 0;
        }

        .crypto-info {
          flex: 1;
          min-width: 0;
        }

        .crypto-name {
          font-size: 13px;
          font-weight: 500;
          color: #E2E8F0;
          margin-bottom: 2px;
        }

        .crypto-balance {
          font-size: 11px;
          color: #64748B;
        }

        .input-wrapper {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 12px 14px;
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.08);
          border-radius: 8px;
          color: #E2E8F0;
          font-size: 14px;
          transition: all 0.2s;
          outline: none;
        }

        .form-input:focus {
          border-color: rgba(59, 130, 246, 0.3);
          background: rgba(30, 41, 59, 0.6);
        }

        .form-input.error {
          border-color: rgba(239, 68, 68, 0.5);
        }

        .input-suffix {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          font-weight: 500;
          color: #64748B;
        }

        .max-button {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          padding: 4px 10px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 4px;
          color: #3B82F6;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .max-button:hover {
          background: rgba(59, 130, 246, 0.15);
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #EF4444;
          font-size: 11px;
          margin-top: 6px;
        }

        .network-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .network-option {
          padding: 12px 14px;
          background: rgba(30, 41, 59, 0.3);
          border: 1px solid rgba(148, 163, 184, 0.08);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .network-option:hover {
          background: rgba(30, 41, 59, 0.5);
          border-color: rgba(148, 163, 184, 0.12);
        }

        .network-option.selected {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .network-name {
          font-size: 13px;
          font-weight: 500;
          color: #E2E8F0;
        }

        .network-fee {
          font-size: 11px;
          color: #64748B;
        }

        .info-box {
          padding: 14px;
          background: rgba(59, 130, 246, 0.05);
          border: 1px solid rgba(59, 130, 246, 0.15);
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .info-box.warning {
          background: rgba(245, 158, 11, 0.05);
          border-color: rgba(245, 158, 11, 0.15);
        }

        .info-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }

        .info-title {
          font-size: 12px;
          font-weight: 500;
          color: #3B82F6;
        }

        .info-box.warning .info-title {
          color: #F59E0B;
        }

        .info-content {
          font-size: 12px;
          color: #94A3B8;
          line-height: 1.5;
        }

        .summary-box {
          padding: 16px;
          background: rgba(30, 41, 59, 0.3);
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid rgba(148, 163, 184, 0.06);
        }

        .summary-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .summary-row.total {
          padding-top: 12px;
          margin-top: 6px;
          border-top: 1px solid rgba(148, 163, 184, 0.1);
        }

        .summary-label {
          font-size: 12px;
          color: #94A3B8;
        }

        .summary-value {
          font-size: 12px;
          font-weight: 500;
          color: #E2E8F0;
        }

        .summary-row.total .summary-value {
          font-size: 16px;
          color: #10B981;
          font-weight: 600;
        }

        .button-group {
          display: flex;
          gap: 10px;
        }

        .btn {
          flex: 1;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border: none;
        }

        .btn-primary {
          background: rgba(59, 130, 246, 0.1);
          color: #3B82F6;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .btn-primary:hover:not(:disabled) {
          background: rgba(59, 130, 246, 0.15);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.08);
          color: #94A3B8;
        }

        .btn-secondary:hover {
          background: rgba(30, 41, 59, 0.6);
        }

        .payment-methods {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .payment-method {
          padding: 16px;
          background: rgba(30, 41, 59, 0.3);
          border: 1px solid rgba(148, 163, 184, 0.08);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          gap: 14px;
          align-items: center;
          back-color: transparent;
        }

        .payment-method:hover {
          background: rgba(30, 41, 59, 0.5);
          border-color: rgba(148, 163, 184, 0.12);
        }

        .payment-icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .payment-info {
          flex: 1;
        }

        .payment-name {
          font-size: 14px;
          font-weight: 500;
          color: #E2E8F0;
          margin-bottom: 2px;
        }

        .payment-description {
          font-size: 12px;
          color: #64748B;
          margin-bottom: 6px;
        }

        .payment-details {
          display: flex;
          gap: 12px;
          font-size: 11px;
        }

        .payment-detail {
          color: #94A3B8;
        }

        .address-box {
          padding: 16px;
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.08);
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .address-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .address-label {
          font-size: 11px;
          font-weight: 500;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .address-value {
          font-size: 13px;
          font-weight: 400;
          color: #E2E8F0;
          word-break: break-all;
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .copy-button {
          width: 100%;
          padding: 10px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 6px;
          color: #3B82F6;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .copy-button:hover {
          background: rgba(59, 130, 246, 0.15);
        }

        .copy-button.copied {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.2);
          color: #10B981;
        }

        .processing-container {
          text-align: center;
          padding: 40px 20px;
        }

        .processing-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }

        .processing-title {
          font-size: 20px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 8px;
        }

        .processing-subtitle {
          font-size: 13px;
          color: #64748B;
          margin-bottom: 24px;
        }

        .progress-bar-container {
          width: 100%;
          height: 6px;
          background: rgba(30, 41, 59, 0.4);
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%);
          border-radius: 6px;
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 13px;
          font-weight: 500;
          color: #3B82F6;
        }

        .success-container {
          text-align: center;
          padding: 40px 20px;
        }

        .success-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .success-checkmark {
          color: #10B981;
        }

        .success-title {
          font-size: 20px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 8px;
        }

        .success-subtitle {
          font-size: 13px;
          color: #64748B;
          margin-bottom: 24px;
        }

        .success-details {
          padding: 20px;
          background: rgba(30, 41, 59, 0.3);
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .success-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid rgba(148, 163, 184, 0.06);
        }

        .success-row:last-child {
          border-bottom: none;
        }

        .success-label {
          font-size: 12px;
          color: #64748B;
        }

        .success-value {
          font-size: 12px;
          font-weight: 500;
          color: #E2E8F0;
        }

        @media (max-width: 640px) {
          .crypto-grid {
            grid-template-columns: 1fr;
          }

          .payment-card {
            padding: 20px;
          }

          .button-group {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="payment-container">
        <div className="payment-wrapper">
          <div className="payment-header">
            <h1 className="page-title">Payment Gateway</h1>
            <p className="page-subtitle">Securely manage your crypto transactions</p>
          </div>

          {step === 'form' && (
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'deposit' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('deposit');
                  handleReset();
                }}
              >
                <ArrowDownLeft size={16} />
                Deposit
              </button>
              <button 
                className={`tab ${activeTab === 'withdraw' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('withdraw');
                  handleReset();
                }}
              >
                <ArrowUpRight size={16} />
                Withdraw
              </button>
            </div>
          )}

          {step === 'form' && (
            <div className="payment-card">
              <div className="form-group">
                <label className="form-label">Select Cryptocurrency</label>
                <div className="crypto-grid">
                  {cryptoOptions.map((crypto) => (
                    <div
                      key={crypto.symbol}
                      className={`crypto-option ${selectedCrypto?.symbol === crypto.symbol ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedCrypto(crypto);
                        setSelectedNetwork(null);
                        setErrors({});
                      }}
                    >
                      <div className="crypto-icon" style={{ background: crypto.color }}>
                        {crypto.symbol}
                      </div>
                      <div className="crypto-info">
                        <div className="crypto-name">{crypto.name}</div>
                        <div className="crypto-balance">
                          {activeTab === 'withdraw' ? `${crypto.balance.toFixed(4)} ${crypto.symbol}` : crypto.symbol}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.crypto && (
                  <div className="error-message">
                    <AlertCircle size={12} />
                    {errors.crypto}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Amount
                  {selectedCrypto && activeTab === 'withdraw' && (
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 400 }}>
                      (Min: {selectedCrypto.minWithdraw} {selectedCrypto.symbol})
                    </span>
                  )}
                </label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    className={`form-input ${errors.amount ? 'error' : ''}`}
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setErrors({});
                    }}
                    step="0.00000001"
                  />
                  {activeTab === 'withdraw' && selectedCrypto && (
                    <button 
                      className="max-button"
                      onClick={() => setAmount(selectedCrypto.balance.toString())}
                    >
                      MAX
                    </button>
                  )}
                  {selectedCrypto && (
                    <div className="input-suffix" style={{ right: activeTab === 'withdraw' ? '56px' : '14px' }}>
                      {selectedCrypto.symbol}
                    </div>
                  )}
                </div>
                {errors.amount && (
                  <div className="error-message">
                    <AlertCircle size={12} />
                    {errors.amount}
                  </div>
                )}
                {amount && selectedCrypto && (
                  <div className="form-description">
                    ≈ ${(parseFloat(amount) * (selectedCrypto.usdValue / selectedCrypto.balance)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                  </div>
                )}
              </div>

              {selectedCrypto && (
                <div className="form-group">
                  <label className="form-label">Select Network</label>
                  <div className="network-grid">
                    {selectedCrypto.networks.map((network) => (
<div
key={network}
className={`network-option ${selectedNetwork === network ? 'selected' : ''}`}
onClick={() => {
setSelectedNetwork(network);
setErrors({});
}}
>
<span className="network-name">{network}</span>
<span className="network-fee">Fee: {networkFee}</span>
</div>
))}
</div>
{errors.network && (
<div className="error-message">
<AlertCircle size={12} />
{errors.network}
</div>
)}
</div>
)}
{activeTab === 'withdraw' && (
  <div className="form-group">
    <label className="form-label">Withdrawal Address</label>
    <input
      type="text"
      className={`form-input ${errors.wallet ? 'error' : ''}`}
      placeholder="Enter wallet address"
      value={walletAddress}
      onChange={(e) => {
        setWalletAddress(e.target.value);
        setErrors({});
      }}
    />
    {errors.wallet && (
      <div className="error-message">
        <AlertCircle size={12} />
        {errors.wallet}
      </div>
    )}
  </div>
)}

{activeTab === 'withdraw' && amount && selectedCrypto && (
  <>
    <div className="info-box warning">
      <div className="info-header">
        <Shield size={14} color="#F59E0B" />
        <span className="info-title">Important Notice</span>
      </div>
      <div className="info-content">
        Double-check your wallet address. Transactions cannot be reversed once confirmed.
      </div>
    </div>

    <div className="summary-box">
      <div className="summary-row">
        <span className="summary-label">Amount</span>
        <span className="summary-value">{amount} {selectedCrypto.symbol}</span>
      </div>
      <div className="summary-row">
        <span className="summary-label">Network Fee</span>
        <span className="summary-value">{networkFee}</span>
      </div>
      <div className="summary-row total">
        <span className="summary-label">You'll Receive</span>
        <span className="summary-value">{receiveAmount} {selectedCrypto.symbol}</span>
      </div>
    </div>
  </>
)}

          <div className="button-group">
            <button className="btn btn-secondary" onClick={handleReset}>
              Cancel
            </button>
            <button 
              className="btn btn-primary" 
              // onClick={handleProceed}
              onClick={openUnlock}
              disabled={!selectedCrypto || !amount || !selectedNetwork || (activeTab === 'withdraw' && !walletAddress)}
            >
              {activeTab === 'deposit' ? 'Continue to Payment' : 'Confirm Withdrawal'}
            </button>
          </div>
        </div>
      )}

      {step === 'gateway' && (
        <div className="payment-card">
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F8FAFC' }}>Choose Payment Method</h3>
            <button 
              onClick={() => setStep('form')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: '4px' }}
            >
              <X size={20} />
            </button>
          </div>

          <div className="info-box">
            <div className="info-header">
              <Clock size={14} color="#3B82F6" />
              <span className="info-title">Depositing {amount} {selectedCrypto?.symbol}</span>
            </div>
            <div className="info-content">
              Select a payment method to complete your deposit
            </div>
          </div>

          <div  className="payment-methods">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="payment-method"
                // onClick={() => handlePaymentMethodSelect(method)}
                onClick={openUnlock}
              >
                <div className="payment-icon" style={{ background: `${method.color}15`, border: `1px solid ${method.color}30` }}>
                  {React.cloneElement(method.icon, { color: method.color })}
                </div>
                <div className="payment-info">
                  <div className="payment-name">{method.name}</div>
                  <div className="payment-description">{method.description}</div>
                  <div className="payment-details">
                    <span className="payment-detail">Fee: {method.fee}</span>
                    <span style={{ color: '#64748B' }}>•</span>
                    <span className="payment-detail">Time: {method.time}</span>
                  </div>
                </div>
                <div>
                  <ArrowUpRight size={18} color="#64748B" />
                </div>
              </div>
            ))}
          </div>

          {paymentMethod?.id === 'crypto' && (
            <>
              <div className="address-box">
                <div className="address-header">
                  <span className="address-label">Deposit Address ({selectedNetwork})</span>
                </div>
                <div className="address-value">{depositAddress}</div>
                <button 
                  className={`copy-button ${copied ? 'copied' : ''}`}
                  onClick={() => handleCopyAddress(depositAddress)}
                >
                  {copied ? (
                    <>
                      <Check size={14} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy Address
                    </>
                  )}
                </button>
              </div>

              <div className="info-box warning">
                <div className="info-header">
                  <AlertCircle size={14} color="#F59E0B" />
                  <span className="info-title">Important</span>
                </div>
                <div className="info-content">
                  Only send {selectedCrypto?.symbol} to this address via {selectedNetwork}. Deposits typically take 10-30 minutes to confirm.
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {step === 'processing' && (
        <div className="payment-card">
          <div className="processing-container">
            <div className="processing-icon">
              <Shield size={36} color="#3B82F6" />
            </div>
            <h3 className="processing-title">Processing Transaction</h3>
            <p className="processing-subtitle">
              {activeTab === 'deposit' ? 'Please wait while we process your deposit...' : 'Confirming your withdrawal request...'}
            </p>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${processingProgress}%` }}></div>
            </div>
            <div className="progress-text">{processingProgress}%</div>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="payment-card">
          <div className="success-container">
            <div className="success-icon">
              <Check size={36} className="success-checkmark" />
            </div>
            <h3 className="success-title">
              {activeTab === 'deposit' ? 'Deposit Successful!' : 'Withdrawal Successful!'}
            </h3>
            <p className="success-subtitle">
              {activeTab === 'deposit' 
                ? 'Your funds will be credited shortly' 
                : 'Your withdrawal has been initiated'}
            </p>

            <div className="success-details">
              <div className="success-row">
                <span className="success-label">Asset</span>
                <span className="success-value">{selectedCrypto?.name}</span>
              </div>
              <div className="success-row">
                <span className="success-label">Amount</span>
                <span className="success-value">{amount} {selectedCrypto?.symbol}</span>
              </div>
              <div className="success-row">
                <span className="success-label">Network</span>
                <span className="success-value">{selectedNetwork}</span>
              </div>
              <div className="success-row">
                <span className="success-label">Status</span>
                <span className="success-value" style={{ color: '#10B981' }}>Completed</span>
              </div>
              <div className="success-row">
                <span className="success-label">Transaction ID</span>
                <span className="success-value" style={{ fontSize: '11px' }}>0x7f9a...b21c</span>
              </div>
            </div>

            <div className="button-group">
              <button className="btn btn-primary" onClick={handleReset}>
                Make Another Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</>
    );
}