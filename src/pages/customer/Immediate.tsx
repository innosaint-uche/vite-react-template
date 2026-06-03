import { useState } from 'react';
import { Zap, Clock, Shield, MapPin, Phone, ChevronRight, Star } from 'lucide-react';
import { mockLawyers, COVERAGE_AREAS } from '../../data/mockData';
import Modal from '../../components/ui/Modal';

export default function Immediate() {
  const [selectedType, setSelectedType] = useState('');
  const [showBook, setShowBook] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState<typeof mockLawyers[0] | null>(null);

  const availableLawyers = mockLawyers.filter(l => l.available && l.verified);

  const book = (lawyer: typeof mockLawyers[0]) => {
    setSelectedLawyer(lawyer);
    setShowBook(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Legal Immediate</h1>
          <p className="text-legali-gray mt-1">Stay Guarded — get a lawyer within 2 hours</p>
        </div>
        <span className="badge-orange text-sm px-4 py-1.5">Stay Guarded</span>
      </div>

      {/* Emergency banner */}
      <div className="gradient-dark rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
            <Phone size={24} className="text-red-400" />
          </div>
          <div>
            <p className="text-white font-bold text-lg font-display">Emergency? Call Now!</p>
            <p className="text-white/60 text-sm">Get connected to a lawyer instantly via emergency hotline</p>
          </div>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 shrink-0">
          <Phone size={16} /> 0800-LEGALI
        </button>
      </div>

      {/* How it works */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: '1', title: 'Select Issue Type', desc: 'Tell us what kind of legal help you need.' },
          { icon: '2', title: 'Get Matched', desc: 'We assign the best available lawyer for your case.' },
          { icon: '3', title: 'Start Session', desc: 'Virtual or in-person consultation within 2 hours.' },
        ].map(({ icon, title, desc }) => (
          <div key={icon} className="card p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl gradient-orange flex items-center justify-center text-white font-bold text-sm shrink-0">{icon}</div>
            <div>
              <p className="font-semibold text-legali-dark text-sm">{title}</p>
              <p className="text-xs text-legali-gray mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Issue type selection */}
      <div>
        <h2 className="section-title mb-4">What Do You Need Help With?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {COVERAGE_AREAS.map(area => (
            <button key={area.id} onClick={() => setSelectedType(area.id === selectedType ? '' : area.id)} className={`card p-4 flex items-center gap-3 text-left transition-all ${selectedType === area.id ? 'border-legali-orange bg-legali-orange/5 shadow-legali' : 'hover:border-legali-orange/50'}`}>
              <span className="text-2xl">{area.icon}</span>
              <div>
                <p className="font-semibold text-sm text-legali-dark">{area.label}</p>
                <p className="text-xs text-legali-gray">₦50,000/session</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Available lawyers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">Available Lawyers Now</h2>
          <span className="text-sm text-legali-gray">{availableLawyers.length} available</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableLawyers.map(lawyer => (
            <div key={lawyer.id} className="card-hover flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img src={lawyer.avatar} alt={lawyer.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-legali-dark text-sm">{lawyer.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold text-legali-dark">{lawyer.rating}</span>
                    <span className="text-xs text-legali-gray">({lawyer.reviewCount})</span>
                  </div>
                  <p className="text-xs text-legali-gray flex items-center gap-1 mt-0.5"><MapPin size={10} />{lawyer.location}</p>
                </div>
                <span className="badge-green text-[10px]">Available</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {lawyer.specializations.slice(0, 3).map(s => <span key={s} className="badge-orange text-[10px]">{s}</span>)}
              </div>

              <div className="flex items-center justify-between text-xs text-legali-gray border-t border-legali-border pt-3">
                <span><Zap size={11} className="inline text-legali-orange" /> {lawyer.yearsExperience} yrs exp</span>
                <span><Shield size={11} className="inline text-legali-orange" /> {lawyer.completedCases} cases</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-legali-orange font-black font-display text-lg">₦50,000</p>
                  <p className="text-xs text-legali-gray">per session</p>
                </div>
                <button onClick={() => book(lawyer)} disabled={!selectedType} className="btn-primary py-2 px-4 text-sm">
                  Book Now <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking modal */}
      <Modal isOpen={showBook} onClose={() => setShowBook(false)} title="Book Legal Immediate Session">
        {selectedLawyer && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 p-3 bg-legali-light rounded-xl">
              <img src={selectedLawyer.avatar} alt={selectedLawyer.name} className="w-10 h-10 rounded-xl" />
              <div>
                <p className="font-bold text-legali-dark">{selectedLawyer.name}</p>
                <div className="flex items-center gap-1"><Star size={11} className="text-yellow-400 fill-yellow-400" /><span className="text-xs">{selectedLawyer.rating}</span></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[['Session Type', 'Legal Immediate'], ['Duration', 'Up to 3 hours'], ['Fee', '₦50,000'], ['Escrow Protected', 'Yes']].map(([l, v]) => (
                <div key={l} className="bg-legali-light rounded-xl p-3">
                  <p className="text-xs text-legali-gray">{l}</p>
                  <p className="font-semibold text-legali-dark text-sm">{v}</p>
                </div>
              ))}
            </div>

            <select className="input-field">
              <option>Select meeting format</option>
              <option>Virtual (Video Call)</option>
              <option>Virtual (Phone Call)</option>
              <option>In-Person (at lawyer's office)</option>
            </select>

            <textarea className="input-field resize-none" rows={3} placeholder="Briefly describe your legal issue..." />

            <div className="flex items-start gap-2 p-3 bg-legali-orange/5 border border-legali-orange/20 rounded-xl">
              <Shield size={16} className="text-legali-orange mt-0.5 shrink-0" />
              <p className="text-xs text-legali-dark">Your payment of <strong>₦50,000</strong> will be held in escrow and only released to the lawyer after your session is complete.</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowBook(false)} className="btn-ghost flex-1 justify-center">Cancel</button>
              <button onClick={() => { alert('Paystack payment gateway integration'); setShowBook(false); }} className="btn-primary flex-1 justify-center">
                Pay ₦50,000 & Book
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
