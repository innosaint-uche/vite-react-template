import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Search, Filter, MessageSquare, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { mockCases, CASE_TYPE_LABELS } from '../../data/mockData';
import type { CaseStatus } from '../../types';
import Modal from '../../components/ui/Modal';
import { COVERAGE_AREAS } from '../../data/mockData';

const statusIcon = { pending: AlertCircle, assigned: Clock, in_progress: Clock, completed: CheckCircle, cancelled: XCircle, disputed: AlertCircle };
const statusColor = { pending: 'badge-yellow', assigned: 'badge-blue', in_progress: 'badge-orange', completed: 'badge-green', cancelled: 'badge-red', disputed: 'badge-red' };
const priorityColor = { low: 'badge-gray', medium: 'badge-blue', high: 'badge-yellow', urgent: 'badge-red' };

export default function Cases() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<CaseStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);

  const filtered = mockCases.filter(c => {
    if (filter !== 'all' && c.status !== filter) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">My Cases</h1>
          <p className="text-legali-gray mt-1">{mockCases.length} total cases</p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn-primary gap-2">
          <Plus size={16} /> New Case
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-legali-gray" />
          <input placeholder="Search cases..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'pending', 'assigned', 'in_progress', 'completed', 'cancelled'] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`text-xs font-semibold px-3 py-2 rounded-xl transition-all capitalize border ${filter === s ? 'bg-legali-orange text-white border-legali-orange' : 'bg-white text-legali-gray border-legali-border hover:border-legali-orange/50'}`}>
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Cases grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c => {
          const Icon = statusIcon[c.status];
          return (
            <div key={c.id} onClick={() => navigate(`/customer/cases/${c.id}`)} className="card-hover flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex gap-2 mb-2 flex-wrap">
                    <span className={statusColor[c.status]}>{c.status.replace('_', ' ')}</span>
                    <span className={priorityColor[c.priority]}>{c.priority}</span>
                  </div>
                  <h3 className="font-bold text-legali-dark text-sm leading-snug">{c.title}</h3>
                </div>
                <Icon size={18} className={c.status === 'completed' ? 'text-green-500 shrink-0' : c.status === 'cancelled' ? 'text-red-500 shrink-0' : 'text-legali-orange shrink-0'} />
              </div>

              <p className="text-xs text-legali-gray leading-relaxed line-clamp-2">{c.description}</p>

              <div className="flex items-center justify-between text-xs border-t border-legali-border pt-3">
                <span className="badge-gray capitalize">{CASE_TYPE_LABELS[c.type]}</span>
                <span className="text-legali-gray">{new Date(c.createdAt).toLocaleDateString('en-NG')}</span>
              </div>

              {c.lawyerName && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-legali-orange flex items-center justify-center text-white text-xs font-bold">{c.lawyerName.charAt(0)}</div>
                  <span className="text-xs text-legali-gray">{c.lawyerName}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card text-center py-12">
          <FileText size={48} className="text-legali-border mx-auto mb-4" />
          <p className="font-display font-bold text-legali-dark">No cases found</p>
          <p className="text-legali-gray text-sm mt-1">Start by requesting legal help</p>
          <button onClick={() => setShowNew(true)} className="btn-primary mt-4">+ New Case</button>
        </div>
      )}

      {/* New case modal */}
      <Modal isOpen={showNew} onClose={() => setShowNew(false)} title="Request Legal Help" size="lg">
        <form className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-legali-gray mb-1.5 block">Service Type</label>
              <select className="input-field">
                <option value="immediate">Legal Immediate (₦50,000)</option>
                <option value="insurance">Legal Insurance (Covered)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-legali-gray mb-1.5 block">Case Type</label>
              <select className="input-field">
                {COVERAGE_AREAS.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-legali-gray mb-1.5 block">Case Title</label>
            <input type="text" placeholder="Brief title for your case" className="input-field" />
          </div>
          <div>
            <label className="text-xs font-semibold text-legali-gray mb-1.5 block">Case Description</label>
            <textarea className="input-field resize-none" rows={4} placeholder="Describe your legal situation in detail..." />
          </div>
          <div>
            <label className="text-xs font-semibold text-legali-gray mb-1.5 block">Priority</label>
            <select className="input-field">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-legali-gray mb-1.5 block">Upload Documents (optional)</label>
            <div className="border-2 border-dashed border-legali-border rounded-xl p-6 text-center">
              <p className="text-legali-gray text-sm">Drop files here or <span className="text-legali-orange font-semibold cursor-pointer">browse</span></p>
              <p className="text-xs text-legali-gray mt-1">PDF, DOC, JPG up to 10MB each</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setShowNew(false)} className="btn-ghost flex-1 justify-center">Cancel</button>
            <button type="submit" onClick={e => { e.preventDefault(); setShowNew(false); }} className="btn-primary flex-1 justify-center">Submit Case Request</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
