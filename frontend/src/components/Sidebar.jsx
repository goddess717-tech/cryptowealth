import { useState, useEffect } from "react";
import { TrendingUp } from 'lucide-react';

export default function TopbarSkeleton() {
  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }

          .skeleton {
            background: linear-gradient(
              90deg,
              rgba(30, 41, 59, 0.4) 0%,
              rgba(51, 65, 85, 0.6) 50%,
              rgba(30, 41, 59, 0.4) 100%
            );
            background-size: 1000px 100%;
            animation: shimmer 2s infinite linear;
            border-radius: 8px;
          }

          .top-nav-skeleton {
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

          .nav-left-skeleton {
            display: flex;
            align-items: center;
            gap: 48px;
          }

          .logo-skeleton {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .logo-icon-skeleton {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          }

          .logo-text-skeleton {
            width: 140px;
            height: 20px;
          }

          .nav-menu-skeleton {
            display: flex;
            gap: 32px;
            align-items: center;
          }

          .nav-item-skeleton {
            width: 60px;
            height: 14px;
          }

          .nav-right-skeleton {
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .search-skeleton {
            width: 200px;
            height: 36px;
          }

          .icon-btn-skeleton {
            width: 36px;
            height: 36px;
            border-radius: 8px;
          }

          .user-profile-skeleton {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 12px 6px 6px;
            background: rgba(30, 41, 59, 0.3);
            border-radius: 8px;
            border: 1px solid rgba(148, 163, 184, 0.08);
          }

          .user-avatar-skeleton {
            width: 28px;
            height: 28px;
            border-radius: 6px;
            background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
          }

          .user-info-skeleton {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .user-name-skeleton {
            width: 80px;
            height: 12px;
          }

          .user-id-skeleton {
            width: 60px;
            height: 10px;
          }

          .mobile-menu-btn-skeleton {
            display: none;
            width: 36px;
            height: 36px;
            border-radius: 8px;
          }

          /* Responsive Design */
          @media (max-width: 1024px) {
            .nav-menu-skeleton {
              display: none;
            }

            .mobile-menu-btn-skeleton {
              display: block;
            }
          }

          @media (max-width: 768px) {
            .top-nav-skeleton {
              padding: 0 16px;
            }

            .search-skeleton {
              display: none;
            }

            .user-info-skeleton {
              display: none;
            }

            .user-profile-skeleton {
              padding: 6px;
            }
          }

          @media (max-width: 480px) {
            .nav-right-skeleton {
              gap: 12px;
            }
          }
        `}
      </style>

      <div className="top-nav-skeleton">
        <div className="nav-left-skeleton">
          <div className="logo-skeleton">
            <div className="logo-icon-skeleton">
              <TrendingUp size={16} color="#94A3B8" />
            </div>
            <div className="logo-text-skeleton skeleton"></div>
          </div>
          
          <div className="nav-menu-skeleton">
            <div className="nav-item-skeleton skeleton"></div>
            <div className="nav-item-skeleton skeleton"></div>
            <div className="nav-item-skeleton skeleton"></div>
            <div className="nav-item-skeleton skeleton"></div>
            <div className="nav-item-skeleton skeleton"></div>
            <div className="nav-item-skeleton skeleton"></div>
            <div className="nav-item-skeleton skeleton"></div>
          </div>
        </div>

        <div className="nav-right-skeleton">
          <div className="search-skeleton skeleton"></div>
          <div className="icon-btn-skeleton skeleton"></div>
          <div className="icon-btn-skeleton skeleton"></div>
          
          <div className="user-profile-skeleton">
            <div className="user-avatar-skeleton"></div>
            <div className="user-info-skeleton">
              <div className="user-name-skeleton skeleton"></div>
              <div className="user-id-skeleton skeleton"></div>
            </div>
          </div>

          <div className="mobile-menu-btn-skeleton skeleton"></div>
        </div>
      </div>
    </>
  );
}

// Usage example with conditional rendering:
/*
import TopbarSkeleton from './TopbarSkeleton';
import Topbar from './Topbar';

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1500);
  }, []);
  
  return (
    <>
      {loading ? <TopbarSkeleton /> : <Topbar />}
    </>
  );
}
*/