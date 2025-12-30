import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, ArrowRight, Check, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { verifyOtp, resendOtp } from '../utils/otp';
import { registerUser, loginUser } from '../utils/auth';



export default function CryptoAuthPages() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpStage, setOtpStage] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        await registerUser({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        });

        setIsSignUp(false);
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          fullName: '',
          agreeToTerms: false
        });

        alert('Account created. Please sign in.');
        // navigate('/maintenace');
      } else {
        const res = await loginUser({
          email: formData.email,
          password: formData.password
        });

        if (res.requiresOtp) {
          setPendingEmail(formData.email);
          setOtpStage(true);
          return;
        }

      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (loading || otp.length !== 6) return;

    setLoading(true);
    try {
      const res = await verifyOtp({
        email: pendingEmail,
        otp
      });

      localStorage.setItem('auth_token', res.token);
      localStorage.setItem('auth_user', JSON.stringify(res.user));

      navigate('/dashboard');

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await resendOtp({ email: pendingEmail });
      setOtp('');
      setOtpTimer(60);
      setCanResend(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const maskEmail = (email) => {
    const [name, domain] = email.split('@');
    return `${name[0]}***@${domain}`;
  };

  const otpRef = React.useRef(null);

useEffect(() => {
  if (otpStage) otpRef.current?.focus();
}, [otpStage]);





  useEffect(() => {
    if (!otpStage) return;

    setOtpTimer(60);
    setCanResend(false);

    const interval = setInterval(() => {
      setOtpTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [otpStage]);




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

        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #0A0E1A;
          position: relative;
          overflow: hidden;
        }

        .auth-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 50%);
          animation: pulse 8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .auth-card {
          width: 100%;
          max-width: 440px;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          border: 1px solid rgba(148, 163, 184, 0.1);
          padding: 28px 40px;
          position: relative;
          z-index: 1;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }


           .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 20px;
          font-weight: 700;
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
          text-decoration: none;
        }

        .start {
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
        }

        .logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-title {
          font-size: 28px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .auth-subtitle {
          font-size: 14px;
          color: #64748B;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 500;
          color: #94A3B8;
          letter-spacing: 0.01em;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 8px;
          color: #E2E8F0;
          font-size: 14px;
          transition: all 0.2s;
          outline: none;
        }

        .form-input:focus {
          border-color: rgba(59, 130, 246, 0.4);
          background: rgba(30, 41, 59, 0.6);
        }

        .form-input::placeholder {
          color: #475569;
        }

        .password-input-wrapper {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .checkbox-group {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .checkbox-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .checkbox-input {
          width: 18px;
          height: 18px;
          appearance: none;
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .checkbox-input:checked {
          background: #3B82F6;
          border-color: #3B82F6;
        }

        .checkbox-icon {
          position: absolute;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .checkbox-input:checked + .checkbox-icon {
          opacity: 1;
        }

        .checkbox-label {
          font-size: 13px;
          color: #94A3B8;
          line-height: 1.5;
        }

        .checkbox-label a {
          color: #3B82F6;
          text-decoration: none;
          transition: color 0.2s;
        }

        .checkbox-label a:hover {
          color: #60A5FA;
        }

        .submit-button {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          border: none;
          border-radius: 8px;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 8px;
        }

        .submit-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
        }

        .submit-button:active {
          transform: translateY(0);
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 24px 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(148, 163, 184, 0.1);
        }

        .divider-text {
          font-size: 12px;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .social-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .social-button {
          padding: 12px;
          background: rgba(30, 41, 59, 0.3);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 8px;
          color: #E2E8F0;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .social-button:hover {
          background: rgba(30, 41, 59, 0.5);
          border-color: rgba(148, 163, 184, 0.2);
        }

        .auth-footer {
          text-align: center;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(148, 163, 184, 0.06);
        }

        .auth-footer-text {
          font-size: 13px;
          color: #64748B;
        }

        .auth-footer-link {
          color: #3B82F6;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .auth-footer-link:hover {
          color: #60A5FA;
        }

        .forgot-password {
          text-align: right;
          margin-top: -8px;
        }

        .forgot-password-link {
          font-size: 13px;
          color: #3B82F6;
          text-decoration: none;
          transition: color 0.2s;
        }

        .forgot-password-link:hover {
          color: #60A5FA;
        }

        @media (max-width: 480px) {
          .auth-card {
            padding: 20px 24px;
          }

          .auth-title {
            font-size: 24px;
          }

          .social-buttons {
            grid-template-columns: 1fr;
          }
        }

        .otp-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 14, 26, 0.85);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.otp-modal {
  width: 100%;
  max-width: 420px;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.6);
  animation: slideUp 0.35s ease;
}

.otp-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 14, 26, 0.85);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.otp-modal {
  width: 100%;
  max-width: 420px;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 30px 80px rgba(0,0,0,0.6);
  animation: slideUp 0.35s ease;
}

.otp-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #94A3B8;
  font-size: 22px;
  cursor: pointer;
}


      `}</style>

      {otpStage && (

        <div className="otp-overlay">
          <div className="otp-modal">
            {/* OTP CONTENT GOES HERE */}
            <button
              onClick={() => setOtpStage(false)}
              className="otp-close"
            >
              ×
            </button>


            <div className="form-group">
              <label className="form-label">Enter 6-digit verification code</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                className="form-input"
                placeholder="••••••"
                ref={otpRef}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ''))
                }
                style={{
                  textAlign: 'center',
                  letterSpacing: '0.4em',
                  fontSize: '18px',
                  fontWeight: 600
                }}
                required
              />
              <small style={{ color: '#64748B', fontSize: 12 }}>
                Code sent to <strong>{maskEmail(pendingEmail)}</strong>
              </small>
            </div>

            <button
              className="submit-button"
              onClick={handleVerifyOtp}
              disabled={loading || otp.length !== 6}
            >
              {loading ? 'Verifying…' : 'Verify & Continue'}
              {!loading && <ArrowRight size={18} />}
            </button>

            <div style={{ textAlign: 'center', marginTop: 12 }}>
              {!canResend ? (
                <span style={{ fontSize: 13, color: '#64748B' }}>
                  Resend code in {otpTimer}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#3B82F6',
                    fontSize: 13,
                    cursor: 'pointer'
                  }}
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        </div>

      )}


      <div className="auth-container">
        <div className="auth-card">
          <a href={'/'} className="logo  mb-5">
            <div className="logo-icon">
              <TrendingUp size={16} color="#94A3B8" />
            </div>
            CRYPTOWEALTH
          </a>

          <div className="auth-header">
            <h1 className="auth-title">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="auth-subtitle">
              {isSignUp
                ? 'Start your wealth management journey'
                : 'Sign in to access your portfolio'}
            </p>
          </div>

          <div className="auth-form">
            {isSignUp && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-input"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} color="#64748B" />
                  ) : (
                    <Eye size={18} color="#64748B" />
                  )}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    className="form-input"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} color="#64748B" />
                    ) : (
                      <Eye size={18} color="#64748B" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {!isSignUp && (
              <div className="forgot-password">
                <a href="#" className="forgot-password-link">
                  Forgot password?
                </a>
              </div>
            )}

            {isSignUp && (
              <div className="checkbox-group">
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="terms"
                    name="agreeToTerms"
                    className="checkbox-input"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    required
                  />
                  <Check size={14} color="#FFFFFF" className="checkbox-icon" />
                </div>
                <label htmlFor="terms" className="checkbox-label">
                  I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                </label>
              </div>
            )}

            <button
              type="button"
              className="submit-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Processing…' : isSignUp ? 'Create Account' : 'Sign In'}
              {!loading && <ArrowRight size={18} />}
            </button>

          </div>

          <div className="auth-footer">
            <p className="auth-footer-text">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <a
                href="#"
                className="auth-footer-link"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                }}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}