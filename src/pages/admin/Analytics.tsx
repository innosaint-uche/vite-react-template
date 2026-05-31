import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend, AreaChart, Area } from 'recharts';
import { mockAnalytics } from '../../data/mockData';
import StatCard from '../../components/ui/StatCard';
import { Users, FileText, DollarSign, TrendingUp } from 'lucide-react';

const COLORS = ['#E05A00', '#1A1A1A', '#3B82F6', '#F59E0B', '#22C55E', '#8B5CF6', '#EC4899', '#06B6D4'];

export default function Analytics() {
  const { totalUsers, totalLawyers, totalCases, totalRevenue, revenueByMonth, userGrowth, casesByType, caseStatusBreakdown } = mockAnalytics;

  const caseTypeData = Object.entries(casesByType).map(([type, count]) => ({ name: type.replace('_', ' '), count })).sort((a, b) => b.count - a.count);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-header">Platform Analytics</h1>
        <p className="text-legali-gray mt-1">Comprehensive platform performance metrics</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={totalUsers.toLocaleString()} icon={Users} change="+27%" color="orange" />
        <StatCard label="Active Lawyers" value={totalLawyers} icon={FileText} change="+18%" color="green" />
        <StatCard label="Total Cases" value={totalCases.toLocaleString()} icon={TrendingUp} change="+32%" color="blue" />
        <StatCard label="Total Revenue" value={`₦${(totalRevenue/1000000).toFixed(0)}M`} icon={DollarSign} change="+41%" color="orange" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue area chart */}
        <div className="card">
          <h2 className="section-title mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueByMonth}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E05A00" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#E05A00" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D8" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} />
              <YAxis tickFormatter={v => `₦${(v/1000000).toFixed(0)}M`} tick={{ fontSize: 10, fill: '#6B7280' }} />
              <Tooltip formatter={(v: number) => [`₦${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#E05A00" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User growth */}
        <div className="card">
          <h2 className="section-title mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D8" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="users" stroke="#E05A00" strokeWidth={2} name="Customers" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="lawyers" stroke="#1A1A1A" strokeWidth={2} name="Lawyers" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Cases by type */}
        <div className="card">
          <h2 className="section-title mb-4">Cases by Type</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={caseTypeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D8" />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#6B7280' }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#6B7280' }} width={90} />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="count" fill="#E05A00" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Case status */}
        <div className="card">
          <h2 className="section-title mb-4">Case Status Distribution</h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={caseStatusBreakdown} cx="50%" cy="50%" outerRadius={80} paddingAngle={2} dataKey="count" nameKey="status">
                  {caseStatusBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div>
        <h2 className="section-title mb-4">Key Performance Indicators</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Subscriptions', value: mockAnalytics.activeSubscriptions, target: 1320, unit: 'users', color: 'orange' },
            { label: 'Lawyer Utilization', value: 78, target: 85, unit: '%', color: 'green' },
            { label: 'Avg. Case Duration', value: 14, target: 10, unit: 'days', color: 'blue' },
            { label: 'Customer Satisfaction', value: 4.7, target: 4.9, unit: '/5', color: 'purple' },
          ].map(kpi => {
            const pct = Math.min(100, Math.round((Number(kpi.value) / kpi.target) * 100));
            return (
              <div key={kpi.label} className="card p-4">
                <p className="text-xs text-legali-gray font-medium">{kpi.label}</p>
                <p className="text-2xl font-black font-display text-legali-dark mt-1">{kpi.value}<span className="text-sm font-normal text-legali-gray">{kpi.unit}</span></p>
                <div className="mt-2 h-1.5 bg-legali-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full gradient-orange" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-legali-gray mt-1">{pct}% of target ({kpi.target}{kpi.unit})</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
