import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LegaliLogo from '../ui/LegaliLogo';

export default function PublicNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-legali-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" onClick={() => setOpen(false)}>
            <LegaliLogo size="sm" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/#features" className="text-sm font-medium text-legali-gray hover:text-legali-orange transition-colors">Features</Link>
            <Link to="/#coverage" className="text-sm font-medium text-legali-gray hover:text-legali-orange transition-colors">Coverage</Link>
            <Link to="/#pricing" className="text-sm font-medium text-legali-gray hover:text-legali-orange transition-colors">Pricing</Link>
            <Link to="/knowledge" className="text-sm font-medium text-legali-gray hover:text-legali-orange transition-colors">Legal Blog</Link>
            <Link to="/find-lawyer" className="text-sm font-medium text-legali-gray hover:text-legali-orange transition-colors">Find a Lawyer</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate('/login')} className="btn-ghost text-sm py-2 px-4">Sign In</button>
            <button onClick={() => navigate('/register')} className="btn-primary text-sm py-2.5 px-5">Get Covered</button>
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-legali-light" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-legali-border px-4 py-4 flex flex-col gap-3">
          {['Features','Coverage','Pricing'].map(item => (
            <Link key={item} to={`/#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="text-sm font-medium text-legali-gray py-2">{item}</Link>
          ))}
          <Link to="/knowledge" onClick={() => setOpen(false)} className="text-sm font-medium text-legali-gray py-2">Legal Blog</Link>
          <div className="flex flex-col gap-2 pt-2 border-t border-legali-border">
            <button onClick={() => { setOpen(false); navigate('/login'); }} className="btn-ghost text-sm justify-center">Sign In</button>
            <button onClick={() => { setOpen(false); navigate('/register'); }} className="btn-primary text-sm justify-center">Get Covered</button>
          </div>
        </div>
      )}
    </nav>
  );
}
