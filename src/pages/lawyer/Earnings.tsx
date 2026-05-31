import { DollarSign, TrendingUp, CreditCard, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { currentLawyer } from '../../data/mockData';
import StatCard from '../../components/ui/StatCard';

const monthlyData = [
  { month: 'Aug', earned: 320000, cases: 7 }, { month: 'Sep', earned: 450000, cases: 9 },
  { month: 'Oct', earned: 525000, cases: 11 }, { month: 'Nov', earned: 675000, cases: 14 },
  { month: 'Dec', earned: 600000, cases: 12 }, { month: 'Jan', earned: 825000, cases: 17 },
];

const transactions = [
  { id: 't1', case: 'Unlawful Eviction Case', client: 'Tunde Bakare', amount: 37500, date: '2025-01-28', status: 'released' },
  { id: 't2', case: 'Employment Dispute', client: 'Segun Adeola', amount: 37500, date: '2025-01-25', status: 'escrowed' },
  { id: 't3', case: 'Contract Review', client: 'Ngozi Eze', amount: 37500, date: '2025-01-22', status: 'released' },
];

export default function Earnings() {
  const totalEscrow = 37500;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">My Earnings</h1>
          <p className="text-legali-gray mt-1">You receive 75% of all session fees</p>
        </div>
        <button className="btn-secondary gap-2 text-sm"><Download size={15} /> Export</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Earned" value={`₦${(currentLawyer.earnings / 1000000).toFixed(1)}M`} icon={DollarSign} change="+8%" color="orange" />
        <StatCard label="This Month" value="₦825,000" icon={TrendingUp} change="+38%" color="green" />
        <StatCard label="In Escrow" value={`₦${totalEscrow.toLocaleString()}`} icon={CreditCard} changeType="neutral" color="blue" />
        <StatCard label="Completed Cases" value={currentLawyer.completedCases} icon={DollarSign} color="dark" />
      </div>

      {/* Monthly chart */}
      <div className="card">
        <h2 className="section-title mb-4">Monthly Earnings</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D8" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
            <YAxis tickFormatter={v => `₦${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: '#6B7280' }} />
            <Tooltip formatter={(v: number) => [`₦${v.toLocaleString()}`, 'Earned']} contentStyle={{ borderRadius: 12, border: '1px solid #E8E0D8', fontSize: 12 }} />
            <Bar dataKey="earned" fill="#E05A00" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Transactions */}
      <div>
        <h2 className="section-title mb-4">Recent Transactions</h2>
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-legali-border bg-legali-light">
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Case</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden md:table-cell">Client</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Amount (75%)</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden lg:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-legali-border">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-legali-light transition-colors">
                  <td className="px-4 py-3 font-medium text-legali-dark text-sm">{t.case}</td>
                  <td className="px-4 py-3 text-legali-gray hidden md:table-cell">{t.client}</td>
                  <td className="px-4 py-3 font-bold text-legali-orange">₦{t.amount.toLocaleString()}</td>
                  <td className="px-4 py-3"><span className={t.status === 'released' ? 'badge-green' : 'badge-yellow'}>{t.status}</span></td>
                  <td className="px-4 py-3 text-legali-gray text-xs hidden lg:table-cell">{new Date(t.date).toLocaleDateString('en-NG')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdrawal */}
      <div className="card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-display font-bold text-legali-dark">Available Balance</p>
          <p className="text-3xl font-black text-legali-orange font-display mt-1">₦787,500</p>
          <p className="text-xs text-legali-gray mt-1">Escrow held: ₦37,500 (pending case completion)</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary text-sm">Bank Details</button>
          <button className="btn-primary text-sm">Withdraw Funds</button>
        </div>
      </div>
    </div>
  );
}
