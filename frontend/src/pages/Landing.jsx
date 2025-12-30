import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, Shield, Zap, Globe, Check, Menu, X } from 'lucide-react';

export default function CryptoLandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  const closeOnResize = () => {
    if (window.innerWidth > 1024) setMobileMenuOpen(false);
  };
  window.addEventListener('resize', closeOnResize);
  return () => window.removeEventListener('resize', closeOnResize);
}, []);


  const stats = [
    { value: '$2.8B+', label: 'Assets Under Management' },
    { value: '12K+', label: 'Active Investors' },
    { value: '98.7%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Real-Time Monitoring' }
  ];

  const features = [
    {
      icon: <TrendingUp size={24} />,
      title: 'Real-Time Analytics',
      description: 'Track your portfolio with live price updates, advanced charts, and comprehensive performance metrics.',
      gradientStart: '#3B82F6',
      gradientEnd: '#06B6D4'
    },
    {
      icon: <Shield size={24} />,
      title: 'Bank-Grade Security',
      description: 'Multi-layer encryption, cold storage, and institutional-grade security protocols protect your assets.',
      gradientStart: '#A855F7',
      gradientEnd: '#EC4899'
    },
    {
      icon: <Zap size={24} />,
      title: 'Lightning Fast Execution',
      description: 'Execute trades in milliseconds with our optimized infrastructure and direct exchange connections.',
      gradientStart: '#F97316',
      gradientEnd: '#EF4444'
    },
    {
      icon: <Globe size={24} />,
      title: 'Global Market Access',
      description: 'Trade 500+ cryptocurrencies across major exchanges worldwide from a single unified platform.',
      gradientStart: '#10B981',
      gradientEnd: '#059669'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '0',
      description: 'Perfect for beginners',
      features: ['Up to $50K portfolio', 'Basic analytics', 'Email support', '5 assets'],
      highlighted: false
    },
    {
      name: 'Professional',
      price: '99',
      description: 'For serious investors',
      features: ['Up to $500K portfolio', 'Advanced analytics', 'Priority support', 'Unlimited assets', 'API access', 'Custom alerts'],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For institutions',
      features: ['Unlimited portfolio', 'White-label solution', 'Dedicated manager', 'Custom integrations', 'SLA guarantee', 'Compliance tools'],
      highlighted: false
    }
  ];

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
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        .landing-container {
          background: #0A0E1A;
          min-height: 100vh;
        }

        /* Navigation */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: ${scrollY > 50 ? 'rgba(10, 14, 26, 0.9)' : 'transparent'};
          backdrop-filter: ${scrollY > 50 ? 'blur(20px)' : 'none'};
          border-bottom: 1px solid ${scrollY > 50 ? 'rgba(148, 163, 184, 0.08)' : 'transparent'};
          transition: all 0.3s;
        }

        .nav-container {
          max-width: 1400px;
          margin: auto;
          padding: 20px 32px;
          display: flex;
          justify-content: space-between;
          width:100%
        }

        @media (max-width:574px){
          .nav-container{
          padding: 20px 12px;
      }
        }

       
           .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 20px;
          font-weight: 700;
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
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

        .nav-links {
          display: flex;
          gap: 40px;
          align-items: center;
        }

        .nav-link {
          color: #94A3B8;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s;
          text-decoration: none;
        }

        .nav-link:hover {
          color: #E2E8F0;
        }

        .nav-cta {
          padding: 10px 24px;
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
          border: none;
          border-radius: 8px;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .nav-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
        }

        /* Hero Section */
        .hero {
          position: relative;
          padding: 180px 32px 120px;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
          z-index: 0;
        }

        .hero-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(148, 163, 184, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          z-index: 0;
        }

        .hero-content {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 20px;
          color: #60A5FA;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: 72px;
          font-weight: 700;
          color: #F8FAFC;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 20px;
          color: #94A3B8;
          max-width: 700px;
          margin: 0 auto 48px;
          line-height: 1.6;
        }

        .hero-cta-group {
          display: flex;
          gap: 16px;
          justify-content: center;
          align-items: center;
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
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(59, 130, 246, 0.4);
        }

        .btn-secondary {
          padding: 16px 32px;
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 10px;
          color: #E2E8F0;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: rgba(30, 41, 59, 0.6);
          border-color: rgba(148, 163, 184, 0.3);
        }

        /* Stats Section */
        .stats {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 32px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 48px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: 48px;
          font-weight: 700;
          color: #F8FAFC;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 14px;
          color: #64748B;
          font-weight: 500;
        }

        /* Features Section */
        .features {
          padding: 120px 32px;
          background: linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.4) 100%);
        }

        .features-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-badge {
          display: inline-block;
          padding: 6px 14px;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 20px;
          color: #A78BFA;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }

        .section-title {
          font-size: 48px;
          font-weight: 700;
          color: #F8FAFC;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .section-description {
          font-size: 18px;
          color: #94A3B8;
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        .feature-card {
          padding: 40px;
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 16px;
          transition: all 0.3s;
          cursor: pointer;
        }

        .feature-card:hover {
          border-color: rgba(148, 163, 184, 0.2);
          background: rgba(15, 23, 42, 0.6);
          transform: translateY(-4px);
        }

        .feature-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          color: white;
        }

        .feature-title {
          font-size: 24px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 12px;
        }

        .feature-description {
          font-size: 15px;
          color: #94A3B8;
          line-height: 1.6;
        }

        /* Pricing Section */
        .pricing {
          padding: 120px 32px;
        }

        .pricing-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 80px;
        }

        .pricing-card {
          padding: 40px;
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 16px;
          transition: all 0.3s;
          position: relative;
        }

        .pricing-card.highlighted {
          background: rgba(59, 130, 246, 0.05);
          border-color: rgba(59, 130, 246, 0.3);
          transform: scale(1.05);
        }

        .pricing-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          padding: 6px 16px;
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          border-radius: 20px;
          color: white;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .pricing-name {
          font-size: 20px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 8px;
        }

        .pricing-description {
          font-size: 14px;
          color: #64748B;
          margin-bottom: 24px;
        }

        .pricing-price {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 8px;
        }

        .price-currency {
          font-size: 24px;
          color: #94A3B8;
          font-weight: 600;
        }

        .price-amount {
          font-size: 56px;
          font-weight: 700;
          color: #F8FAFC;
          line-height: 1;
        }

        .price-period {
          font-size: 16px;
          color: #64748B;
        }

        .pricing-features {
          list-style: none;
          margin: 32px 0;
        }

        .pricing-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          color: #94A3B8;
          font-size: 14px;
        }

        .feature-check {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pricing-button {
          width: 100%;
          padding: 14px 24px;
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 10px;
          color: #E2E8F0;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display:flex;
          justify-content:center;
          text-decoration:none;
        }

        .pricing-card.highlighted .pricing-button {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          border: none;
          color: white;
        }

        .pricing-button:hover {
          background: rgba(30, 41, 59, 0.6);
        }

        .pricing-card.highlighted .pricing-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
        }

        /* CTA Section */
        .cta {
          padding: 120px 32px;
        }

        .cta-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 80px 60px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .cta-content {
          position: relative;
          z-index: 1;
        }

        .cta-title {
          font-size: 48px;
          font-weight: 700;
          color: #F8FAFC;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .cta-description {
          font-size: 18px;
          color: #94A3B8;
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Footer */
        .footer {
          padding: 80px 32px 40px;
          border-top: 1px solid rgba(148, 163, 184, 0.06);
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .footer-brand {
          font-size: 16px;
          font-weight: 600;
          color: #F8FAFC;
          letter-spacing: 0.08em;
          margin-bottom: 16px;
        }

        .footer-description {
          font-size: 14px;
          color: #64748B;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .footer-title {
          font-size: 14px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-links {
          list-style: none;
        }

        .footer-link {
          margin-bottom: 12px;
        }

        .footer-link a {
          color: #64748B;
          font-size: 14px;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-link a:hover {
          color: #94A3B8;
        }

        .footer-bottom {
          padding-top: 32px;
          border-top: 1px solid rgba(148, 163, 184, 0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-copyright {
          font-size: 13px;
          color: #64748B;
        }

        .footer-social {
          display: flex;
          gap: 16px;
        }

        .social-link {
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

        .social-link:hover {
          background: rgba(30, 41, 59, 0.5);
          border-color: rgba(148, 163, 184, 0.2);
        }

        @media (max-width: 1024px) {
          .nav-links {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          color: #8B5CF6;

          }

          .hero-title {
            font-size: 48px;
          }

          .stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .pricing-card.highlighted {
            transform: scale(1);
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 140px 24px 80px;
          }

          .hero-title {
            font-size: 36px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .hero-cta-group {
            flex-direction: column;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .stats {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .section-title {
            font-size: 32px;
          }

          .cta-title {
            font-size: 32px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 24px;
          }
        }

        .mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(10, 14, 26, 0.98);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.08);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: slideDown 0.25s ease;
  min-height: 100vh;
}

.mobile-nav a {
  color: #E2E8F0;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
}

.mobile-cta {
  margin-top: 12px;
  padding: 14px;
  background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

      `}</style>

      <div className="landing-container">
        {/* Navigation */}
        <nav className="nav">
          <div className="nav-container">
            {mobileMenuOpen && (
  <div className="mobile-nav">
    <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
    <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
    <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
    <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
    <a href='/auth' className="mobile-cta">Get Started</a>
  </div>
)}

             <div className="logo me-lg-5 me-md-3">
            <div className="logo-icon">
              <TrendingUp size={16} color="#94A3B8" />
            </div>
            CRYPTOWEALTH
          </div>
            <div className="nav-links">
              <a href="#features" className="nav-link">Features</a>
              <a href="#pricing" className="nav-link">Pricing</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#contact" className="nav-link">Contact</a>
              <button className="nav-cta">Get Started</button>
            </div>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} color="#8B5CF6" /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-background"></div>
          <div className="hero-grid"></div>
          <div className="hero-content">
            <div className="hero-badge">
              <Zap size={14} />
              Trusted by 12,000+ investors worldwide
            </div>
          <h1 className="hero-title">
  Digital Asset<br />Investment, Refined
</h1>
<p className="hero-subtitle">
  Track, allocate, and grow your crypto portfolio with real-time pricing,
  disciplined risk controls, and institutional grade analytics.
</p>

            <div className="hero-cta-group">
              <a href='/auth' className="btn-primary text-decoration-none">
                Start Free Trial
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Features Section */}
        <section className="features" id="features">
          <div className="features-container">
            <div className="section-header">
              <div className="section-badge">Features</div>
              <h2 className="section-title">Everything You Need to Succeed</h2>
              <p className="section-description">
                Professional tools and enterprise-grade infrastructure to manage your digital wealth with confidence.
              </p>
            </div>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="feature-card"
                  style={{
                    '--gradient-start': feature.gradientStart,
                    '--gradient-end': feature.gradientEnd
                  }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="pricing" id="pricing">
          <div className="pricing-container">
            <div className="section-header">
              <div className="section-badge">Pricing</div>
              <h2 className="section-title">Choose Your Plan</h2>
              <p className="section-description">
                Flexible pricing that scales with your portfolio. Start free, upgrade as you grow.
              </p>
            </div>
            <div className="pricing-grid">
              {pricingPlans.map((plan, index) => (
                <div key={index} className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}>
                  {plan.highlighted && <div className="pricing-badge">Most Popular</div>}
                  <div className="pricing-name">{plan.name}</div>
                  <div className="pricing-description">{plan.description}</div>
                  <div className="pricing-price">
                    {plan.price !== 'Custom' && <span className="price-currency">$</span>}
                    <span className="price-amount">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="price-period">/month</span>}
                  </div>
                  <ul className="pricing-features">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="pricing-feature">
                        <div className="feature-check">
                          <Check size={12} color="#10B981" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href='/auth' className="pricing-button">
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <div className="cta-container">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Transform Your Portfolio?</h2>
              <p className="cta-description">
                Join thousands of investors who trust CryptoWealth for their digital asset management.
                Start your free trial today.
              </p>
              <a href='/auth' className="btn-primary text-decoration-none">
                Create Free Account
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-grid">
              <div>
                <div className="footer-brand">CRYPTOWEALTH</div>
                <p className="footer-description">
                  Professional wealth management for the digital age. Secure, fast, and intuitive.
                </p>
              </div>
              <div>
                <div className="footer-title">Product</div>
                <ul className="footer-links">
                  <li className="footer-link"><a href="#">Features</a></li>
                  <li className="footer-link"><a href="#">Pricing</a></li>
                  <li className="footer-link"><a href="#">Security</a></li>
                  <li className="footer-link"><a href="#">API</a></li>
                  <li className="footer-link"><a href="#">Integrations</a></li>
                </ul>
              </div>
              <div>
                <div className="footer-title">Company</div>
                <ul className="footer-links">
                  <li className="footer-link"><a href="#">About</a></li>
                  <li className="footer-link"><a href="#">Blog</a></li>
                  <li className="footer-link"><a href="#">Careers</a></li>
                  <li className="footer-link"><a href="#">Press</a></li>
                  <li className="footer-link"><a href="#">Partners</a></li>
                </ul>
              </div>
              <div>
                <div className="footer-title">Resources</div>
                <ul className="footer-links">
                  <li className="footer-link"><a href="#">Documentation</a></li>
                  <li className="footer-link"><a href="#">Help Center</a></li>
                  <li className="footer-link"><a href="#">Community</a></li>
                  <li className="footer-link"><a href="#">Guides</a></li>
                  <li className="footer-link"><a href="#">Status</a></li>
                </ul>
              </div>
              <div>
                <div className="footer-title">Legal</div>
                <ul className="footer-links">
                  <li className="footer-link"><a href="#">Privacy</a></li>
                  <li className="footer-link"><a href="#">Terms</a></li>
                  <li className="footer-link"><a href="#">Compliance</a></li>
                  <li className="footer-link"><a href="#">Licenses</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="footer-copyright">
                © 2025 CryptoWealth. All rights reserved.
              </div>
              <div className="footer-social">
                <div className="social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </div>
                <div className="social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div className="social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <div className="social-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </footer>
      </div>
    </>
  );
}