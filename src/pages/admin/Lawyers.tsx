import { useState } from 'react';
import { Search, Shield, Star, MapPin, Check, X, Eye, MoreVertical } from 'lucide-react';
import { mockLawyers } from '../../data/mockData';
import Modal from '../../components/ui/Modal';

export default function AdminLawyers() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'verified' | 'pending' | 'suspended'>('all');
  const [selected, setSelected] = useState<typeof mockLawyers[0] | null>(null);

  const filtered = mockLawyers.filter(l => {
    if (search && !l.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === 'verified' && !l.verified) return false;
    if (filter === 'pending' && (l.verified || l.status !== 'pending')) return false;
    if (filter === 'suspended' && l.status !== 'suspended') return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Lawyer Management</h1>
          <p className="text-legali-gray mt-1">{mockLawyers.length} registered lawyers · {mockLawyers.filter(l => !l.verified).length} pending verification</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Verified', value: mockLawyers.filter(l => l.verified).length, color: 'bg-green-100 text-green-700' },
          { label: 'Pending', value: mockLawyers.filter(l => !l.verified && l.status === 'pending').length, color: 'bg-yellow-100 text-yellow-700' },
          { label: 'Active', value: mockLawyers.filter(l => l.available).length, color: 'bg-blue-100 text-blue-700' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card text-center p-4">
            <p className={`text-2xl font-black font-display ${color.split(' ')[1]}`}>{value}</p>
            <p className="text-legali-gray text-sm mt-1">{label} Lawyers</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-legali-gray" />
          <input placeholder="Search lawyers..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9" />
        </div>
        <div className="flex gap-2">
          {(['all', 'verified', 'pending', 'suspended'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`text-xs font-semibold px-3 py-2 rounded-xl border capitalize transition-all ${filter === f ? 'bg-legali-orange text-white border-legali-orange' : 'bg-white text-legali-gray border-legali-border hover:border-legali-orange/50'}`}>{f}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-legali-border bg-legali-light">
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Lawyer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden md:table-cell">Bar No.</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden lg:table-cell">Location</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden md:table-cell">Rating</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden lg:table-cell">Cases</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-legali-border">
              {filtered.map(l => (
                <tr key={l.id} className="hover:bg-legali-light transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={l.avatar} alt={l.name} className="w-9 h-9 rounded-lg" />
                      <div>
                        <p className="font-semibold text-legali-dark">{l.name}</p>
                        <p className="text-xs text-legali-gray">{l.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-legali-gray text-xs hidden md:table-cell">{l.barNumber}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="flex items-center gap-1 text-xs text-legali-gray"><MapPin size={10} />{l.location}</span>
                  </td>
                  <td className="px-4 py-3">
                    {l.verified ? <span className="badge-green">Verified</span> : l.status === 'pending' ? <span className="badge-yellow">Pending</span> : <span className="badge-red">Suspended</span>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="flex items-center gap-1 text-sm font-semibold"><Star size={12} className="text-yellow-400 fill-yellow-400" />{l.rating}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-legali-gray">{l.completedCases}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelected(l)} className="w-7 h-7 rounded-lg hover:bg-blue-50 flex items-center justify-center text-blue-600"><Eye size={14} /></button>
                      {!l.verified && l.status === 'pending' && (
                        <>
                          <button className="w-7 h-7 rounded-lg hover:bg-green-50 flex items-center justify-center text-green-600"><Check size={14} /></button>
                          <button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-red-600"><X size={14} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Lawyer Details" size="lg">
        {selected && (
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <img src={selected.avatar} alt={selected.name} className="w-16 h-16 rounded-xl" />
              <div>
                <h2 className="text-xl font-display font-bold">{selected.name}</h2>
                <p className="text-sm text-legali-gray">{selected.email} · {selected.phone}</p>
                <div className="flex gap-2 mt-2">{selected.verified ? <span className="badge-green">Verified</span> : <span className="badge-yellow">Pending Verification</span>}<span className={selected.available ? 'badge-green' : 'badge-gray'}>{selected.available ? 'Available' : 'Unavailable'}</span></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[['Bar Number', selected.barNumber], ['Location', selected.location], ['Experience', `${selected.yearsExperience} years`], ['Completed Cases', selected.completedCases], ['Rating', `${selected.rating} ★ (${selected.reviewCount} reviews)`], ['Total Earnings', `₦${(selected.earnings/1000000).toFixed(1)}M`]].map(([l, v]) => (
                <div key={l} className="bg-legali-light rounded-xl p-3">
                  <p className="text-xs text-legali-gray">{l}</p>
                  <p className="font-semibold text-legali-dark text-sm mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-legali-gray mb-2 uppercase tracking-wider">Specializations</p>
              <div className="flex flex-wrap gap-2">{selected.specializations.map(s => <span key={s} className="badge-orange">{s}</span>)}</div>
            </div>
            <p className="text-sm text-legali-gray">{selected.bio}</p>
            {!selected.verified && (
              <div className="flex gap-3">
                <button onClick={() => setSelected(null)} className="btn-danger flex-1 justify-center"><X size={15} />Reject Application</button>
                <button onClick={() => setSelected(null)} className="btn-primary flex-1 justify-center"><Check size={15} />Verify & Approve</button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
