import { useState } from 'react';
import { DollarSign, Calculator, Shield, Zap, Info } from 'lucide-react';
import { COVERAGE_AREAS, SUBSCRIPTION_PLANS } from '../../data/mockData';

export default function CalculatorPage() {
  const [serviceType, setServiceType] = useState<'insurance' | 'immediate'>('insurance');
  const [planId, setPlanId] = useState('standard');
  const [duration, setDuration] = useState<'quarterly' | 'annual'>('annual');
  const [areas, setAreas] = useState<string[]>(['housing']);

  const toggleArea = (id: string) => setAreas(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);

  const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
  const basePrice = plan ? (duration === 'annual' ? plan.annualPrice : plan.price) : 0;
  const discount = duration === 'annual' ? 0.167 : 0;
  const savings = duration === 'annual' ? plan ? (plan.price * 4) - plan.annualPrice : 0 : 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-header">Premium Calculator</h1>
        <p className="text-legali-gray mt-1">Estimate your legal coverage costs</p>
      </div>

      {/* Service type toggle */}
      <div className="flex gap-1 p-1 bg-legali-light rounded-xl max-w-sm">
        <button onClick={() => setServiceType('insurance')} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${serviceType === 'insurance' ? 'bg-white shadow-sm text-legali-orange' : 'text-legali-gray'}`}>
          <Shield size={15} /> Insurance
        </button>
        <button onClick={() => setServiceType('immediate')} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${serviceType === 'immediate' ? 'bg-white shadow-sm text-legali-orange' : 'text-legali-gray'}`}>
          <Zap size={15} /> Immediate
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Config panel */}
        <div className="flex flex-col gap-5">
          {serviceType === 'insurance' ? (
            <>
              <div>
                <label className="text-sm font-semibold text-legali-dark mb-3 block">Select Plan</label>
                <div className="flex flex-col gap-2">
                  {SUBSCRIPTION_PLANS.map(p => (
                    <label key={p.id} onClick={() => setPlanId(p.id)} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${planId === p.id ? 'border-legali-orange bg-legali-orange/5' : 'border-legali-border hover:border-legali-orange/50'}`}>
                      <input type="radio" checked={planId === p.id} readOnly className="accent-legali-orange" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-legali-dark">{p.name}</p>
                        <p className="text-xs text-legali-gray">{p.coverageAreas} coverage {p.coverageAreas === 1 ? 'area' : 'areas'}</p>
                      </div>
                      <p className="font-bold text-legali-orange text-sm">₦{p.annualPrice.toLocaleString()}/yr</p>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-legali-dark mb-3 block">Billing Period</label>
                <div className="flex gap-2">
                  <button onClick={() => setDuration('quarterly')} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${duration === 'quarterly' ? 'border-legali-orange bg-legali-orange/5 text-legali-orange' : 'border-legali-border text-legali-gray'}`}>Quarterly</button>
                  <button onClick={() => setDuration('annual')} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all relative ${duration === 'annual' ? 'border-legali-orange bg-legali-orange/5 text-legali-orange' : 'border-legali-border text-legali-gray'}`}>
                    Annual
                    <span className="absolute -top-2 -right-1 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">Save 17%</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-sm font-semibold text-legali-dark mb-3 block">Select Coverage Areas Needed</label>
                <div className="grid grid-cols-2 gap-2">
                  {COVERAGE_AREAS.map(a => (
                    <label key={a.id} onClick={() => toggleArea(a.id)} className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${areas.includes(a.id) ? 'border-legali-orange bg-legali-orange/5' : 'border-legali-border hover:border-legali-orange/50'}`}>
                      <input type="checkbox" checked={areas.includes(a.id)} readOnly className="accent-legali-orange" />
                      <span className="text-sm">{a.icon}</span>
                      <span className="text-xs font-medium text-legali-dark">{a.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <Info size={16} className="text-blue-600 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-700 leading-relaxed">Legal Immediate sessions are charged at <strong>₦50,000 per session</strong> (up to 3 hours). Payment is held in escrow until service delivery.</p>
              </div>
            </>
          )}
        </div>

        {/* Price summary */}
        <div className="card flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center">
              <Calculator size={20} className="text-white" />
            </div>
            <div>
              <p className="font-display font-bold text-legali-dark">Price Summary</p>
              <p className="text-xs text-legali-gray">Your estimated cost</p>
            </div>
          </div>

          {serviceType === 'insurance' ? (
            <>
              <div className="flex flex-col gap-2 py-3 border-y border-legali-border">
                <div className="flex justify-between text-sm"><span className="text-legali-gray">Base Plan ({plan?.name})</span><span className="font-medium">₦{(duration === 'annual' ? (plan?.price ?? 0) * 4 : (plan?.price ?? 0)).toLocaleString()}</span></div>
                {duration === 'annual' && savings > 0 && <div className="flex justify-between text-sm text-green-600"><span>Annual Discount</span><span>-₦{savings.toLocaleString()}</span></div>}
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-legali-dark">Total ({duration})</span>
                <span className="text-3xl font-black font-display text-legali-orange">₦{basePrice.toLocaleString()}</span>
              </div>
              {savings > 0 && <p className="text-xs text-green-600 font-semibold">✓ You save ₦{savings.toLocaleString()} with annual billing</p>}
              <div className="bg-legali-light rounded-xl p-3 text-xs flex flex-col gap-1.5">
                {plan?.features.slice(0, 4).map(f => <p key={f} className="flex items-center gap-2"><span className="text-legali-orange">✓</span>{f}</p>)}
              </div>
              <button className="btn-primary justify-center">Get This Plan →</button>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2 py-3 border-y border-legali-border">
                <div className="flex justify-between text-sm"><span className="text-legali-gray">Session Rate</span><span className="font-medium">₦50,000</span></div>
                <div className="flex justify-between text-sm"><span className="text-legali-gray">Areas Selected</span><span className="font-medium">{areas.length}</span></div>
                <div className="flex justify-between text-sm"><span className="text-legali-gray">Sessions Estimated</span><span className="font-medium">{areas.length}</span></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-legali-dark">Estimated Total</span>
                <span className="text-3xl font-black font-display text-legali-orange">₦{(areas.length * 50000).toLocaleString()}</span>
              </div>
              <p className="text-xs text-legali-gray">Note: This is an estimate. Actual cost depends on complexity and session length (max 3hrs per session).</p>
              <div className="flex items-center gap-2 p-3 bg-legali-orange/5 rounded-xl border border-legali-orange/20 text-xs">
                <Shield size={14} className="text-legali-orange shrink-0" />
                <span>30% less than standard industry rates</span>
              </div>
              <button className="btn-primary justify-center">Find a Lawyer Now →</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
