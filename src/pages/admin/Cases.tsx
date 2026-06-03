import { useState } from 'react';
import { Search, Eye, UserCheck, AlertCircle } from 'lucide-react';
import { mockCases, CASE_TYPE_LABELS, mockLawyers } from '../../data/mockData';
import Modal from '../../components/ui/Modal';
import type { Case } from '../../types';

const statusColor: Record<string, string> = { pending: 'badge-yellow', assigned: 'badge-blue', in_progress: 'badge-orange', completed: 'badge-green', cancelled: 'badge-red', disputed: 'badge-red' };
const priorityColor: Record<string, string> = { low: 'badge-gray', medium: 'badge-blue', high: 'badge-yellow', urgent: 'badge-red' };

export default function AdminCases() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Case | null>(null);
  const [assignModal, setAssignModal] = useState<Case | null>(null);

  const filtered = mockCases.filter(c => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.customerName.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter !== 'all' && c.status !== filter) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-header">Case Management</h1>
        <p className="text-legali-gray mt-1">{mockCases.length} total cases · {mockCases.filter(c => c.status === 'pending').length} unassigned</p>
      </div>

      {/* Urgent cases alert */}
      {mockCases.filter(c => c.priority === 'urgent' && c.status === 'pending').length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
          <AlertCircle size={18} className="text-red-600 shrink-0" />
          <p className="text-sm text-red-700 font-medium">{mockCases.filter(c => c.priority === 'urgent' && c.status === 'pending').length} urgent cases awaiting assignment</p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-legali-gray" />
          <input placeholder="Search cases..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'assigned', 'in_progress', 'completed'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`text-xs font-semibold px-3 py-2 rounded-xl border capitalize transition-all ${filter === f ? 'bg-legali-orange text-white border-legali-orange' : 'bg-white text-legali-gray border-legali-border'}`}>{f.replace('_', ' ')}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-legali-border bg-legali-light">
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Case</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden md:table-cell">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden lg:table-cell">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden md:table-cell">Priority</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden lg:table-cell">Lawyer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase hidden lg:table-cell">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-legali-gray uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-legali-border">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-legali-light transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-legali-dark text-sm truncate max-w-[200px]">{c.title}</p>
                    <p className="text-xs text-legali-gray capitalize">{c.serviceType === 'insurance' ? 'Insurance' : 'Immediate'}</p>
                  </td>
                  <td className="px-4 py-3 text-legali-gray hidden md:table-cell">{c.customerName}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-legali-gray capitalize text-xs">{CASE_TYPE_LABELS[c.type]}</td>
                  <td className="px-4 py-3"><span className={statusColor[c.status]}>{c.status.replace('_', ' ')}</span></td>
                  <td className="px-4 py-3 hidden md:table-cell"><span className={priorityColor[c.priority]}>{c.priority}</span></td>
                  <td className="px-4 py-3 hidden lg:table-cell text-legali-gray text-sm">{c.lawyerName || <span className="text-red-500 text-xs">Unassigned</span>}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-legali-orange font-bold">₦{(c.amount || 50000).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelected(c)} className="w-7 h-7 rounded-lg hover:bg-blue-50 flex items-center justify-center text-blue-600"><Eye size={14} /></button>
                      {!c.lawyerId && <button onClick={() => setAssignModal(c)} className="w-7 h-7 rounded-lg hover:bg-green-50 flex items-center justify-center text-green-600"><UserCheck size={14} /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case detail modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Case Details" size="lg">
        {selected && (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 flex-wrap">
              <span className={statusColor[selected.status]}>{selected.status.replace('_', ' ')}</span>
              <span className={priorityColor[selected.priority]}>{selected.priority} priority</span>
              <span className="badge-gray">{CASE_TYPE_LABELS[selected.type]}</span>
            </div>
            <h2 className="text-xl font-display font-bold text-legali-dark">{selected.title}</h2>
            <p className="text-sm text-legali-gray leading-relaxed">{selected.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {[['Customer', selected.customerName], ['Lawyer', selected.lawyerName || 'Unassigned'], ['Service', selected.serviceType === 'insurance' ? 'Legal Insurance' : 'Legal Immediate'], ['Amount', `₦${(selected.amount || 50000).toLocaleString()}`], ['Payment', selected.paymentStatus], ['Created', new Date(selected.createdAt).toLocaleDateString('en-NG')]].map(([l, v]) => (
                <div key={l} className="bg-legali-light rounded-xl p-3">
                  <p className="text-xs text-legali-gray">{l}</p>
                  <p className="font-semibold text-sm text-legali-dark mt-0.5">{v}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Assign lawyer modal */}
      <Modal isOpen={!!assignModal} onClose={() => setAssignModal(null)} title="Assign Lawyer">
        {assignModal && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-legali-gray">Assign a verified lawyer to: <strong>{assignModal.title}</strong></p>
            <div className="flex flex-col gap-2">
              {mockLawyers.filter(l => l.verified && l.available).map(l => (
                <label key={l.id} className="flex items-center gap-3 p-3 rounded-xl border border-legali-border hover:border-legali-orange cursor-pointer transition-colors">
                  <input type="radio" name="lawyer" value={l.id} className="accent-legali-orange" />
                  <img src={l.avatar} className="w-8 h-8 rounded-lg" alt={l.name} />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-legali-dark">{l.name}</p>
                    <p className="text-xs text-legali-gray">{l.specializations.join(', ')}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs"><Search size={10} className="text-yellow-400" />{l.rating}</div>
                </label>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setAssignModal(null)} className="btn-ghost flex-1 justify-center">Cancel</button>
              <button onClick={() => setAssignModal(null)} className="btn-primary flex-1 justify-center"><UserCheck size={15} />Assign Lawyer</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
