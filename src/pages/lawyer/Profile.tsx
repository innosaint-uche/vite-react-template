import { useState } from 'react';
import { Shield, Star, MapPin, Camera, Check, Plus, X } from 'lucide-react';
import { currentLawyer, COVERAGE_AREAS } from '../../data/mockData';

export default function LawyerProfile() {
  const [saved, setSaved] = useState(false);
  const [specs, setSpecs] = useState(currentLawyer.specializations);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-header">My Profile</h1>
        <p className="text-legali-gray mt-1">Keep your profile up to date to attract more clients</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left panel */}
        <div className="flex flex-col gap-4">
          <div className="card flex flex-col items-center gap-4 py-8">
            <div className="relative">
              <img src={currentLawyer.avatar} alt="Avatar" className="w-24 h-24 rounded-2xl" />
              <button type="button" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl gradient-orange flex items-center justify-center">
                <Camera size={14} className="text-white" />
              </button>
            </div>
            <div className="text-center">
              <p className="font-bold font-display text-legali-dark">{currentLawyer.name}</p>
              <p className="text-legali-gray text-sm mt-0.5">{currentLawyer.barNumber}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-sm">{currentLawyer.rating}</span>
                <span className="text-legali-gray text-sm">({currentLawyer.reviewCount} reviews)</span>
              </div>
              <div className="flex gap-2 justify-center mt-2">
                {currentLawyer.verified ? <span className="badge-green">Verified</span> : <span className="badge-yellow">Pending</span>}
                <span className={currentLawyer.available ? 'badge-green' : 'badge-gray'}>{currentLawyer.available ? 'Available' : 'Away'}</span>
              </div>
            </div>
          </div>

          <div className="card flex flex-col gap-3">
            <h3 className="font-display font-bold text-legali-dark text-sm">Stats</h3>
            {[['Cases Completed', currentLawyer.completedCases], ['Years Experience', currentLawyer.yearsExperience], ['Total Earnings', `₦${(currentLawyer.earnings/1000000).toFixed(1)}M`], ['Avg Rating', `${currentLawyer.rating} / 5`]].map(([l, v]) => (
              <div key={l} className="flex justify-between text-sm">
                <span className="text-legali-gray">{l}</span>
                <span className="font-bold text-legali-dark">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <form onSubmit={save} className="lg:col-span-2 flex flex-col gap-5">
          <div className="card flex flex-col gap-4">
            <h2 className="section-title">Professional Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-legali-gray mb-1.5 block">Full Name</label>
                <input defaultValue={currentLawyer.name} className="input-field" />
              </div>
              <div>
                <label className="text-xs font-semibold text-legali-gray mb-1.5 block">NBA Bar Number</label>
                <input defaultValue={currentLawyer.barNumber} className="input-field" readOnly />
              </div>
              <div>
                <label className="text-xs font-semibold text-legali-gray mb-1.5 block">Email</label>
                <input type="email" defaultValue={currentLawyer.email} className="input-field" />
              </div>
              <div>
                <label className="text-xs font-semibold text-legali-gray mb-1.5 block">Phone</label>
                <input type="tel" defaultValue={currentLawyer.phone} className="input-field" />
              </div>
              <div>
                <label className="text-xs font-semibold text-legali-gray mb-1.5 block">Location</label>
                <input defaultValue={currentLawyer.location} className="input-field" />
              </div>
              <div>
                <label className="text-xs font-semibold text-legali-gray mb-1.5 block">Years of Experience</label>
                <input type="number" defaultValue={currentLawyer.yearsExperience} className="input-field" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-legali-gray mb-1.5 block">Professional Bio</label>
              <textarea defaultValue={currentLawyer.bio} rows={4} className="input-field resize-none" />
            </div>
          </div>

          <div className="card flex flex-col gap-4">
            <h2 className="section-title">Specializations</h2>
            <div className="flex flex-wrap gap-2">
              {specs.map(s => (
                <div key={s} className="flex items-center gap-1.5 bg-legali-orange/10 text-legali-orange text-xs font-semibold px-3 py-1.5 rounded-xl">
                  {s}
                  <button type="button" onClick={() => setSpecs(prev => prev.filter(x => x !== s))}><X size={12} /></button>
                </div>
              ))}
              <button type="button" className="flex items-center gap-1 text-xs font-semibold text-legali-gray border border-dashed border-legali-border px-3 py-1.5 rounded-xl hover:border-legali-orange hover:text-legali-orange transition-colors">
                <Plus size={12} /> Add
              </button>
            </div>
          </div>

          <div className="card flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="section-title">Availability</h2>
              <div className={`relative w-11 h-6 rounded-full cursor-pointer transition-colors ${currentLawyer.available ? 'bg-legali-orange' : 'bg-legali-border'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${currentLawyer.available ? 'right-1' : 'left-1'}`} />
              </div>
            </div>
            <p className="text-sm text-legali-gray">When available, new case requests will be routed to you. Toggle off when you need a break.</p>
          </div>

          <div className="flex items-center justify-between">
            {saved && <span className="flex items-center gap-2 text-green-600 text-sm font-semibold"><Check size={15} />Profile updated!</span>}
            <button type="submit" className="btn-primary ml-auto">Save Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
}
