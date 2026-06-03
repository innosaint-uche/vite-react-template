import { useState } from 'react';
import { Shield, Check, ChevronRight, Calendar, RefreshCw, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SUBSCRIPTION_PLANS, COVERAGE_AREAS, currentCustomer } from '../../data/mockData';
import Modal from '../../components/ui/Modal';

export default function Insurance() {
  const navigate = useNavigate();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const sub = currentCustomer.subscription;

  const currentPlan = SUBSCRIPTION_PLANS.find(p => p.id === sub?.plan);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Legal Insurance</h1>
          <p className="text-legali-gray mt-1">Stay Covered — your annual legal insurance plan</p>
        </div>
        <span className="badge-orange text-sm px-4 py-1.5">Stay Covered</span>
      </div>

      {/* Current plan */}
      {sub && currentPlan && (
        <div className="gradient-orange rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <p className="text-white/70 text-sm font-medium">Current Plan</p>
              <p className="text-white text-3xl font-display font-black capitalize mt-1">{currentPlan.name}</p>
              <p className="text-white/70 text-sm mt-1">₦{currentPlan.annualPrice.toLocaleString()}/year</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">Active</span>
              <p className="text-white/70 text-xs mt-2">Valid until</p>
              <p className="text-white font-bold">{new Date(sub.endDate).toLocaleDateString('en-NG', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[['Coverage Areas', sub.coverageAreas.length], ['Valid Since', new Date(sub.startDate).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' })], ['Status', 'Active']].map(([l, v]) => (
              <div key={l} className="bg-white/15 rounded-xl p-3">
                <p className="text-white/60 text-xs">{l}</p>
                <p className="text-white font-bold text-sm mt-0.5">{v}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-4">
            <button onClick={() => setShowUpgrade(true)} className="flex-1 bg-white text-legali-orange font-semibold py-2.5 rounded-xl text-sm hover:bg-legali-cream transition-colors flex items-center justify-center gap-2">
              <RefreshCw size={15} /> Upgrade Plan
            </button>
            <button className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
              <Calendar size={15} /> Renew Plan
            </button>
          </div>
        </div>
      )}

      {/* Coverage areas */}
      <div>
        <h2 className="section-title mb-4">Your Coverage Areas</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COVERAGE_AREAS.map(area => {
            const covered = sub?.coverageAreas.includes(area.id) ?? false;
            return (
              <div key={area.id} className={`card p-4 flex items-center gap-3 ${covered ? 'border-legali-orange/30 bg-legali-orange/5' : 'opacity-60'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${covered ? 'bg-legali-orange/10' : 'bg-legali-border'}`}>
                  {area.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-legali-dark">{area.label}</p>
                  <p className="text-xs text-legali-gray">{area.description}</p>
                </div>
                {covered ? <Check size={16} className="text-legali-orange shrink-0" /> : <X size={16} className="text-legali-gray shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Plan comparison */}
      {!sub && (
        <div>
          <h2 className="section-title mb-4">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {SUBSCRIPTION_PLANS.map(plan => (
              <div key={plan.id} className={`card flex flex-col relative ${plan.popular ? 'ring-2 ring-legali-orange' : ''}`}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-orange px-4 py-1 text-xs font-bold">Most Popular</span>}
                <Shield size={24} className="text-legali-orange mb-3" />
                <h3 className="text-xl font-display font-bold text-legali-dark">{plan.name}</h3>
                <p className="text-3xl font-black font-display text-legali-dark mt-2">₦{plan.annualPrice.toLocaleString()}<span className="text-base font-normal text-legali-gray">/yr</span></p>
                <ul className="flex flex-col gap-2 flex-1 mt-4 mb-6">
                  {plan.features.map(f => <li key={f} className="flex items-start gap-2 text-sm"><Check size={14} className="text-legali-orange mt-0.5 shrink-0" />{f}</li>)}
                </ul>
                <button onClick={() => { setSelectedPlan(plan.id); setShowUpgrade(true); }} className={plan.popular ? 'btn-primary justify-center' : 'btn-secondary justify-center'}>
                  Get {plan.name} <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upgrade modal */}
      <Modal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} title="Upgrade Your Plan" size="lg">
        <div className="grid md:grid-cols-3 gap-4">
          {SUBSCRIPTION_PLANS.map(plan => (
            <div key={plan.id} onClick={() => setSelectedPlan(plan.id)} className={`rounded-xl border-2 p-4 cursor-pointer transition-all ${selectedPlan === plan.id ? 'border-legali-orange bg-legali-orange/5' : 'border-legali-border hover:border-legali-orange/50'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold font-display text-legali-dark">{plan.name}</span>
                {plan.popular && <span className="badge-orange text-[10px]">Popular</span>}
              </div>
              <p className="text-2xl font-black text-legali-orange">₦{plan.annualPrice.toLocaleString()}</p>
              <p className="text-xs text-legali-gray mb-3">/year</p>
              <ul className="flex flex-col gap-1">
                {plan.features.slice(0, 3).map(f => <li key={f} className="text-xs flex items-center gap-1.5"><Check size={11} className="text-legali-orange" />{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={() => setShowUpgrade(false)} className="btn-ghost flex-1 justify-center">Cancel</button>
          <button disabled={!selectedPlan} onClick={() => { alert('Payment gateway integration — Paystack/Flutterwave'); setShowUpgrade(false); }} className="btn-primary flex-1 justify-center">
            Proceed to Payment
          </button>
        </div>
      </Modal>
    </div>
  );
}
