import { useState } from 'react';
import { Search, User, Shield, Ban, Eye, Download } from 'lucide-react';

const mockUsers = [
  { id: 'u1', name: 'Tunde Bakare', email: 'tunde@example.com', phone: '080-1234-5678', plan: 'standard', kyc: true, cases: 3, joined: '2024-12-01', status: 'active' },
  { id: 'u2', name: 'Ngozi Eze', email: 'ngozi@example.com', phone: '080-2345-6789', plan: 'basic', kyc: true, cases: 1, joined: '2024-12-15', status: 'active' },
  { id: 'u3', name: 'Segun Adeola', email: 'segun@example.com', phone: '080-3456-7890', plan: null, kyc: false, cases: 1, joined: '2025-01-02', status: 'active' },
  { id: 'u4', name: 'Amara Okafor', email: 'amara@example.com', phone: '080-4567-8901', plan: null, kyc: true, cases: 1, joined: '2025-01-10', status: 'active' },
  { id: 'u5', name: 'Bisi Olawale', email: 'bisi@example.com', phone: '080-5678-9012', plan: 'premium', kyc: true, cases: 2, joined: '2025-01-12', status: 'active' },
  { id: 'u6', name: 'Kemi Abiodun', email: 'kemi@example.com', phone: '080-6789-0123', plan: 'standard', kyc: false, cases: 0, joined: '2025-01-20', status: 'suspended' },
];

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'suspended'>('all');

  const filtered = mockUsers.filter(u => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.includes(search)) return false;
    if (filter !== 'all' && u.status !== filter) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">User Management</h1>
          <p className="text-legali-gray mt-1">{mockUsers.length} registered users</p>
        </div>
        <button className="btn-secondary gap-2 text-sm"><Download size={15} /> Export CSV</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          ['Total Users', mockUsers.length, 'text-legali-dark'],
          ['Subscribed', mockUsers.filter(u => u.plan).length, 'text-legali-orange'],
          ['KYC Verified', mockUsers.filter(u => u.kyc).length, 'text-green-600'],
          ['Suspended', mockUsers.filter(u => u.status === 'suspended').length, 'text-red-600'],
        ].map(([l, v, c]) => (
          <div key={l as string} className="card p-4 text-center">
            <p className={`text-2xl font-black font-display ${c}`}>{v}</p>
            <p className="text-legali-gray text-sm mt-1">{l}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-legali-gray" />
          <input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9" />
        </div>
        <div className="flex gap-2">
          {(['all', 'active', 'suspended'] as const).map(f => (
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
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden md:table-cell">Phone</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Plan</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden md:table-cell">KYC</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden lg:table-cell">Cases</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-legali-border">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-legali-light transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full gradient-orange flex items-center justify-center text-white text-sm font-bold shrink-0">{u.name.charAt(0)}</div>
                      <div>
                        <p className="font-semibold text-legali-dark">{u.name}</p>
                        <p className="text-xs text-legali-gray">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-legali-gray text-xs hidden md:table-cell">{u.phone}</td>
                  <td className="px-4 py-3">
                    {u.plan ? <span className="badge-orange capitalize">{u.plan}</span> : <span className="badge-gray">Free</span>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {u.kyc ? <span className="badge-green">Verified</span> : <span className="badge-yellow">Pending</span>}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-legali-gray">{u.cases}</td>
                  <td className="px-4 py-3">
                    <span className={u.status === 'active' ? 'badge-green' : 'badge-red'}>{u.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="w-7 h-7 rounded-lg hover:bg-blue-50 flex items-center justify-center text-blue-600"><Eye size={14} /></button>
                      <button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-red-600"><Ban size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
