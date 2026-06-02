import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowLeft, Check, Briefcase } from 'lucide-react';
import LegaliLogo from '../../components/ui/LegaliLogo';
import { useAuthStore } from '../../store/authStore';

type AccountType = 'customer' | 'lawyer';

export default function Register() {
  const [type, setType] = useState<AccountType>('customer');
  const [step, setStep] = useState(1);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', barNumber: '', specialization: '' });
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const update = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    login(type, form.name || (type === 'customer' ? 'Tunde Bakare' : 'Adaeze Okonkwo'));
    navigate(`/${type}`);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-legali-light flex">
      <div className="hidden lg:flex lg:w-1/2 gradient-hero flex-col justify-between p-12">
        <LegaliLogo variant="light" size="md" showTagline />
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-4">Join 1,847+ Nigerians<br />Living Legali</h2>
          <div className="flex flex-col gap-3">
            {['Free sign-up, no card required', 'Access Nigeria\'s top verified lawyers', 'Escrow payment protection', 'Emergency legal call button'].map(f => (
              <div key={f} className="flex items-center gap-3 text-white/80 text-sm">
                <div className="w-5 h-5 rounded-full bg-legali-orange/30 flex items-center justify-center"><Check size={11} className="text-legali-orange" /></div>
                {f}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/10 rounded-2xl p-4">
          <p className="text-white/80 text-xs">🎉 Special Launch Offer</p>
          <p className="text-white font-bold text-lg font-display mt-1">20% off your first subscription</p>
          <p className="text-white/60 text-xs mt-1">Use code <span className="text-legali-orange font-bold">LEGALI20</span> at checkout</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 text-legali-gray text-sm mb-8 hover:text-legali-orange transition-colors">
            <ArrowLeft size={16} /> Back to home
          </Link>

          <div className="mb-8">
            <div className="lg:hidden mb-6"><LegaliLogo size="md" /></div>
            <h1 className="text-3xl font-display font-bold text-legali-dark">
              {step === 1 ? 'Create your account' : 'Almost there!'}
            </h1>
            <p className="text-legali-gray mt-1">
              {step === 1 ? 'Get covered in minutes. Free forever.' : 'Tell us a bit more about yourself.'}
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${s <= step ? 'gradient-orange text-white' : 'bg-legali-border text-legali-gray'}`}>
                  {s < step ? <Check size={13} /> : s}
                </div>
                {s < 2 && <div className={`h-1 flex-1 rounded-full w-20 ${step > 1 ? 'bg-legali-orange' : 'bg-legali-border'}`} />}
              </div>
            ))}
          </div>

          {/* Account type */}
          {step === 1 && (
            <div className="flex gap-3 mb-5">
              {(['customer', 'lawyer'] as AccountType[]).map(t => (
                <button key={t} onClick={() => setType(t)} className={`flex-1 p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${type === t ? 'border-legali-orange bg-legali-orange/5' : 'border-legali-border bg-white hover:border-legali-orange/50'}`}>
                  {t === 'customer' ? <User size={20} className={type === t ? 'text-legali-orange' : 'text-legali-gray'} /> : <Briefcase size={20} className={type === t ? 'text-legali-orange' : 'text-legali-gray'} />}
                  <span className={`text-sm font-semibold capitalize ${type === t ? 'text-legali-orange' : 'text-legali-gray'}`}>{t === 'customer' ? 'I Need Legal Help' : 'I Am a Lawyer'}</span>
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {step === 1 ? (
              <>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-legali-gray" />
                  <input type="text" placeholder="Full name" value={form.name} onChange={e => update('name', e.target.value)} className="input-field pl-10" required />
                </div>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-legali-gray" />
                  <input type="email" placeholder="Email address" value={form.email} onChange={e => update('email', e.target.value)} className="input-field pl-10" required />
                </div>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-legali-gray" />
                  <input type="tel" placeholder="Phone number (080XXXXXXXX)" value={form.phone} onChange={e => update('phone', e.target.value)} className="input-field pl-10" required />
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-legali-gray" />
                  <input type={showPw ? 'text' : 'password'} placeholder="Password (min. 8 characters)" value={form.password} onChange={e => update('password', e.target.value)} className="input-field pl-10 pr-10" required minLength={8} />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-legali-gray">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="card bg-legali-light p-4">
                  <p className="text-sm text-legali-gray">Account type: <span className="font-bold text-legali-dark capitalize">{type}</span></p>
                  <p className="text-sm text-legali-gray mt-1">Name: <span className="font-bold text-legali-dark">{form.name}</span></p>
                  <p className="text-sm text-legali-gray mt-1">Email: <span className="font-bold text-legali-dark">{form.email}</span></p>
                </div>
                {type === 'lawyer' ? (
                  <>
                    <input type="text" placeholder="NBA Bar Number (e.g. NBA-2020-LG-XXXXX)" value={form.barNumber} onChange={e => update('barNumber', e.target.value)} className="input-field" required />
                    <select value={form.specialization} onChange={e => update('specialization', e.target.value)} className="input-field" required>
                      <option value="">Select Primary Specialization</option>
                      {['Housing & Tenancy', 'Divorce & Family', 'Employment & Labour', 'Criminal Defense', 'Corporate & IP', 'Law Enforcement'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <textarea placeholder="Brief professional bio..." rows={3} className="input-field resize-none" />
                  </>
                ) : (
                  <>
                    <select className="input-field" required>
                      <option value="">State of residence</option>
                      {['Lagos', 'Abuja (FCT)', 'Ogun', 'Oyo', 'Rivers', 'Delta'].map(s => <option key={s}>{s}</option>)}
                    </select>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" id="agree" checked={form.agree} onChange={e => update('agree', e.target.checked)} className="mt-0.5" required />
                      <label htmlFor="agree" className="text-xs text-legali-gray leading-relaxed">
                        I agree to Legali's <a href="#" className="text-legali-orange hover:underline">Terms of Service</a> and <a href="#" className="text-legali-orange hover:underline">Privacy Policy</a>. I understand my data is protected.
                      </label>
                    </div>
                  </>
                )}
              </>
            )}

            <button type="submit" disabled={loading} className="btn-primary justify-center w-full py-3.5">
              {loading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" /> : step === 1 ? 'Continue →' : 'Create Account & Get Covered'}
            </button>

            {step === 2 && (
              <button type="button" onClick={() => setStep(1)} className="btn-ghost justify-center w-full text-sm">← Go back</button>
            )}
          </form>

          <p className="text-center text-sm text-legali-gray mt-6">
            Already have an account? <Link to="/login" className="text-legali-orange font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
