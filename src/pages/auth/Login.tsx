import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import LegaliLogo from '../../components/ui/LegaliLogo';
import { useAuthStore } from '../../store/authStore';
import type { UserRole } from '../../types';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState<UserRole>('customer');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const nameMap: Record<UserRole, string> = { customer: 'Tunde Bakare', lawyer: 'Adaeze Okonkwo', admin: 'Super Admin' };
    login(role, nameMap[role]);
    navigate(`/${role}`);
    setLoading(false);
  };

  const demoLogin = (r: UserRole) => {
    const nameMap: Record<UserRole, string> = { customer: 'Tunde Bakare', lawyer: 'Adaeze Okonkwo', admin: 'Super Admin' };
    login(r, nameMap[r]);
    navigate(`/${r}`);
  };

  return (
    <div className="min-h-screen bg-legali-light flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero flex-col justify-between p-12">
        <LegaliLogo variant="light" size="md" showTagline />
        <div>
          <blockquote className="text-white/90 text-2xl font-display font-bold leading-relaxed italic mb-4">
            "To live free is to live LEGALI."
          </blockquote>
          <p className="text-white/60 text-sm">Because when trouble comes knocking, you'll be ready.</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[['1,847+', 'Users'], ['234+', 'Lawyers'], ['4.9★', 'Rating']].map(([val, label]) => (
            <div key={label} className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-white font-bold text-lg font-display">{val}</p>
              <p className="text-white/60 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 text-legali-gray text-sm mb-8 hover:text-legali-orange transition-colors">
            <ArrowLeft size={16} /> Back to home
          </Link>

          <div className="mb-8">
            <div className="lg:hidden mb-6"><LegaliLogo size="md" /></div>
            <h1 className="text-3xl font-display font-bold text-legali-dark">Welcome back</h1>
            <p className="text-legali-gray mt-1">Sign in to your Legali account</p>
          </div>

          {/* Role tabs */}
          <div className="flex gap-1 p-1 bg-legali-light rounded-xl mb-6">
            {(['customer', 'lawyer', 'admin'] as UserRole[]).map(r => (
              <button key={r} onClick={() => setRole(r)} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${role === r ? 'bg-white shadow-sm text-legali-orange' : 'text-legali-gray hover:text-legali-dark'}`}>
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-legali-gray" />
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className="input-field pl-10" required />
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-legali-gray" />
              <input type={showPw ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input-field pl-10 pr-10" required />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-legali-gray hover:text-legali-dark">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-sm text-legali-orange hover:underline">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className="btn-primary justify-center w-full py-3.5">
              {loading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" /> : 'Sign In'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-legali-border" /><span className="text-xs text-legali-gray">Or demo access</span><div className="flex-1 h-px bg-legali-border" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['customer', 'lawyer', 'admin'] as UserRole[]).map(r => (
                <button key={r} onClick={() => demoLogin(r)} className="text-xs border border-legali-border rounded-xl py-2 px-3 text-legali-gray hover:border-legali-orange hover:text-legali-orange transition-colors capitalize font-medium">
                  {r} Demo
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-legali-gray mt-6">
            Don't have an account? <Link to="/register" className="text-legali-orange font-semibold hover:underline">Get Covered Free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
