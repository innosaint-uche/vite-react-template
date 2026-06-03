import { useState } from 'react';
import { Search, MapPin, Star, Filter, Shield, Zap, Check } from 'lucide-react';
import { mockLawyers, NIGERIAN_STATES } from '../../data/mockData';
import Modal from '../../components/ui/Modal';

export default function FindLawyer() {
  const [search, setSearch] = useState('');
  const [state, setState] = useState('');
  const [spec, setSpec] = useState('');
  const [selected, setSelected] = useState<typeof mockLawyers[0] | null>(null);

  const filtered = mockLawyers.filter(l => {
    if (search && !l.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (state && !l.location.includes(state)) return false;
    if (spec && !l.specializations.some(s => s.toLowerCase().includes(spec.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-header">Find a Lawyer</h1>
        <p className="text-legali-gray mt-1">Browse {mockLawyers.length} verified lawyers across Nigeria</p>
      </div>

      {/* Search and filters */}
      <div className="card flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-legali-gray" />
          <input placeholder="Search by name or specialization..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9" />
        </div>
        <select value={state} onChange={e => setState(e.target.value)} className="input-field sm:w-44">
          <option value="">All States</option>
          {NIGERIAN_STATES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={spec} onChange={e => setSpec(e.target.value)} className="input-field sm:w-48">
          <option value="">All Specializations</option>
          {['Housing', 'Employment', 'Family Law', 'Criminal', 'Corporate', 'Trademark'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Results */}
      <p className="text-sm text-legali-gray">{filtered.length} lawyers found</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(lawyer => (
          <div key={lawyer.id} className="card flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="relative shrink-0">
                <img src={lawyer.avatar} alt={lawyer.name} className="w-14 h-14 rounded-xl object-cover" />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${lawyer.available ? 'bg-green-500' : 'bg-gray-400'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-legali-dark truncate">{lawyer.name}</p>
                  {lawyer.verified && <Shield size={14} className="text-legali-orange shrink-0" />}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold">{lawyer.rating}</span>
                  <span className="text-xs text-legali-gray">({lawyer.reviewCount} reviews)</span>
                </div>
                <p className="text-xs text-legali-gray flex items-center gap-1 mt-0.5"><MapPin size={10} />{lawyer.location}</p>
              </div>
            </div>

            <p className="text-xs text-legali-gray leading-relaxed line-clamp-2">{lawyer.bio}</p>

            <div className="flex flex-wrap gap-1.5">
              {lawyer.specializations.map(s => <span key={s} className="badge-orange text-[10px]">{s}</span>)}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs border-t border-legali-border pt-3">
              <div><p className="font-bold text-legali-dark">{lawyer.yearsExperience}yr</p><p className="text-legali-gray">Experience</p></div>
              <div><p className="font-bold text-legali-dark">{lawyer.completedCases}</p><p className="text-legali-gray">Cases</p></div>
              <div><p className={`font-bold ${lawyer.available ? 'text-green-600' : 'text-gray-500'}`}>{lawyer.available ? 'Now' : 'Busy'}</p><p className="text-legali-gray">Status</p></div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setSelected(lawyer)} className="btn-ghost flex-1 justify-center text-sm py-2">View Profile</button>
              <button disabled={!lawyer.available} onClick={() => setSelected(lawyer)} className={`flex-1 text-sm py-2 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all ${lawyer.available ? 'btn-primary' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
                <Zap size={14} /> Book
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lawyer profile modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Lawyer Profile" size="lg">
        {selected && (
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <img src={selected.avatar} alt={selected.name} className="w-20 h-20 rounded-2xl" />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-display font-bold text-legali-dark">{selected.name}</h2>
                  {selected.verified && <span className="badge-green">Verified</span>}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{selected.rating}</span>
                  <span className="text-legali-gray text-sm">({selected.reviewCount} reviews)</span>
                </div>
                <p className="text-sm text-legali-gray mt-1 flex items-center gap-1"><MapPin size={12} />{selected.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[['Experience', `${selected.yearsExperience} years`], ['Cases Solved', selected.completedCases], ['Bar Number', selected.barNumber]].map(([l, v]) => (
                <div key={l} className="bg-legali-light rounded-xl p-3 text-center">
                  <p className="text-xs text-legali-gray">{l}</p>
                  <p className="font-bold text-sm text-legali-dark mt-0.5">{v}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-semibold text-legali-gray mb-2 uppercase tracking-wider">About</p>
              <p className="text-sm text-legali-dark leading-relaxed">{selected.bio}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-legali-gray mb-2 uppercase tracking-wider">Specializations</p>
              <div className="flex flex-wrap gap-2">{selected.specializations.map(s => <span key={s} className="badge-orange">{s}</span>)}</div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setSelected(null)} className="btn-ghost flex-1 justify-center">Close</button>
              <button disabled={!selected.available} onClick={() => { setSelected(null); }} className={`flex-1 justify-center ${selected.available ? 'btn-primary' : 'btn-ghost opacity-50 cursor-not-allowed'}`}>
                {selected.available ? '⚡ Book Session — ₦50,000' : 'Currently Unavailable'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
