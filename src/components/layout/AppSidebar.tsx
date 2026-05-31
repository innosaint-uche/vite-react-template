import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, FileText, Users, CreditCard, BookOpen, MapPin, Bell, Settings, LogOut, Shield, BarChart2, CheckSquare, Briefcase, UserCheck, MessageSquare, PieChart, DollarSign, Gavel, ChevronLeft, Sparkles } from 'lucide-react';
import LegaliLogo from '../ui/LegaliLogo';
import { useAuthStore } from '../../store/authStore';
import type { UserRole } from '../../types';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const customerLinks = [
  { to: '/customer', icon: Home, label: 'Dashboard' },
  { to: '/customer/cases', icon: FileText, label: 'My Cases' },
  { to: '/customer/insurance', icon: Shield, label: 'My Insurance' },
  { to: '/customer/immediate', icon: Gavel, label: 'Legal Immediate' },
  { to: '/customer/find-lawyer', icon: MapPin, label: 'Find a Lawyer' },
  { to: '/customer/messages', icon: MessageSquare, label: 'Messages' },
  { to: '/customer/knowledge', icon: BookOpen, label: 'Legal Knowledge' },
  { to: '/customer/calculator', icon: DollarSign, label: 'Fee Calculator' },
  { to: '/customer/ask-legali', icon: Sparkles, label: 'Ask Legali AI' },
  { to: '/customer/notifications', icon: Bell, label: 'Notifications', badge: 3 },
  { to: '/customer/settings', icon: Settings, label: 'Settings' },
];

const lawyerLinks = [
  { to: '/lawyer', icon: Home, label: 'Dashboard' },
  { to: '/lawyer/cases', icon: FileText, label: 'My Cases' },
  { to: '/lawyer/schedule', icon: CheckSquare, label: 'Schedule' },
  { to: '/lawyer/messages', icon: MessageSquare, label: 'Messages' },
  { to: '/lawyer/earnings', icon: DollarSign, label: 'Earnings' },
  { to: '/lawyer/profile', icon: UserCheck, label: 'My Profile' },
  { to: '/lawyer/notifications', icon: Bell, label: 'Notifications', badge: 2 },
  { to: '/lawyer/settings', icon: Settings, label: 'Settings' },
];

const adminLinks = [
  { to: '/admin', icon: BarChart2, label: 'Dashboard' },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/lawyers', icon: Briefcase, label: 'Lawyers' },
  { to: '/admin/cases', icon: FileText, label: 'Cases' },
  { to: '/admin/payments', icon: CreditCard, label: 'Payments' },
  { to: '/admin/analytics', icon: PieChart, label: 'Analytics' },
  { to: '/admin/content', icon: BookOpen, label: 'Content' },
  { to: '/admin/notifications', icon: Bell, label: 'Notifications', badge: 5 },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

const linkMap: Record<UserRole, typeof customerLinks> = {
  customer: customerLinks,
  lawyer: lawyerLinks,
  admin: adminLinks,
};

export default function AppSidebar({ collapsed = false, onToggle }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, userName, logout } = useAuthStore();
  const links = linkMap[role!] ?? customerLinks;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (to: string) => {
    if (to === `/${role}`) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <aside className={`fixed left-0 top-0 bottom-0 bg-white border-r border-legali-border flex flex-col z-40 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-legali-border h-16">
        {!collapsed && <LegaliLogo size="sm" />}
        {collapsed && <div className="w-8 h-8 rounded-xl gradient-orange flex items-center justify-center"><span className="text-white font-bold text-sm">L</span></div>}
        <button onClick={onToggle} className="p-1 rounded-lg hover:bg-legali-light text-legali-gray ml-auto">
          <ChevronLeft size={16} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-legali-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-orange flex items-center justify-center text-white text-xs font-bold">
              {userName.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-legali-dark truncate">{userName}</p>
              <span className="badge-orange text-[10px] capitalize">{role}</span>
            </div>
          </div>
        </div>
      )}

      {/* Links */}
      <nav className="flex-1 p-3 overflow-y-auto scrollbar-hide flex flex-col gap-1">
        {links.map(({ to, icon: Icon, label, badge }) => (
          <Link key={to} to={to} className={isActive(to) ? 'sidebar-link-active' : 'sidebar-link'}>
            <Icon size={18} className="shrink-0" />
            {!collapsed && (
              <>
                <span className="text-sm flex-1">{label}</span>
                {badge && <span className="bg-legali-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>}
              </>
            )}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-legali-border">
        <button onClick={handleLogout} className={`sidebar-link w-full ${collapsed ? 'justify-center' : ''}`}>
          <LogOut size={18} className="shrink-0 text-red-500" />
          {!collapsed && <span className="text-sm text-red-500">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
