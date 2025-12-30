import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, Bell, Key, Globe, CreditCard, Download, Upload, Camera, Check, X, Edit2, Save, TrendingUp, Award, Calendar, Activity } from 'lucide-react';

export default function CryptoProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const user = JSON.parse(localStorage.getItem('auth_user'));
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    trading: true,
    security: true,
    newsletter: false
  });
  

  const [profileData, setProfileData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: '+1 (269) 257-8015',
    location: 'San Francisco, CA',
    memberSince: 'January 2023',
    accountType: 'Professional',
    totalInvested: 1847293.42,
    portfolioValue: 2156847.91,
    totalReturn: 309554.49,
    returnPercentage: 16.76,
    activeDays: 642,
    tradesCompleted: 1847
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const recentActivity = [
    { date: 'Dec 24, 2025', action: 'Portfolio value milestone reached', detail: '$2M+ achieved', type: 'milestone' },
    { date: 'Dec 23, 2025', action: 'Security settings updated', detail: '2FA enabled', type: 'security' },
    { date: 'Dec 22, 2025', action: 'Large deposit processed', detail: '+$323,284 BTC', type: 'transaction' },
    { date: 'Dec 21, 2025', action: 'Profile information updated', detail: 'Contact details', type: 'profile' },
    { date: 'Dec 20, 2025', action: 'API key generated', detail: 'Trading automation', type: 'security' }
  ];

  const achievements = [
    { icon: <Award size={24} />, title: 'Early Adopter', description: 'Member since 2023', color: '#F59E0B' },
    { icon: <TrendingUp size={24} />, title: 'Top Performer', description: '16%+ annual return', color: '#10B981' },
    { icon: <Activity size={24} />, title: 'Active Trader', description: '1800+ trades', color: '#3B82F6' },
    { icon: <Shield size={24} />, title: 'Security Pro', description: 'All protections enabled', color: '#8B5CF6' }
  ];

  const connectedAccounts = [
    { name: 'Coinbase Pro', status: 'connected', lastSync: '2 hours ago', icon: '₿' },
    { name: 'Binance', status: 'connected', lastSync: '5 hours ago', icon: 'B' },
    { name: 'Kraken', status: 'disconnected', lastSync: 'Never', icon: 'K' }
  ];

const initials =
  profileData?.fullName
    ?.trim()
    .split(/\s+/)
    .map(part => part[0].toUpperCase())
    .join("") ?? "";



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
        }

        .profile-container {
          min-height: 100vh;
          background: #0A0E1A;
        }

        /* Header */
        .profile-header {
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

        .logo {
          font-size: 15px;
          font-weight: 600;
          color: #94A3B8;
          letter-spacing: 0.05em;
        }

        .header-actions {
          display: flex;
          gap: 12px;
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

        /* Main Layout */
        .profile-main {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 32px;
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 32px;
        }

        /* Sidebar */
        .profile-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .profile-card {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.06);
          border-radius: 16px;
          padding: 32px;
          text-align: center;
        }

        .avatar-container {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 20px;
        }

        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid rgba(59, 130, 246, 0.2);
          position: relative;
          overflow: hidden;
        }

        .avatar-text {
          font-size: 48px;
          font-weight: 700;
          color: white;
        }

        .avatar-upload {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #3B82F6;
          border: 3px solid #0A0E1A;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .avatar-upload:hover {
          transform: scale(1.1);
          background: #2563EB;
        }

        .profile-name {
          font-size: 24px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 4px;
        }

        .profile-type {
          display: inline-block;
          padding: 6px 12px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 20px;
          color: #60A5FA;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 20px;
        }

        .profile-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          padding-top: 20px;
          border-top: 1px solid rgba(148, 163, 184, 0.06);
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #F8FAFC;
          margin-bottom: 4px;
        }

        .stat-value.positive {
          color: #10B981;
        }

        .stat-label {
          font-size: 11px;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .nav-card {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.06);
          border-radius: 16px;
          padding: 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 10px;
          color: #94A3B8;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 4px;
        }

        .nav-item:last-child {
          margin-bottom: 0;
        }

        .nav-item:hover {
          background: rgba(30, 41, 59, 0.4);
          color: #E2E8F0;
        }

        .nav-item.active {
          background: rgba(59, 130, 246, 0.1);
          color: #60A5FA;
        }

        .achievements-card {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.06);
          border-radius: 16px;
          padding: 24px;
        }

        .achievements-title {
          font-size: 16px;
          font-weight: 600;
          color: #F8FAFC;
          margin-bottom: 20px;
        }

        .achievement-item {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.06);
        }

        .achievement-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .achievement-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .achievement-content {
          flex: 1;
        }

        .achievement-name {
          font-size: 14px;
          font-weight: 600;
          color: #E2E8F0;
          margin-bottom: 2px;
        }

        .achievement-desc {
          font-size: 12px;
          color: #64748B;
        }

        /* Content Area */
        .profile-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .content-card {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.06);
          border-radius: 16px;
          padding: 32px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .card-title {
          font-size: 20px;
          font-weight: 600;
          color: #F8FAFC;
        }

        .edit-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 8px;
          color: #60A5FA;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .edit-btn:hover {
          background: rgba(59, 130, 246, 0.15);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
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
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .form-input {
          padding: 12px 16px;
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 8px;
          color: #E2E8F0;
          font-size: 14px;
          transition: all 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: rgba(59, 130, 246, 0.4);
          background: rgba(30, 41, 59, 0.6);
        }

        .form-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .form-value {
          padding: 12px 16px;
          background: rgba(30, 41, 59, 0.2);
          border: 1px solid rgba(148, 163, 184, 0.06);
          border-radius: 8px;
          color: #E2E8F0;
          font-size: 14px;
        }

        /* Security Section */
        .security-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          border-bottom: 1px solid rgba(148, 163, 184, 0.06);
        }

        .security-item:last-child {
          border-bottom: none;
        }

        .security-info {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .security-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(59, 130, 246, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #60A5FA;
        }

        .security-details h3 {
          font-size: 15px;
          font-weight: 600;
          color: #E2E8F0;
          margin-bottom: 4px;
        }

        .security-details p {
          font-size: 13px;
          color: #64748B;
        }

        .toggle-switch {
          position: relative;
          width: 48px;
          height: 26px;
          background: rgba(30, 41, 59, 0.6);
          border-radius: 13px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .toggle-switch.active {
          background: #3B82F6;
        }

        .toggle-slider {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          transition: all 0.3s;
        }

        .toggle-switch.active .toggle-slider {
          transform: translateX(22px);
        }

        /* Notifications */
        .notification-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid rgba(148, 163, 184, 0.06);
        }

        .notification-item:last-child {
          border-bottom: none;
        }

        .notification-label {
          font-size: 14px;
          font-weight: 500;
          color: #E2E8F0;
          margin-bottom: 4px;
        }

        .notification-desc {
          font-size: 12px;
          color: #64748B;
        }

        /* Activity */
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .activity-item {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: rgba(30, 41, 59, 0.3);
          border-radius: 10px;
          border-left: 3px solid;
          transition: all 0.2s;
        }

        .activity-item:hover {
          background: rgba(30, 41, 59, 0.5);
        }

        .activity-item.milestone { border-left-color: #F59E0B; }
        .activity-item.security { border-left-color: #8B5CF6; }
        .activity-item.transaction { border-left-color: #10B981; }
        .activity-item.profile { border-left-color: #3B82F6; }

        .activity-date {
          font-size: 12px;
          color: #64748B;
          min-width: 100px;
        }

        .activity-details {
          flex: 1;
        }

        .activity-action {
          font-size: 14px;
          font-weight: 500;
          color: #E2E8F0;
          margin-bottom: 4px;
        }

        .activity-detail {
          font-size: 13px;
          color: #64748B;
        }

        /* Connected Accounts */
        .connected-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .connected-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: rgba(30, 41, 59, 0.3);
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.06);
        }

        .connected-info {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .connected-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
          font-weight: 700;
        }

        .connected-details h3 {
          font-size: 15px;
          font-weight: 600;
          color: #E2E8F0;
          margin-bottom: 4px;
        }

        .connected-status {
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .status-dot.connected {
          background: #10B981;
        }

        .status-dot.disconnected {
          background: #64748B;
        }

        .connect-btn {
          padding: 8px 16px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 8px;
          color: #60A5FA;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .connect-btn:hover {
          background: rgba(59, 130, 246, 0.15);
        }

        .disconnect-btn {
          padding: 8px 16px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 8px;
          color: #EF4444;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        @media (max-width: 1024px) {
          .profile-main {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="profile-container">
        {/* Header */}

        {/* Main Content */}
        <div className="profile-main">
          {/* Sidebar */}
          <aside className="profile-sidebar">
            {/* Profile Card */}
            <div className="profile-card">
              <div className="avatar-container">
                <div className="avatar">
                  <div className="avatar-text">{initials}</div>
                </div>
                <div className="avatar-upload">
                  <Camera size={18} color="white" />
                </div>
              </div>
              <h2 className="profile-name">{profileData.fullName}</h2>
              <span className="profile-type">{profileData.accountType}</span>
              <div className="profile-stats">
                <div className="stat-item">
                  <div className="stat-value positive">+{profileData.returnPercentage}%</div>
                  <div className="stat-label">Total Return</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{profileData.activeDays}</div>
                  <div className="stat-label">Active Days</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="nav-card">
              <div 
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={18} />
                Profile Information
              </div>
              <div 
                className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <Shield size={18} />
                Security Settings
              </div>
              <div 
                className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell size={18} />
                Notifications
              </div>
              <div 
                className={`nav-item ${activeTab === 'connected' ? 'active' : ''}`}
                onClick={() => setActiveTab('connected')}
              >
                <Globe size={18} />
                Connected Accounts
              </div>
              <div 
                className={`nav-item ${activeTab === 'activity' ? 'active' : ''}`}
                onClick={() => setActiveTab('activity')}
              >
                <Activity size={18} />
                Activity Log
              </div>
            </div>

            {/* Achievements */}
            <div className="achievements-card">
              <h3 className="achievements-title">Achievements</h3>
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <div 
                    className="achievement-icon" 
                    style={{ background: `${achievement.color}20`, color: achievement.color }}
                  >
                    {achievement.icon}
                  </div>
                  <div className="achievement-content">
                    <div className="achievement-name">{achievement.title}</div>
                    <div className="achievement-desc">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Content */}
          <main className="profile-content">
            {activeTab === 'profile' && (
              <div className="content-card">
                <div className="card-header">
                  <h2 className="card-title">Personal Information</h2>
                  <button className="edit-btn" onClick={() => setEditMode(!editMode)}>
                    {editMode ? <><Save size={16} /> Save Changes</> : <><Edit2 size={16} /> Edit Profile</>}
                  </button>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      <User size={16} />
                      Full Name
                    </label>
                    {editMode ? (
                      <input 
                        className="form-input" 
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                      />
                    ) : (
                      <div className="form-value">{profileData.fullName}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <Mail size={16} />
                      Email Address
                    </label>
                    {editMode ? (
                      <input 
                        className="form-input" 
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    ) : (
                      <div className="form-value">{profileData.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <Phone size={16} />
                      Phone Number
                    </label>
                    {editMode ? (
                      <input 
                        className="form-input" 
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    ) : (
                      <div className="form-value">{profileData.phone}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <MapPin size={16} />
                      Location
                    </label>
                    {editMode ? (
                      <input 
                        className="form-input" 
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      />
                    ) : (
                      <div className="form-value">{profileData.location}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <Calendar size={16} />
                      Member Since
                    </label>
                    <div className="form-value">{profileData.memberSince}</div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <CreditCard size={16} />
                      Account Type
                    </label>
                    <div className="form-value">{profileData.accountType}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="content-card">
                <div className="card-header">
                  <h2 className="card-title">Security Settings</h2>
                </div>
                <div className="security-item">
                  <div className="security-info">
                    <div className="security-icon">
                      <Key size={20} />
                    </div>
                    <div className="security-details">
                      <h3>Two-Factor Authentication</h3>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  <div 
                    className={`toggle-switch ${twoFactorEnabled ? 'active' : ''}`}
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  >
                    <div className="toggle-slider"></div>
                  </div>
                </div>
                <div className="security-item">
                  <div className="security-info">
                    <div className="security-icon">
                      <Shield size={20} />
                    </div>
                    <div className="security-details">
                      <h3>Biometric Authentication</h3>
                      <p>Use fingerprint or face ID to sign in</p>
                    </div>
                  </div>
                  <div 
                    className={`toggle-switch ${biometricEnabled ? 'active' : ''}`}
                    onClick={() => setBiometricEnabled(!biometricEnabled)}
                  >
                    <div className="toggle-slider"></div>
                  </div>
                </div>
                <div className="security-item">
                  <div className="security-info">
                    <div className="security-icon">
                      <Key size={20} />
                    </div>
                    <div className="security-details">
                      <h3>Change Password</h3>
                      <p>Update your password regularly for security</p>
                    </div>
                  </div>
                  <button className="edit-btn">Update</button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="content-card">
                <div className="card-header">
                  <h2 className="card-title">Notification Preferences</h2>
                </div>
                <div className="notification-item">
                  <div>
                    <div className="notification-label">Email Notifications</div>
                    <div className="notification-desc">Receive updates via email</div>
                  </div>
                  <div 
                    className={`toggle-switch ${notifications.email ? 'active' : ''}`}
                    onClick={() => handleNotificationToggle('email')}
                  >
                    <div className="toggle-slider"></div>
                  </div>
                </div>
                <div className="notification-item">
                  <div>
                    <div className="notification-label">Push Notifications</div>
                    <div className="notification-desc">Receive push notifications on your device</div>
                  </div>
                  <div 
                    className={`toggle-switch ${notifications.push ? 'active' : ''}`}
                    onClick={() => handleNotificationToggle('push')}
                  >
                    <div className="toggle-slider"></div>
                  </div>
                </div>
                <div className="notification-item">
                  <div>
                    <div className="notification-label">SMS Notifications</div>
                    <div className="notification-desc">Receive important alerts via text message</div>
                  </div>
                  <div 
                    className={`toggle-switch ${notifications.sms ? 'active' : ''}`}
                    onClick={() => handleNotificationToggle('sms')}
                  >
                    <div className="toggle-slider"></div>
                  </div>
                </div>
                <div className="notification-item">
                  <div>
                    <div className="notification-label">Trading Alerts</div>
                    <div className="notification-desc">Get notified about price changes and trade executions</div>
                  </div>
                  <div 
                    className={`toggle-switch ${notifications.trading ? 'active' : ''}`}
                    onClick={() => handleNotificationToggle('trading')}
                  >
                    <div className="toggle-slider"></div>
                  </div>
                </div>
                <div className="notification-item">
                  <div>
                    <div className="notification-label">Security Alerts</div>
                    <div className="notification-desc">Important security and account activity notifications</div>
                  </div>
                  <div 
                    className={`toggle-switch ${notifications.security ? 'active' : ''}`}
                    onClick={() => handleNotificationToggle('security')}
                  >
                    <div className="toggle-slider"></div>
                  </div>
                </div>
                <div className="notification-item">
                  <div>
                    <div className="notification-label">Newsletter</div>
                    <div className="notification-desc">Receive market insights and platform updates</div>
                  </div>
                  <div 
                    className={`toggle-switch ${notifications.newsletter ? 'active' : ''}`}
                    onClick={() => handleNotificationToggle('newsletter')}
                  >
                    <div className="toggle-slider"></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'connected' && (
              <div className="content-card">
                <div className="card-header">
                  <h2 className="card-title">Connected Accounts</h2>
                </div>
                <div className="connected-list">
                  {connectedAccounts.map((account, index) => (
                    <div key={index} className="connected-item">
                      <div className="connected-info">
                        <div className="connected-icon">{account.icon}</div>
                        <div className="connected-details">
                          <h3>{account.name}</h3>
                          <div className="connected-status">
                            <div className={`status-dot ${account.status}`}></div>
                            <span style={{ color: account.status === 'connected' ? '#10B981' : '#64748B' }}>
                              {account.status === 'connected' ? 'Connected' : 'Disconnected'}
                            </span>
                            <span style={{ color: '#64748B', marginLeft: '8px' }}>• Last sync: {account.lastSync}</span>
                          </div>
                        </div>
                      </div>
                      {account.status === 'connected' ? (
                        <button className="disconnect-btn">Disconnect</button>
                      ) : (
                        <button className="connect-btn">Connect</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="content-card">
                <div className="card-header">
                  <h2 className="card-title">Recent Activity</h2>
                </div>
                <div className="activity-list">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className={`activity-item ${activity.type}`}>
                      <div className="activity-date">{activity.date}</div>
                      <div className="activity-details">
                        <div className="activity-action">{activity.action}</div>
                        <div className="activity-detail">{activity.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Portfolio Overview Card */}
            <div className="content-card">
              <div className="card-header">
                <h2 className="card-title">Portfolio Overview</h2>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <TrendingUp size={16} />
                    Total Invested
                  </label>
                  <div className="form-value" style={{ fontSize: '20px', fontWeight: 600, color: '#E2E8F0' }}>
                    ${profileData.totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <Activity size={16} />
                    Current Value
                  </label>
                  <div className="form-value" style={{ fontSize: '20px', fontWeight: 600, color: '#E2E8F0' }}>
                    ${profileData.portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <TrendingUp size={16} />
                    Total Return
                  </label>
                  <div className="form-value" style={{ fontSize: '20px', fontWeight: 600, color: '#10B981' }}>
                    +${profileData.totalReturn.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <Award size={16} />
                    Total Trades
                  </label>
                  <div className="form-value" style={{ fontSize: '20px', fontWeight: 600, color: '#E2E8F0' }}>
                    {profileData.tradesCompleted.toLocaleString('en-US')}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}