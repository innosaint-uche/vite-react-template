import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';

import Landing from './pages/public/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AppLayout from './components/layout/AppLayout';

// Customer pages
import CustomerDashboard from './pages/customer/Dashboard';
import Insurance from './pages/customer/Insurance';
import Immediate from './pages/customer/Immediate';
import Cases from './pages/customer/Cases';
import CaseDetail from './pages/customer/CaseDetail';
import FindLawyer from './pages/customer/FindLawyer';
import Calculator from './pages/customer/Calculator';
import Knowledge from './pages/customer/Knowledge';
import Messages from './pages/customer/Messages';
import Notifications from './pages/customer/Notifications';
import CustomerSettings from './pages/customer/Settings';
import AskLegali from './pages/customer/AskLegali';

// Lawyer pages
import LawyerDashboard from './pages/lawyer/Dashboard';
import Earnings from './pages/lawyer/Earnings';
import LawyerProfile from './pages/lawyer/Profile';
import Schedule from './pages/lawyer/Schedule';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminLawyers from './pages/admin/Lawyers';
import AdminUsers from './pages/admin/Users';
import AdminCases from './pages/admin/Cases';
import AdminPayments from './pages/admin/Payments';
import Analytics from './pages/admin/Analytics';
import AdminContent from './pages/admin/Content';
import AdminSettings from './pages/admin/Settings';

import Placeholder from './pages/Placeholder';

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole?: string }) {
  const { isAuthenticated, role } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRole && role !== allowedRole) return <Navigate to={`/${role}`} replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ style: { borderRadius: 12, fontSize: 13 } }} />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/find-lawyer" element={<FindLawyer />} />

        {/* Customer */}
        <Route path="/customer" element={<ProtectedRoute allowedRole="customer"><AppLayout /></ProtectedRoute>}>
          <Route index element={<CustomerDashboard />} />
          <Route path="insurance" element={<Insurance />} />
          <Route path="immediate" element={<Immediate />} />
          <Route path="cases" element={<Cases />} />
          <Route path="cases/:id" element={<CaseDetail />} />
          <Route path="find-lawyer" element={<FindLawyer />} />
          <Route path="messages" element={<Messages />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="ask-legali" element={<AskLegali />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<CustomerSettings />} />
        </Route>

        {/* Lawyer */}
        <Route path="/lawyer" element={<ProtectedRoute allowedRole="lawyer"><AppLayout /></ProtectedRoute>}>
          <Route index element={<LawyerDashboard />} />
          <Route path="cases" element={<Cases />} />
          <Route path="cases/:id" element={<CaseDetail />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="messages" element={<Messages />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="profile" element={<LawyerProfile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Placeholder title="Settings" />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AppLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="lawyers" element={<AdminLawyers />} />
          <Route path="cases" element={<AdminCases />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
