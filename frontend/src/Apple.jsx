// App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Invest from './pages/Invests';
import InvestPage from './pages/Invests';
import HistoryPage from './pages/History';
import MarketPage from './pages/Market';
import CryptoTradingPlatform from './pages/Trade';
import AnalyticsPage from './pages/Analytics';
import Topbar from './components/Topbar';
import CryptoAuthPages from './pages/Auth';
import CryptoLandingPage from './pages/Landing';
import MaintenancePage from './pages/Maintenace';
import RequireAuth from './components/RequireAuth';
import { useEffect, useState } from 'react';
import { getAuthSession, logout } from './utils/session';
import CryptoProfilePage from './pages/Account';
import CryptoPaymentPage from './pages/Payment';
import TopbarSkeleton from './components/Sidebar';






const AppLayout = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1500);
  }, []);
  
  return (
    <>
      {loading ? <TopbarSkeleton /> : <Topbar />}
      <Routes>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/invest" element={<Invest />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/trade" element={<CryptoTradingPlatform />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/account" element={<CryptoProfilePage />} />
        <Route path="/payment" element={<CryptoPaymentPage />} />
      </Routes>
    </>
  );
};


// placeholder pages
const Placeholder = ({ title }) => (
  <div style={{ padding: 40 }}>
    <h2>{title}</h2>
  </div>
);




export default function Apple() {
  useEffect(() => {
  const interval = setInterval(() => {
    const session = getAuthSession();
    if (session === 'expired') {
      logout();
    }
  }, 60_000); // check every minute

  return () => clearInterval(interval);
}, []);
  return (
    <BrowserRouter>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<CryptoLandingPage />} />

          {/* Auth — NO Topbar */}
          <Route path="/auth" element={<CryptoAuthPages />} />
          <Route path="/maintenace" element={<MaintenancePage />} />

          {/* App — WITH Topbar */}
          <Route path="/*" element={<AppLayout />} />
        </Routes>

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
          .app-root {
            min-height: 100vh;
          }
        `}</style>
      </div>
    </BrowserRouter>
  );
}
