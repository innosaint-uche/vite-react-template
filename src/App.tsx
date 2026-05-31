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
import FindLawyer from './pages/customer/FindLawyer';
import Calculator from './pages/customer/Calculator';
import Knowledge from './pages/customer/Knowledge';
import Messages from './pages/customer/Messages';

// Lawyer pages
import LawyerDashboard from './pages/lawyer/Dashboard';
import Earnings from './pages/lawyer/Earnings';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminLawyers from './pages/admin/Lawyers';
import AdminUsers from './pages/admin/Users';
import AdminCases from './pages/admin/Cases';
import AdminPayments from './pages/admin/Payments';
import Analytics from './pages/admin/Analytics';
import AdminContent from './pages/admin/Content';

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
          <Route path="cases/:id" element={<Placeholder title="Case Details" desc="Full case timeline, messages, and documents" />} />
          <Route path="find-lawyer" element={<FindLawyer />} />
          <Route path="messages" element={<Messages />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="notifications" element={<Placeholder title="Notifications" desc="All your alerts, case updates, and messages" />} />
          <Route path="settings" element={<Placeholder title="Account Settings" desc="Profile, security, preferences, and notifications" />} />
        </Route>

        {/* Lawyer */}
        <Route path="/lawyer" element={<ProtectedRoute allowedRole="lawyer"><AppLayout /></ProtectedRoute>}>
          <Route index element={<LawyerDashboard />} />
          <Route path="cases" element={<Cases />} />
          <Route path="cases/:id" element={<Placeholder title="Case Details" />} />
          <Route path="schedule" element={<Placeholder title="Schedule" desc="Manage your availability and appointments" />} />
          <Route path="messages" element={<Messages />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="profile" element={<Placeholder title="My Profile" desc="Update your profile, specializations and bio" />} />
          <Route path="notifications" element={<Placeholder title="Notifications" />} />
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
          <Route path="notifications" element={<Placeholder title="Admin Notifications" />} />
          <Route path="settings" element={<Placeholder title="Platform Settings" desc="OAuth, API keys, NAICOM config, email/SMS" />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
