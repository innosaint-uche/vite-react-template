import { Users, Briefcase, FileText, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { mockAnalytics, mockCases, mockLawyers } from '../../data/mockData';
import StatCard from '../../components/ui/StatCard';

const COLORS = ['#E05A00', '#1A1A1A', '#3B82F6', '#F59E0B', '#EF4444'];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { totalUsers, totalLawyers, totalCases, totalRevenue, activeSubscriptions, pendingVerifications, revenueByMonth, userGrowth, caseStatusBreakdown } = mockAnalytics;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Admin Dashboard</h1>
          <p className="text-legali-gray mt-1">Platform overview — as of {new Date().toLocaleDateString('en-NG', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</p>
        </div>
        <span className="badge-orange text-sm px-4 py-1.5">Super Admin</span>
      </div>

      {/* Alerts */}
      {pendingVerifications > 0 && (
        <div className="bg-legali-orange/10 border border-legali-orange/30 rounded-2xl p-4 flex items-center gap-3">
          <AlertCircle size={20} className="text-legali-orange shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-legali-dark text-sm">{pendingVerifications} lawyers awaiting verification</p>
            <p className="text-xs text-legali-gray">Review and approve new lawyer registrations to expand the platform's capacity.</p>
          </div>
          <button onClick={() => navigate('/admin/lawyers')} className="btn-primary text-sm py-2 px-4">Review Now</button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={totalUsers.toLocaleString()} icon={Users} change="+27%" color="orange" />
        <StatCard label="Active Lawyers" value={totalLawyers} icon={Briefcase} change="+18%" color="green" />
        <StatCard label="Total Cases" value={totalCases.toLocaleString()} icon={FileText} change="+32%" color="blue" />
        <StatCard label="Total Revenue" value={`₦${(totalRevenue / 1000000).toFixed(0)}M`} icon={DollarSign} change="+41%" color="orange" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue chart */}
        <div className="card">
          <h2 className="section-title mb-1">Monthly Revenue</h2>
          <p className="text-xs text-legali-gray mb-4">₦{(totalRevenue / 1000000).toFixed(0)}M total</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D8" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} />
              <YAxis tickFormatter={v => `₦${(v/1000000).toFixed(0)}M`} tick={{ fontSize: 10, fill: '#6B7280' }} />
              <Tooltip formatter={(v: number) => [`₦${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: 12, border: '1px solid #E8E0D8', fontSize: 12 }} />
              <Bar dataKey="revenue" fill="#E05A00" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User growth */}
        <div className="card">
          <h2 className="section-title mb-1">User Growth</h2>
          <p className="text-xs text-legali-gray mb-4">Customers vs Lawyers</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D8" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E8E0D8', fontSize: 12 }} />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#E05A00" strokeWidth={2} dot={{ r: 4, fill: '#E05A00' }} name="Users" />
              <Line type="monotone" dataKey="lawyers" stroke="#1A1A1A" strokeWidth={2} dot={{ r: 4, fill: '#1A1A1A' }} name="Lawyers" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Case status breakdown */}
        <div className="card flex flex-col">
          <h2 className="section-title mb-4">Case Status</h2>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={caseStatusBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="count" nameKey="status">
                  {caseStatusBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent cases */}
        <div className="card col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Recent Cases</h2>
            <button onClick={() => navigate('/admin/cases')} className="text-sm text-legali-orange font-semibold">View all</button>
          </div>
          <div className="flex flex-col gap-2">
            {mockCases.slice(0, 4).map(c => (
              <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-legali-light transition-colors cursor-pointer">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${c.status === 'completed' ? 'bg-green-100' : c.status === 'pending' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                  {c.status === 'completed' ? <CheckCircle size={14} className="text-green-600" /> : c.status === 'pending' ? <AlertCircle size={14} className="text-yellow-600" /> : <Clock size={14} className="text-blue-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-legali-dark truncate">{c.title}</p>
                  <p className="text-xs text-legali-gray">{c.customerName} · {c.lawyerName || 'Unassigned'}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${c.status === 'completed' ? 'badge-green' : c.status === 'pending' ? 'badge-yellow' : 'badge-blue'}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-4 gap-3">
        {[
          { label: 'Manage Users', icon: Users, color: 'gradient-orange', to: '/admin/users' },
          { label: 'Verify Lawyers', icon: Briefcase, color: 'gradient-dark', to: '/admin/lawyers' },
          { label: 'View Payments', icon: DollarSign, color: 'bg-blue-600', to: '/admin/payments' },
          { label: 'Analytics', icon: TrendingUp, color: 'bg-purple-600', to: '/admin/analytics' },
        ].map(({ label, icon: Icon, color, to }) => (
          <button key={label} onClick={() => navigate(to)} className="card-hover flex items-center gap-3 p-4 text-left">
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shrink-0`}><Icon size={18} className="text-white" /></div>
            <span className="font-semibold text-sm text-legali-dark">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
