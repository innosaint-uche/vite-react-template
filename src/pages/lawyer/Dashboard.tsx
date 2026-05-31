import { FileText, DollarSign, Star, Clock, CheckCircle, TrendingUp, Calendar, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { mockCases, currentLawyer } from '../../data/mockData';
import StatCard from '../../components/ui/StatCard';

export default function LawyerDashboard() {
  const { userName } = useAuthStore();
  const navigate = useNavigate();
  const myCases = mockCases.filter(c => c.lawyerId === currentLawyer.id);
  const activeCases = myCases.filter(c => ['assigned', 'in_progress'].includes(c.status));
  const pendingCases = mockCases.filter(c => c.status === 'pending');

  const statusColor: Record<string, string> = { pending: 'badge-yellow', assigned: 'badge-blue', in_progress: 'badge-orange', completed: 'badge-green', cancelled: 'badge-red', disputed: 'badge-red' };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-header">Good morning, {userName.split(' ')[0]} 👨‍⚖️</h1>
          <p className="text-legali-gray mt-1">You have {activeCases.length} active cases and {pendingCases.length} new requests</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-semibold ${currentLawyer.available ? 'border-green-200 bg-green-50 text-green-700' : 'border-gray-200 bg-gray-100 text-gray-600'}`}>
            <div className={`w-2 h-2 rounded-full ${currentLawyer.available ? 'bg-green-500' : 'bg-gray-400'}`} />
            {currentLawyer.available ? 'Available' : 'Unavailable'}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Cases" value={currentLawyer.completedCases + myCases.length} icon={FileText} change="+12%" color="orange" />
        <StatCard label="Active Cases" value={activeCases.length} icon={Clock} color="blue" />
        <StatCard label="Avg Rating" value={`${currentLawyer.rating}★`} icon={Star} change="top 5%" color="green" />
        <StatCard label="Total Earnings" value={`₦${(currentLawyer.earnings / 1000000).toFixed(1)}M`} icon={DollarSign} change="+8%" color="orange" />
      </div>

      {/* Pending case requests */}
      {pendingCases.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">New Case Requests</h2>
            <span className="badge-orange">{pendingCases.length} new</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {pendingCases.slice(0, 4).map(c => (
              <div key={c.id} className="card border-legali-orange/20 bg-legali-orange/5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-legali-dark text-sm">{c.title}</h3>
                    <p className="text-xs text-legali-gray mt-0.5 capitalize">{c.type.replace('_', ' ')} · {c.serviceType === 'immediate' ? 'Legal Immediate' : 'Insurance'}</p>
                  </div>
                  <span className={`badge-red text-[10px] capitalize shrink-0`}>{c.priority}</span>
                </div>
                <p className="text-xs text-legali-gray mb-3 line-clamp-2">{c.description}</p>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-legali-orange text-sm">₦{(c.amount || 50000).toLocaleString()}</p>
                  <div className="flex gap-2">
                    <button className="btn-ghost py-1.5 px-3 text-xs">Decline</button>
                    <button className="btn-primary py-1.5 px-3 text-xs">Accept</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active cases */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">My Active Cases</h2>
          <button onClick={() => navigate('/lawyer/cases')} className="text-sm text-legali-orange font-semibold hover:underline">View all</button>
        </div>
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-legali-border bg-legali-light">
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Case</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden md:table-cell">Client</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden lg:table-cell">Scheduled</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-legali-border">
              {myCases.map(c => (
                <tr key={c.id} className="hover:bg-legali-light cursor-pointer transition-colors" onClick={() => navigate(`/lawyer/cases/${c.id}`)}>
                  <td className="px-4 py-3"><p className="font-medium text-legali-dark text-sm truncate max-w-[200px]">{c.title}</p></td>
                  <td className="px-4 py-3 hidden md:table-cell text-legali-gray">{c.customerName}</td>
                  <td className="px-4 py-3"><span className={statusColor[c.status]}>{c.status.replace('_', ' ')}</span></td>
                  <td className="px-4 py-3 hidden lg:table-cell text-legali-gray text-xs">{c.scheduledAt ? new Date(c.scheduledAt).toLocaleDateString('en-NG') : '—'}</td>
                  <td className="px-4 py-3 text-legali-orange font-bold">₦{((c.amount || 50000) * 0.75).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {myCases.length === 0 && <div className="py-12 text-center text-legali-gray">No active cases</div>}
        </div>
      </div>

      {/* Today schedule */}
      <div>
        <h2 className="section-title mb-4">Today's Schedule</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {myCases.filter(c => c.scheduledAt).map(c => (
            <div key={c.id} className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-legali-orange/10 flex items-center justify-center shrink-0"><Calendar size={18} className="text-legali-orange" /></div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-legali-dark">{c.title}</p>
                <p className="text-xs text-legali-gray">{c.customerName} · {c.scheduledAt ? new Date(c.scheduledAt).toLocaleDateString('en-NG') : ''}</p>
              </div>
              <button className="btn-primary py-1.5 px-3 text-xs gap-1"><MessageSquare size={12} />Join</button>
            </div>
          ))}
          {myCases.filter(c => c.scheduledAt).length === 0 && <p className="text-legali-gray text-sm col-span-2">No sessions scheduled today</p>}
        </div>
      </div>
    </div>
  );
}
