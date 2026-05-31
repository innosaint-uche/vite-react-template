import { Shield, Zap, FileText, MapPin, Phone, Bell, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { mockCases, mockNotifications, currentCustomer } from '../../data/mockData';
import StatCard from '../../components/ui/StatCard';

export default function CustomerDashboard() {
  const { userName } = useAuthStore();
  const navigate = useNavigate();
  const sub = currentCustomer.subscription;

  const statusColor = { pending: 'badge-yellow', assigned: 'badge-blue', in_progress: 'badge-orange', completed: 'badge-green', cancelled: 'badge-red', disputed: 'badge-red' };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-header">Good morning, {userName.split(' ')[0]} 👋</h1>
          <p className="text-legali-gray mt-1">You are covered and on guard. Stay Legali!</p>
        </div>
        <button onClick={() => navigate('/customer/immediate')} className="btn-primary gap-2 w-fit">
          <Phone size={16} /> Emergency Legal Call
        </button>
      </div>

      {/* Subscription banner */}
      {sub && (
        <div className="gradient-orange rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Active Subscription</p>
              <p className="text-white text-xl font-display font-bold capitalize">{sub.plan} Plan</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {sub.coverageAreas.map(a => (
                  <span key={a} className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full capitalize">{a.replace('_', ' ')}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-xs">Expires</p>
            <p className="text-white font-bold">{new Date(sub.endDate).toLocaleDateString('en-NG', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            <button onClick={() => navigate('/customer/insurance')} className="mt-2 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
              Manage Plan
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Cases" value={mockCases.length} icon={FileText} change="2 new" color="orange" />
        <StatCard label="In Progress" value={mockCases.filter(c => c.status === 'in_progress').length} icon={Clock} change="active" changeType="neutral" color="blue" />
        <StatCard label="Completed" value={mockCases.filter(c => c.status === 'completed').length} icon={CheckCircle} change="all time" changeType="neutral" color="green" />
        <StatCard label="Notifications" value={mockNotifications.filter(n => !n.read).length} icon={Bell} color="dark" />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="section-title mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Shield, label: 'Get Insured', sublabel: 'Legal Insurance Plan', color: 'gradient-orange', to: '/customer/insurance' },
            { icon: Zap, label: 'Get a Lawyer Now', sublabel: 'Legal Immediate', color: 'gradient-dark', to: '/customer/immediate' },
            { icon: MapPin, label: 'Find a Lawyer', sublabel: 'Near You', color: 'bg-blue-600', to: '/customer/find-lawyer' },
            { icon: FileText, label: 'My Cases', sublabel: 'View All', color: 'bg-purple-600', to: '/customer/cases' },
          ].map(({ icon: Icon, label, sublabel, color, to }) => (
            <button key={label} onClick={() => navigate(to)} className="card-hover flex items-center gap-4 p-4 text-left">
              <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                <Icon size={22} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-legali-dark text-sm">{label}</p>
                <p className="text-legali-gray text-xs">{sublabel}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent cases */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Recent Cases</h2>
          <button onClick={() => navigate('/customer/cases')} className="text-sm text-legali-orange font-semibold hover:underline">View all</button>
        </div>
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-legali-border bg-legali-light">
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase tracking-wider">Case</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase tracking-wider hidden md:table-cell">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase tracking-wider hidden md:table-cell">Lawyer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase tracking-wider hidden lg:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-legali-border">
              {mockCases.slice(0, 4).map(c => (
                <tr key={c.id} onClick={() => navigate(`/customer/cases/${c.id}`)} className="hover:bg-legali-light cursor-pointer transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-legali-dark text-sm truncate max-w-[180px]">{c.title}</p>
                    <p className="text-xs text-legali-gray capitalize">{c.serviceType === 'insurance' ? 'Legal Insurance' : 'Legal Immediate'}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell"><span className="capitalize text-legali-gray">{c.type.replace('_', ' ')}</span></td>
                  <td className="px-4 py-3"><span className={statusColor[c.status]}>{c.status.replace('_', ' ')}</span></td>
                  <td className="px-4 py-3 hidden md:table-cell text-legali-gray">{c.lawyerName || '—'}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-legali-gray text-xs">{new Date(c.createdAt).toLocaleDateString('en-NG')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notifications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Recent Notifications</h2>
          <button onClick={() => navigate('/customer/notifications')} className="text-sm text-legali-orange font-semibold hover:underline">View all</button>
        </div>
        <div className="flex flex-col gap-3">
          {mockNotifications.slice(0, 3).map(n => (
            <div key={n.id} className={`card p-4 flex items-start gap-3 ${!n.read ? 'border-legali-orange/30 bg-legali-orange/5' : ''}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.type === 'case' ? 'bg-blue-100' : n.type === 'payment' ? 'bg-green-100' : 'bg-legali-orange/10'}`}>
                {n.type === 'case' ? <FileText size={16} className="text-blue-600" /> : n.type === 'payment' ? <TrendingUp size={16} className="text-green-600" /> : <Bell size={16} className="text-legali-orange" />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-legali-dark">{n.title}</p>
                <p className="text-xs text-legali-gray mt-0.5">{n.message}</p>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full bg-legali-orange shrink-0 mt-1.5" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
