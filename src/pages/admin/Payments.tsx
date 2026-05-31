import { useState } from 'react';
import { Search, Download, DollarSign, TrendingUp, CreditCard, RefreshCw } from 'lucide-react';
import { mockPayments } from '../../data/mockData';
import StatCard from '../../components/ui/StatCard';

export default function AdminPayments() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = mockPayments.filter(p => {
    if (search && !p.customerName.toLowerCase().includes(search.toLowerCase()) && !p.reference.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter !== 'all' && p.status !== filter) return false;
    return true;
  });

  const totalRevenue = mockPayments.filter(p => p.status === 'completed').reduce((a, b) => a + b.amount, 0);
  const pending = mockPayments.filter(p => p.status === 'pending').reduce((a, b) => a + b.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Payment Management</h1>
          <p className="text-legali-gray mt-1">All transactions and escrow management</p>
        </div>
        <button className="btn-secondary gap-2 text-sm"><Download size={15} />Export</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={`₦${(totalRevenue/1000).toFixed(0)}k`} icon={DollarSign} change="+41%" color="orange" />
        <StatCard label="Pending Escrow" value={`₦${(pending/1000).toFixed(0)}k`} icon={CreditCard} changeType="neutral" color="blue" />
        <StatCard label="Transactions" value={mockPayments.length} icon={TrendingUp} color="green" />
        <StatCard label="Failed" value={mockPayments.filter(p => p.status === 'failed').length} icon={RefreshCw} changeType="down" color="dark" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-legali-gray" />
          <input placeholder="Search by name or reference..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'completed', 'pending', 'failed', 'refunded'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`text-xs font-semibold px-3 py-2 rounded-xl border capitalize transition-all ${filter === f ? 'bg-legali-orange text-white border-legali-orange' : 'bg-white text-legali-gray border-legali-border'}`}>{f}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-legali-border bg-legali-light">
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Reference</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden md:table-cell">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden lg:table-cell">Gateway</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden lg:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-legali-border">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-legali-light transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-legali-gray">{p.reference}</td>
                  <td className="px-4 py-3 font-medium text-legali-dark hidden md:table-cell">{p.customerName}</td>
                  <td className="px-4 py-3"><span className={p.type === 'subscription' ? 'badge-blue' : 'badge-orange'} style={{textTransform:'capitalize'}}>{p.type}</span></td>
                  <td className="px-4 py-3 font-bold text-legali-dark">₦{p.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-legali-gray capitalize text-xs">{p.gateway}</td>
                  <td className="px-4 py-3">
                    <span className={p.status === 'completed' ? 'badge-green' : p.status === 'pending' ? 'badge-yellow' : p.status === 'failed' ? 'badge-red' : 'badge-gray'}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-legali-gray text-xs">{new Date(p.createdAt).toLocaleDateString('en-NG')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
