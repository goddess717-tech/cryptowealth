import React, { useState, useEffect, useRef } from 'react';
import { Lock, Unlock, Mail, Smartphone, Shield, AlertTriangle, CheckCircle, X, ArrowRight, RefreshCw, Clock } from 'lucide-react';

export default function UnlockModal({ isOpen, onClose }) {
  const [step, setStep] = useState('locked');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const otpInputs = useRef([]);

 

  const verificationMethods = [
    {
      id: 'email',
      icon: <Mail size={24} />,
      title: 'Email Verification',
      subtitle: 'logis*****0@crypto.com',
      description: 'We\'ll send a 6-digit code to your registered email',
      color: '#3B82F6'
    },
    {
      id: 'sms',
      icon: <Smartphone size={24} />,
      title: 'SMS Verification',
      subtitle: '+1 (269) ***-8015',
      description: 'Receive a verification code via text message',
      color: '#10B981'
    },
    // {
    //   id: 'authenticator',
    //   icon: <Shield size={24} />,
    //   title: 'Authenticator App',
    //   subtitle: 'Google Authenticator',
    //   description: 'Use your authenticator app to generate a code',
    //   color: '#8B5CF6'
    // }
  ];

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Auto-focus on OTP inputs
  useEffect(() => {
    if (step === 'otp-input' && otpInputs.current[0]) {
      otpInputs.current[0].focus();
    }
  }, [step]);



  const handleOpenModal = () => {
    setIsOpen(true);
    setStep('locked');
    setSelectedMethod(null);
    setOtp(['', '', '', '', '', '']);
    setError('');
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep('locked');
      setSelectedMethod(null);
      setOtp(['', '', '', '', '', '']);
      setError('');
    }, 300);
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setStep('otp-input');
    setCountdown(60);
    setError('');
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value[0];
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (index === 5 && value && newOtp.every(digit => digit)) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = (code) => {
    setIsVerifying(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const correctCode = '085290';
      if (code === correctCode) {
        setStep('success');
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError('Invalid verification code. Please try again.');
        setOtp(['', '', '', '', '', '']);
        otpInputs.current[0]?.focus();
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleResendCode = () => {
    if (countdown > 0) return;
    setCountdown(60);
    setOtp(['', '', '', '', '', '']);
    setError('');
    otpInputs.current[0]?.focus();
  };

  const handleBack = () => {
    if (step === 'otp-input') {
      setStep('verify-method');
      setSelectedMethod(null);
      setOtp(['', '', '', '', '', '']);
      setError('');
    }
  };

     useEffect(() => {
    if (!isOpen) return;
    setStep('locked');
    setSelectedMethod(null);
    setOtp(['', '', '', '', '', '']);
    setError('');
  }, [isOpen]);

  if (!isOpen) return null;


  return (
    <>
      <style>{`

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 14, 26, 0.95);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        .modal-container {
          width: 100%;
          max-width: 480px;
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 20px;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.6);
          position: relative;
          animation: slideUp 0.3s ease;
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 10;
        }

        .modal-close:hover {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(148, 163, 184, 0.2);
        }

        .modal-header {
          padding: 40px 40px 32px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.06);
          display:flex;
          flex-direction:column;
          text-align: center
        }

        .icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .icon-wrapper.locked {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%);
        }

        .icon-wrapper.success {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%);
        }

        .icon-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .icon-glow.locked {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.4) 0%, rgba(220, 38, 38, 0.4) 100%);
          filter: blur(20px);
        }

        .icon-glow.success {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.4) 0%, rgba(5, 150, 105, 0.4) 100%);
          filter: blur(20px);
        }

        .modal-title {
          font-size: 24px;
          font-weight: 700;
          color: #F8FAFC;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .modal-subtitle {
          font-size: 15px;
          color: #94A3B8;
          line-height: 1.6;
          max-width: 360px;
          margin: 0 auto;
        }

        .modal-body {
          padding: 32px 40px 40px;
        }

        /* Verification Methods */
        .verification-methods {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .method-card {
          padding: 20px;
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .method-card:hover {
          background: rgba(30, 41, 59, 0.6);
          border-color: rgba(148, 163, 184, 0.2);
          transform: translateY(-2px);
        }

        .method-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .method-content {
          flex: 1;
        }

        .method-title {
          font-size: 15px;
          font-weight: 600;
          color: #E2E8F0;
          margin-bottom: 2px;
        }

        .method-subtitle {
          font-size: 13px;
          color: #64748B;
          margin-bottom: 6px;
        }

        .method-description {
          font-size: 12px;
          color: #64748B;
          line-height: 1.4;
        }

        .method-arrow {
          color: #64748B;
        }

        /* OTP Input */
        .otp-container {
          margin-bottom: 24px;
        }

        .method-selected {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .method-selected-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .method-selected-text {
          flex: 1;
        }

        .method-selected-title {
          font-size: 14px;
          font-weight: 600;
          color: #E2E8F0;
          margin-bottom: 2px;
        }

        .method-selected-subtitle {
          font-size: 12px;
          color: #64748B;
        }

        .otp-label {
          font-size: 14px;
          color: #94A3B8;
          margin-bottom: 16px;
          text-align: center;
        }

        .otp-inputs {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 20px;
        }

        .otp-input {
          width: 52px;
          height: 56px;
          background: rgba(30, 41, 59, 0.6);
          border: 2px solid rgba(148, 163, 184, 0.1);
          border-radius: 12px;
          color: #F8FAFC;
          font-size: 24px;
          font-weight: 600;
          text-align: center;
          transition: all 0.2s;
          outline: none;
        }

        .otp-input:focus {
          border-color: #3B82F6;
          background: rgba(30, 41, 59, 0.8);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .otp-input.error {
          border-color: #EF4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 8px;
          color: #EF4444;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .resend-container {
          text-align: center;
          margin-bottom: 24px;
        }

        .resend-text {
          font-size: 13px;
          color: #64748B;
          margin-bottom: 8px;
        }

        .resend-button {
          background: none;
          border: none;
          color: #3B82F6;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
          padding: 6px 12px;
          border-radius: 6px;
        }

        .resend-button:hover:not(:disabled) {
          background: rgba(59, 130, 246, 0.1);
        }

        .resend-button:disabled {
          color: #64748B;
          cursor: not-allowed;
        }

        /* Buttons */
        .button-group {
          display: flex;
          gap: 12px;
        }

        .btn {
          flex: 1;
          padding: 14px 24px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
        }

          .btn-primary {
          padding: 16px 32px;
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
          border: none;
          border-radius: 10px;
          color: #FFFFFF;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          max-width:250px;
          width:95%;
          margin: auto;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(59, 130, 246, 0.4);
        }
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: #E2E8F0;
        }

        .btn-secondary:hover {
          background: rgba(30, 41, 59, 0.8);
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        /* Success State */
        .success-content {
          text-align: center;
          padding: 20px 0;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(5, 150, 105, 0.2) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          position: relative;
          animation: pulse 1s ease-in-out;
        }

        .success-checkmark {
          color: #10B981;
        }

        .success-title {
          font-size: 24px;
          font-weight: 700;
          color: #F8FAFC;
          margin-bottom: 12px;
        }

        .success-subtitle {
          font-size: 15px;
          color: #94A3B8;
        }

        @media (max-width: 480px) {
          .modal-container {
            max-width: 100%;
            border-radius: 16px;
          }

          .modal-header {
            padding: 32px 24px 24px;
          }

          .modal-body {
            padding: 24px;
          }

          .otp-inputs {
            gap: 8px;
          }

          .otp-input {
            width: 44px;
            height: 52px;
            font-size: 20px;
          }

          .button-group {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            <X size={18} color="#64748B" />
          </button>

          {step === 'locked' && (
            <>
              <div className="modal-header">
                <div className="icon-wrapper locked">
                  <div className="icon-glow locked"></div>
                  <Lock size={40} color="#EF4444" />
                </div>
                <h2 className="modal-title">Account Locked</h2>
                <p className="modal-subtitle">
                  For your security, this action requires verification. Please verify your identity to continue.
                </p>
              </div>
              <div className="modal-body">
                <button 
                  className="btn btn-primary"
                  onClick={() => setStep('verify-method')}
                >
                  Verify Identity
                  <ArrowRight size={18} />
                </button>
              </div>
            </>
          )}

          {step === 'verify-method' && (
            <>
              <div className="modal-header">
                <div className="icon-wrapper locked">
                  <div className="icon-glow locked"></div>
                  <Shield size={40} color="#EF4444" />
                </div>
                <h2 className="modal-title">Choose Verification Method</h2>
                <p className="modal-subtitle">
                  Select how you'd like to receive your verification code
                </p>
              </div>
              <div className="modal-body">
                <div className="verification-methods">
                  {verificationMethods.map((method) => (
                    <div 
                      key={method.id}
                      className="method-card"
                      onClick={() => handleMethodSelect(method)}
                    >
                      <div 
                        className="method-icon"
                        style={{ 
                          background: `${method.color}20`,
                          color: method.color
                        }}
                      >
                        {method.icon}
                      </div>
                      <div className="method-content">
                        <div className="method-title">{method.title}</div>
                        <div className="method-subtitle">{method.subtitle}</div>
                        <div className="method-description">{method.description}</div>
                      </div>
                      <div className="method-arrow">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 'otp-input' && selectedMethod && (
            <>
              <div className="modal-header">
                <div className="icon-wrapper locked">
                  <div className="icon-glow locked"></div>
                  <Shield size={40} color="#3B82F6" />
                </div>
                <h2 className="modal-title">Enter Verification Code</h2>
                <p className="modal-subtitle">
                  We've sent a 6-digit code to {selectedMethod.subtitle}
                </p>
              </div>
              <div className="modal-body">
                <div className="otp-container">
                  <div className="method-selected">
                    <div 
                      className="method-selected-icon"
                      style={{ 
                        background: `${selectedMethod.color}20`,
                        color: selectedMethod.color
                      }}
                    >
                      {selectedMethod.icon}
                    </div>
                    <div className="method-selected-text">
                      <div className="method-selected-title">{selectedMethod.title}</div>
                      <div className="method-selected-subtitle">{selectedMethod.subtitle}</div>
                    </div>
                  </div>

                  <div className="otp-label">Enter the 6-digit code</div>

                  {error && (
                    <div className="error-message">
                      <AlertTriangle size={16} />
                      {error}
                    </div>
                  )}

                  <div className="otp-inputs">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpInputs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        className={`otp-input ${error ? 'error' : ''}`}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        disabled={isVerifying}
                      />
                    ))}
                  </div>

                  <div className="resend-container">
                    <div className="resend-text">
                      {countdown > 0 ? `Resend code in ${countdown}s` : "Didn't receive the code?"}
                    </div>
                    <button 
                      className="resend-button"
                      onClick={handleResendCode}
                      disabled={countdown > 0 || isVerifying}
                    >
                      <RefreshCw size={14} />
                      Resend Code
                    </button>
                  </div>
                </div>

                <div className="button-group">
                  <button 
                    className="btn btn-secondary"
                    onClick={handleBack}
                    disabled={isVerifying}
                  >
                    Back
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleVerifyOtp(otp.join(''))}
                    disabled={otp.some(digit => !digit) || isVerifying}
                  >
                    {isVerifying ? (
                      <>
                        <div className="spinner"></div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 'success' && (
            <>
              <div className="modal-header">
                <div className="success-icon">
                  <CheckCircle size={48} className="success-checkmark" />
                </div>
                <h2 className="success-title">Account Unlocked!</h2>
                <p className="modal-subtitle">
                  Your identity has been verified successfully
                </p>
              </div>
              <div className="modal-body">
                <div className="success-content">
                  <p style={{ color: '#64748B', fontSize: '14px' }}>
                    You can now proceed with your transaction
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}