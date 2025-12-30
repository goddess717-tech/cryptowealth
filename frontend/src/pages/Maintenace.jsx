import React, { useState, useEffect } from 'react';
import { Wrench, Clock, Shield, Zap, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

export default function MaintenancePage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 34,
    seconds: 0
  });
  const [progress, setProgress] = useState(0);
  const [pulse, setPulse] = useState(0);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Progress bar animation
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 0.5;
      });
    }, 100);

    return () => clearInterval(progressTimer);
  }, []);

  // Pulse animation
  useEffect(() => {
    const pulseTimer = setInterval(() => {
      setPulse(prev => (prev + 1) % 3);
    }, 800);

    return () => clearInterval(pulseTimer);
  }, []);

  const maintenanceTasks = [
    { icon: <Shield size={20} />, label: 'Security Updates', status: 'completed', color: '#10B981' },
    { icon: <Zap size={20} />, label: 'Performance Optimization', status: 'in-progress', color: '#3B82F6' },
    { icon: <CheckCircle size={20} />, label: 'Database Migration', status: 'pending', color: '#64748B' }
  ];

  const statusUpdates = [
    { time: '14:23', message: 'Maintenance window started', type: 'info' },
    { time: '14:45', message: 'Security patches applied successfully', type: 'success' },
    { time: '15:12', message: 'Optimizing database performance', type: 'progress' },
    { time: '15:38', message: 'Running final system checks', type: 'progress' }
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
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        .maintenance-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* Animated Background */
        .background-animation {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          overflow: hidden;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: float 20s infinite ease-in-out;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
          top: -250px;
          left: -250px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
          bottom: -200px;
          right: -200px;
          animation-delay: 5s;
        }

        .orb-3 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 10s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(148, 163, 184, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.5;
        }

        /* Header */
        .header {
          position: relative;
          z-index: 10;
          padding: 24px 12px;
          display: flex;
          justify-content: space-between;
          background: rgba(10, 14, 26, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(148, 163, 184, 0.08);
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

        .status-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(251, 191, 36, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.2);
          border-radius: 20px;
          color: #FCD34D;
          font-size: 13px;
          font-weight: 500;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #FCD34D;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        /* Main Content */
        .content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 32px;
          position: relative;
          z-index: 10;
        }

        .content-wrapper {
          max-width: 900px;
          width: 100%;
        }

        /* Icon Container */
        .icon-container {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }

        .maintenance-icon {
          width: 120px;
          height: 120px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
          border: 1px solid rgba(148, 163, 184, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          animation: iconFloat 3s ease-in-out infinite;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .icon-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%);
          filter: blur(20px);
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .maintenance-icon svg {
          position: relative;
          z-index: 1;
          color: #60A5FA;
        }

        /* Text Content */
        .text-content {
          text-align: center;
          margin-bottom: 48px;
        }

        .title {
          font-size: 48px;
          font-weight: 700;
          color: #F8FAFC;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 18px;
          color: #94A3B8;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto 32px;
        }

        /* Countdown Timer */
        .countdown {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-bottom: 48px;
        }

        .countdown-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 32px;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 16px;
          min-width: 120px;
        }

        .countdown-value {
          font-size: 48px;
          font-weight: 700;
          color: #60A5FA;
          line-height: 1;
          margin-bottom: 8px;
          font-variant-numeric: tabular-nums;
        }

        .countdown-label {
          font-size: 13px;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        /* Progress Bar */
        .progress-section {
          margin-bottom: 48px;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .progress-label {
          font-size: 14px;
          color: #94A3B8;
          font-weight: 500;
        }

        .progress-percentage {
          font-size: 14px;
          color: #60A5FA;
          font-weight: 600;
        }

        .progress-bar-container {
          height: 8px;
          background: rgba(30, 41, 59, 0.6);
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%);
          border-radius: 8px;
          transition: width 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        /* Tasks Grid */
        .tasks-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 48px;
        }

        .task-card {
          padding: 24px;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 12px;
          transition: all 0.3s;
        }

        .task-card:hover {
          border-color: rgba(148, 163, 184, 0.2);
          transform: translateY(-2px);
        }

        .task-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;

        }

        .task-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(59, 130, 246, 0.1);
        }

        .task-label {
          font-size: 14px;
          color: #E2E8F0;
          font-weight: 500;
        }

        .task-status {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .status-completed {
          background: rgba(16, 185, 129, 0.1);
          color: #10B981;
        }

        .status-in-progress {
          background: rgba(59, 130, 246, 0.1);
          color: #3B82F6;
        }

        .status-pending {
          background: rgba(100, 116, 139, 0.1);
          color: #64748B;
        }

        /* Status Updates */
        .updates-section {
          padding: 32px;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 16px;
          margin-bottom: 32px;
        }

        .updates-title {
          font-size: 16px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .updates-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .update-item {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: rgba(30, 41, 59, 0.4);
          border-radius: 8px;
          border-left: 3px solid;
          transition: all 0.2s;
        }

        .update-item:hover {
          background: rgba(30, 41, 59, 0.6);
        }

        .update-item.info { border-left-color: #3B82F6; }
        .update-item.success { border-left-color: #10B981; }
        .update-item.progress { border-left-color: #8B5CF6; }

        .update-time {
          font-size: 13px;
          color: #64748B;
          font-weight: 500;
          font-variant-numeric: tabular-nums;
          min-width: 45px;
        }

        .update-message {
          font-size: 14px;
          color: #94A3B8;
          flex: 1;
        }

        /* Footer Actions */
        .footer-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
        }

        .action-button {
          padding: 14px 28px;
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 10px;
          color: #E2E8F0;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .action-button:hover {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(148, 163, 184, 0.3);
          transform: translateY(-1px);
        }

        .action-button.primary {
          background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
          border: none;
          color: white;
        }

        .action-button.primary:hover {
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .title {
            font-size: 32px;
          }

          .subtitle {
            font-size: 16px;
          }

          .countdown {
            gap: 12px;
          }

          .countdown-item {
            padding: 16px 20px;
            min-width: 90px;
          }

          .countdown-value {
            font-size: 36px;
          }

          .tasks-grid {
            grid-template-columns: 1fr;
          }

          .footer-actions {
            flex-direction: column;
            width: 100%;
          }

          .action-button {
            width: 100%;
            justify-content: center;
          }

          .updates-section {
            padding: 24px;
          }
        }
      `}</style>

      <div className="maintenance-container">
        {/* Animated Background */}
        <div className="background-animation">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
          <div className="grid-overlay"></div>
        </div>

        {/* Header */}
        <header  className="header">
             <a href='/' className="logo">
                      <div className="logo-icon">
                        <TrendingUp size={16} color="#94A3B8" />
                      </div>
                      CRYPTOWEALTH
                    </a>
          <div className="status-badge">
            <div className="pulse-dot"></div>
            Maintenance in Progress
          </div>
        </header>

        {/* Main Content */}
        <main className="content">
          <div className="content-wrapper">
            {/* Icon */}
            <div className="icon-container">
              <div className="maintenance-icon">
                <div className="icon-glow"></div>
                <Wrench size={56} />
              </div>
            </div>

            {/* Text Content */}
            <div className="text-content">
              <h1 className="title">System Maintenance</h1>
              <p className="subtitle">
                We're upgrading our infrastructure to serve you better. Our platform will be back online shortly with improved performance and enhanced security features.
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="countdown">
              <div className="countdown-item">
                <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="countdown-label">Hours</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="countdown-label">Minutes</div>
              </div>
              <div className="countdown-item">
                <div className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="countdown-label">Seconds</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-section">
              <div className="progress-header">
                <div className="progress-label">Overall Progress</div>
                <div className="progress-percentage">{Math.floor(progress)}%</div>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            {/* Tasks Grid */}
            <div className="tasks-grid">
              {maintenanceTasks.map((task, index) => (
                <div key={index} className="task-card">
                  <div className="task-header">
                    <div className="task-icon" style={{ background: `${task.color}15` }}>
                      <div style={{ color: task.color }}>{task.icon}</div>
                    </div>
                  </div>
                  <div className="task-label">{task.label}</div>
                  <div style={{ marginTop: '12px' }}>
                    <span className={`task-status status-${task.status}`}>
                      {task.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Status Updates */}
            {/* <div className="updates-section">
              <div className="updates-title">
                <Clock size={20} />
                Live Status Updates
              </div>
              <div className="updates-list">
                {statusUpdates.map((update, index) => (
                  <div key={index} className={`update-item ${update.type}`}>
                    <div className="update-time">{update.time}</div>
                    <div className="update-message">{update.message}</div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Footer Actions */}
            {/* <div className="footer-actions">
              <button className="action-button">
                <AlertCircle size={18} />
                Report Issue
              </button>
              <button className="action-button primary">
                <Clock size={18} />
                Get Status Updates
              </button>
            </div> */}
          </div>
        </main>
      </div>
    </>
  );
}