import { useState, useEffect, useRef } from "react";
import { Bell, Settings, User, Search, TrendingUp, Menu, X, Check, CheckCheck, Trash2, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Shield } from 'lucide-react';
import { logout } from "../utils/session";
import { useUnlock } from "../UnlockContext";


export default function Topbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([
      {
        id: 1,
        type: 'trade',
        title: 'Trade Executed',
        message: 'Your limit order for 0.5 BTC at $98,500 has been filled',
        time: '2 minutes ago',
        read: false,
        icon: Activity,
        color: '#3B82F6'
      },
      {
        id: 2,
        type: 'deposit',
        title: 'Deposit Confirmed',
        message: '$50,000 USDT deposit has been credited to your account',
        time: '1 hour ago',
        read: false,
        icon: DollarSign,
        color: '#10B981'
      },
      {
        id: 3,
        type: 'price',
        title: 'Price Alert',
        message: 'Bitcoin has reached your target price of $98,000',
        time: '3 hours ago',
        read: true,
        icon: TrendingUp,
        color: '#F59E0B'
      },
      {
        id: 4,
        type: 'security',
        title: 'Security Alert',
        message: 'New login from Chrome on Windows detected',
        time: '5 hours ago',
        read: true,
        icon: Shield,
        color: '#EF4444'
      },
      {
        id: 5,
        type: 'profit',
        title: 'Investment Matured',
        message: 'Your Ethereum Growth package has completed. +$1,847.23 earned',
        time: '1 day ago',
        read: true,
        icon: ArrowUpRight,
        color: '#10B981'
      },
      {
        id: 6,
        type: 'reward',
        title: 'Staking Reward',
        message: 'You earned 0.0234 ETH in staking rewards',
        time: '2 days ago',
        read: true,
        icon: Activity,
        color: '#8B5CF6'
      }
    ]);


    const notificationRef = useRef(null);
    const pathname = window.location.pathname;

    const [userMenuOpen, setUserMenuOpen] = useState(false);
const userMenuRef = useRef(null);
const {openUnlock} = useUnlock();

useEffect(() => {
  const handleClickOutside = (e) => {
    if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
      setUserMenuOpen(false);
    }
  };

  if (userMenuOpen) {
    document.addEventListener('mousedown', handleClickOutside);
  }

  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [userMenuOpen]);


    // Close notifications when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
          setNotificationsOpen(false);
        }
      };

      if (notificationsOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [notificationsOpen]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
    };

    const markAllAsRead = () => {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id) => {
      setNotifications(notifications.filter(n => n.id !== id));
    };

    const clearAll = () => {
      setNotifications([]);
      setNotificationsOpen(false);
    };

  return (
    <>
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          /* Top Navigation */
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
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 20px;
          font-weight: 700;
          background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
          text-decoration: none;
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

          .nav-menu {
            display: flex;
            gap: 32px;
            align-items: center;
          }

          .nav-item {
            color: #64748B;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
          }

          .nav-item:hover,
          .nav-item.active {
            color: #E2E8F0;
          }

          .nav-right {
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .mobile-menu-btn {
            display: none;
            width: 36px;
            height: 36px;
            border-radius: 8px;
            background: rgba(30, 41, 59, 0.3);
            border: 1px solid rgba(148, 163, 184, 0.08);
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
          }

          .mobile-menu-btn:hover {
            background: rgba(30, 41, 59, 0.5);
          }

          .mobile-menu {
            position: fixed;
            top: 0;
            left: -100%;
            width: 280px;
            height: 100vh;
            background: #0A0E1A;
            border-right: 1px solid rgba(148, 163, 184, 0.08);
            z-index: 200;
            transition: left 0.3s ease;
            overflow-y: auto;
          }

          .mobile-menu.open {
            left: 0;
          }

          .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            z-index: 199;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
          }

          .mobile-menu-overlay.show {
            opacity: 1;
            pointer-events: all;
          }

          .mobile-menu-header {
            padding: 20px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.08);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .mobile-menu-close {
            width: 36px;
            height: 36px;
            border-radius: 8px;
            background: rgba(30, 41, 59, 0.3);
            border: 1px solid rgba(148, 163, 184, 0.08);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .mobile-menu-items {
            padding: 20px;
          }

          .mobile-menu-item {
            padding: 12px 16px;
            color: #64748B;
            font-size: 13px;
            font-weight: 500;
            border-radius: 8px;
            margin-bottom: 4px;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
            display: block;
          }

          .mobile-menu-item:hover,
          .mobile-menu-item.active {
            background: rgba(59, 130, 246, 0.1);
            color: #3B82F6;
          }

          .search-box {
            position: relative;
            width: 200px;
          }

          .search-input {
            width: 100%;
            background: rgba(15, 23, 42, 0.4);
            border: 1px solid rgba(148, 163, 184, 0.08);
            border-radius: 8px;
            padding: 8px 12px 8px 36px;
            color: #E2E8F0;
            font-size: 13px;
            outline: none;
            transition: all 0.2s;
          }

          .search-input:focus {
            border-color: rgba(59, 130, 246, 0.3);
            background: rgba(15, 23, 42, 0.6);
          }

          .search-input::placeholder {
            color: #64748B;
          }

          .search-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #64748B;
            pointer-events: none;
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
            position: relative;
          }

          .icon-btn:hover {
            background: rgba(30, 41, 59, 0.5);
          }

          .notification-badge {
            position: absolute;
            top: 4px;
            right: 4px;
            min-width: 18px;
            height: 18px;
            background: #EF4444;
            border-radius: 10px;
            border: 2px solid #0A0E1A;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: 600;
            color: white;
            padding: 0 4px;
          }

          .user-profile {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 12px 6px 6px;
            background: rgba(30, 41, 59, 0.3);
            border-radius: 8px;
            border: 1px solid rgba(148, 163, 184, 0.08);
            cursor: pointer;
            transition: all 0.2s;
          }

          .user-profile:hover {
            background: rgba(30, 41, 59, 0.5);
          }

          .user-avatar {
            width: 28px;
            height: 28px;
            border-radius: 6px;
            background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .user-info {
            display: flex;
            flex-direction: column;
          }

          .user-name {
            font-size: 12px;
            font-weight: 600;
            color: #E2E8F0;
            line-height: 1.2;
          }

          .user-id {
            font-size: 10px;
            color: #64748B;
            line-height: 1.2;
          }

          /* Notifications Panel */
          .notifications-panel {
            position: absolute;
            top: calc(100% + 8px);
            right: 0;
            width: 420px;
            max-height: 600px;
            background: rgba(15, 23, 42, 0.98);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(148, 163, 184, 0.12);
            border-radius: 12px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
            opacity: 0;
            pointer-events: none;
            transform: translateY(-10px);
            transition: all 0.2s;
            overflow: hidden;
            z-index: 1000;
          }

          .notifications-panel.open {
            opacity: 1;
            pointer-events: all;
            transform: translateY(0);
          }

          .notifications-header {
            padding: 20px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.08);
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .notifications-title {
            font-size: 16px;
            font-weight: 600;
            color: #F8FAFC;
          }

          .notifications-actions {
            display: flex;
            gap: 8px;
          }

          .notification-action-btn {
            padding: 4px 10px;
            font-size: 11px;
            font-weight: 500;
            color: #64748B;
            background: transparent;
            border: 1px solid rgba(148, 163, 184, 0.08);
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
          }

          .notification-action-btn:hover {
            background: rgba(59, 130, 246, 0.1);
            color: #3B82F6;
            border-color: rgba(59, 130, 246, 0.2);
          }

          .notifications-list {
            max-height: 480px;
            overflow-y: auto;
          }

          .notifications-list::-webkit-scrollbar {
            width: 6px;
          }

          .notifications-list::-webkit-scrollbar-track {
            background: rgba(15, 23, 42, 0.4);
          }

          .notifications-list::-webkit-scrollbar-thumb {
            background: rgba(148, 163, 184, 0.2);
            border-radius: 3px;
          }

          .notifications-list::-webkit-scrollbar-thumb:hover {
            background: rgba(148, 163, 184, 0.3);
          }

          .notification-item {
            padding: 16px 20px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.04);
            cursor: pointer;
            transition: all 0.2s;
            position: relative;
          }

          .notification-item:hover {
            background: rgba(30, 41, 59, 0.3);
          }

          .notification-item.unread {
            background: rgba(59, 130, 246, 0.05);
          }

          .notification-item.unread::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background: #3B82F6;
          }

          .notification-content {
            display: flex;
            gap: 12px;
          }

          .notification-icon {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .notification-details {
            flex: 1;
            min-width: 0;
          }

          .notification-title {
            font-size: 13px;
            font-weight: 600;
            color: #F8FAFC;
            margin-bottom: 4px;
          }

          .notification-message {
            font-size: 12px;
            color: #94A3B8;
            line-height: 1.5;
            margin-bottom: 6px;
          }

          .notification-time {
            font-size: 11px;
            color: #64748B;
          }

          .notification-actions {
            display: flex;
            gap: 8px;
            margin-top: 8px;
          }

          .notification-btn {
            padding: 4px;
            background: rgba(30, 41, 59, 0.5);
            border: 1px solid rgba(148, 163, 184, 0.08);
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .notification-btn:hover {
            background: rgba(30, 41, 59, 0.8);
            border-color: rgba(148, 163, 184, 0.15);
          }

          .notification-btn.delete:hover {
            background: rgba(239, 68, 68, 0.1);
            border-color: rgba(239, 68, 68, 0.3);
          }

          .empty-notifications {
            padding: 60px 20px;
            text-align: center;
          }

          .empty-icon {
            width: 60px;
            height: 60px;
            margin: 0 auto 16px;
            border-radius: 12px;
            background: rgba(59, 130, 246, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .empty-text {
            font-size: 14px;
            color: #64748B;
          }

          /* Responsive Design - Tablet */
          @media (max-width: 1024px) {
            .nav-menu {
              display: none;
            }

            .mobile-menu-btn {
              display: flex;
            }

            .notifications-panel {
              width: 380px;
            }
          }

          /* Responsive Design - Mobile */
          @media (max-width: 768px) {
            .top-nav {
              padding: 0 16px;
            }

            .search-box {
              display: none;
            }

            .user-info {
              display: none;
            }

            .user-profile {
              padding: 6px;
            }

            .notifications-panel {
              width: calc(100vw - 32px);
              max-width: 380px;
            }
          }

          /* Responsive Design - Small Mobile */
          @media (max-width: 480px) {
            .nav-right {
              gap: 12px;
            }

            .notifications-panel {
              right: -8px;
              width: calc(100vw - 16px);
            }
          }

          .user-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 200px;
  background: rgba(15, 23, 42, 0.98);
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 10px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.5);
  opacity: 0;
  pointer-events: none;
  transform: translateY(-8px);
  transition: all 0.2s ease;
  z-index: 1000;
}

.user-menu.open {
  opacity: 1;
  pointer-events: all;
  transform: translateY(0);
}

.user-menu-item {
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #CBD5F5;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
}

.user-menu-item:hover {
  background: rgba(59,130,246,0.1);
  color: #3B82F6;
}

.user-menu-item.danger {
  color: #F87171;
}

.user-menu-item.danger:hover {
  background: rgba(239,68,68,0.1);
}

        `}
      </style> 

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'show' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="logo">
            <div className="logo-icon">
              <TrendingUp size={16} color="#94A3B8" />
            </div>
            CRYPTOWEALTH
          </div>
          <div className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
            <X size={16} color="#64748B" />
          </div>
        </div>
        <div className="mobile-menu-items">
          <a href={'/dashboard'} className={`mobile-menu-item ${pathname === '/' ? 'active' : ''}`}>
            Portfolio
          </a>
          <a href={'/invest'} className={`mobile-menu-item ${pathname === '/invest' ? 'active' : ''}`}>
            Invest
          </a>
          <a href={'/payment'} className={`mobile-menu-item ${pathname === '/payment' ? 'active' : ''}`}>
            Payment
          </a>
          <a href={'/history'} className={`mobile-menu-item ${pathname === '/history' ? 'active' : ''}`}>
            History
          </a>
            <a href={'/market'} className={`mobile-menu-item ${pathname === '/market' ? 'active' : ''}`}>
            Markets
          </a>
          <a href={'/trade'} className={`mobile-menu-item ${pathname === '/trade' ? 'active' : ''}`}>
            Trading
          </a>
          <a href={'/analytics'} className={`mobile-menu-item ${pathname === '/analytics' ? 'active' : ''}`}>
            Analytics
          </a>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="top-nav">
        <div className="nav-left">
          <a href={'/dashboard'} className="logo">
            <div className="logo-icon">
              <TrendingUp size={16} color="#94A3B8" />
            </div>
            CRYPTOWEALTH
          </a>
          <div className="nav-menu">
            <a href={'/dashboard'} className={`nav-item ${pathname === '/dashboard' ? 'active' : ''}`}>
              Portfolio
            </a>
            <a href={'/invest'} className={`nav-item ${pathname === '/invest' ? 'active' : ''}`}>
              Invest
            </a>
            <a href={'/payment'} className={`nav-item ${pathname === '/payment' ? 'active' : ''}`}>
              Payment
            </a>
            <a href={'/history'} className={`nav-item ${pathname === '/history' ? 'active' : ''}`}>
              History
            </a>
            <a href={'/market'} className={`nav-item ${pathname === '/market' ? 'active' : ''}`}>
              Markets
            </a>
            <a href={'/trade'} className={`nav-item ${pathname === '/trade' ? 'active' : ''}`}>
              Trading
            </a>
            <a href={'/analytics'} className={`nav-item ${pathname === '/analytics' ? 'active' : ''}`}>
              Analytics
            </a>
            
          </div>
        </div>
        <div className="nav-right">
          {/* <div className="search-box">
            <Search size={14} className="search-icon" />
            <input className="search-input" placeholder="Search assets..." />
          </div> */}
          
          {/* <div style={{ position: 'relative' }} ref={notificationRef}> */}
            {/* <div 
              className="icon-btn" 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell size={16} color="#64748B" />
              {unreadCount > 0 && (
                <div className="notification-badge">{unreadCount}</div>
              )}
            </div> */}

            {/* Notifications Panel */}
            {/* <div className={`notifications-panel ${notificationsOpen ? 'open' : ''}`}>
              <div className="notifications-header">
                <h3 className="notifications-title">Notifications</h3>
                <div className="notifications-actions">
                  {unreadCount > 0 && (
                    <button className="notification-action-btn" onClick={markAllAsRead}>
                      Mark all read
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button className="notification-action-btn" onClick={clearAll}>
                      Clear all
                    </button>
                  )}
                </div>
              </div>

              <div className="notifications-list">
                {notifications.length === 0 ? (
                  <div className="empty-notifications">
                    <div className="empty-icon">
                      <Bell size={28} color="#3B82F6" />
                    </div>
                    <div className="empty-text">No notifications</div>
                  </div>
                ) : (
                  notifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${!notification.read ? 'unread' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="notification-content">
                          <div 
                            className="notification-icon" 
                            style={{ 
                              backgroundColor: `${notification.color}15`,
                              border: `1px solid ${notification.color}30`
                            }}
                          >
                            <Icon size={18} color={notification.color} />
                          </div>
                          <div className="notification-details">
                            <div className="notification-title">{notification.title}</div>
                            <div className="notification-message">{notification.message}</div>
                            <div className="notification-time">{notification.time}</div>
                            <div className="notification-actions">
                              {!notification.read && (
                                <button 
                                  className="notification-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                  title="Mark as read"
                                >
                                  <Check size={14} color="#64748B" />
                                </button>
                              )}
                              <button 
                                className="notification-btn delete"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                title="Delete"
                              >
                                <Trash2 size={14} color="#64748B" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div> */}
          {/* </div> */}

          {/* <div className="icon-btn">
            <Settings size={16} color="#64748B" />
          </div> */}
          
          <div ref={userMenuRef} style={{ position: 'relative' }}>
  <div
    className="user-profile"
    onClick={() => setUserMenuOpen(!userMenuOpen)}
  >
    <div className="user-avatar">
      <User size={14} color="white" />
    </div>
    {/* <div className="user-info">
      <div className="user-name">S. Harmany</div>
      <div className="user-id">#AV-8429</div>
    </div> */}
  </div>

  <div className={`user-menu ${userMenuOpen ? 'open' : ''}`}>
    <a href="/account" className="user-menu-item text-decoration-none">
      Account
    </a>
    {/* <button className="user-menu-item">
      Security
    </button> */}
    <button className="user-menu-item danger" onClick={logout}>
      Log out
    </button>
  </div>
</div>

                              <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
                                <Menu size={18} color="#64748B" />
                              </div>
                              
        </div>
      </div>
    </>
  );
}