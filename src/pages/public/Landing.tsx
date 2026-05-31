import { useNavigate } from 'react-router-dom';
import { Shield, Zap, MapPin, BookOpen, Phone, Lock, ChevronRight, Star, Check, ArrowRight, Users, Gavel, TrendingUp } from 'lucide-react';
import PublicNav from '../../components/layout/PublicNav';
import LegaliLogo from '../../components/ui/LegaliLogo';
import { SUBSCRIPTION_PLANS, COVERAGE_AREAS } from '../../data/mockData';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans">
      <PublicNav />

      {/* HERO */}
      <section className="gradient-hero min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="inline-flex items-center gap-2 bg-legali-orange/20 border border-legali-orange/30 text-legali-orange px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-legali-orange animate-pulse" />
                Nigeria's Premier Legal Coverage Platform
              </span>
              <h1 className="text-5xl lg:text-6xl font-display font-black leading-[1.05] mb-6">
                Stay On Guard,<br />
                <span className="text-gradient">Stay Covered.</span>
              </h1>
              <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-lg">
                Legali democratizes legal representation and makes it accessible to all Nigerians. Get affordable legal coverage, advisory, and knowledge — right at your fingertips.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <button onClick={() => navigate('/register')} className="btn-primary text-base px-8 py-3.5">
                  Get Covered Now <ArrowRight size={18} />
                </button>
                <button onClick={() => navigate('/login')} className="btn-secondary text-base px-8 py-3.5">
                  Sign In
                </button>
              </div>
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Users, value: '1,847+', label: 'Nigerians Covered' },
                  { icon: Gavel, value: '234+', label: 'Verified Lawyers' },
                  { icon: TrendingUp, value: '3,421+', label: 'Cases Resolved' },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-legali-orange/20 flex items-center justify-center">
                      <Icon size={15} className="text-legali-orange" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{value}</p>
                      <p className="text-white/60 text-xs">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero card */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="card shadow-legali-lg p-0 overflow-hidden">
                  <div className="gradient-orange p-6">
                    <LegaliLogo variant="light" size="sm" />
                    <p className="text-white/80 text-sm mt-2">Legal Insurance — Stay Covered</p>
                    <div className="mt-4 bg-white/20 rounded-xl p-4">
                      <p className="text-white text-xs font-medium">Active Coverage</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                          <div className="h-full bg-white rounded-full" style={{ width: '65%' }} />
                        </div>
                        <span className="text-white text-xs font-bold">65%</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-legali-gray">Plan</span>
                      <span className="badge-orange">Standard</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-legali-gray">Coverage Areas</span>
                      <span className="text-sm font-bold text-legali-dark">3 Areas</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-legali-gray">Annual Premium</span>
                      <span className="text-sm font-bold text-legali-dark">₦70,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-legali-gray">Assigned Lawyer</span>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-legali-orange flex items-center justify-center text-white text-xs font-bold">A</div>
                        <span className="text-sm font-bold text-legali-dark">Adaeze O.</span>
                      </div>
                    </div>
                    <div className="border-t border-legali-border pt-4">
                      <div className="flex gap-2">
                        <span className="badge-green">Active</span>
                        <span className="badge-blue">Housing</span>
                        <span className="badge-orange">Employment</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating notification */}
                <div className="absolute -bottom-6 -left-6 card shadow-card-hover p-3 flex items-center gap-3 min-w-[200px]">
                  <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center">
                    <Shield size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-legali-dark">Lawyer Assigned!</p>
                    <p className="text-xs text-legali-gray">Adaeze Okonkwo is on your case</p>
                  </div>
                </div>

                {/* Floating rating */}
                <div className="absolute -top-4 -right-4 card shadow-card-hover p-3 flex items-center gap-2">
                  <div className="flex">
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <span className="text-xs font-bold text-legali-dark">4.9</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-legali-light border-y border-legali-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-legali-gray font-medium">
            <span className="flex items-center gap-2"><Lock size={14} className="text-legali-orange" /> Bank-level Encryption</span>
            <span className="flex items-center gap-2"><Shield size={14} className="text-legali-orange" /> NBA Verified Lawyers</span>
            <span className="flex items-center gap-2"><Check size={14} className="text-legali-orange" /> Escrow Payment Protection</span>
            <span className="flex items-center gap-2"><Star size={14} className="text-legali-orange" /> 4.9/5 Average Rating</span>
            <span className="flex items-center gap-2"><Phone size={14} className="text-legali-orange" /> 24/7 Emergency Support</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="badge-orange mb-4 inline-block">Product Features</span>
            <h2 className="text-4xl font-display font-bold text-legali-dark mb-4">Everything You Need,<br />Covered & On Guard</h2>
            <p className="text-legali-gray text-lg max-w-2xl mx-auto">From emergency legal calls to full insurance coverage, Legali gives you all the tools to navigate Nigeria's legal landscape.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Legal Insurance', desc: 'Stay Covered with annual plans from ₦40,000. Get representation when you need it most.', badge: 'Stay Covered', color: 'orange' },
              { icon: Zap, title: 'Legal Immediate', desc: 'Need a lawyer NOW? Access qualified lawyers within 2 hours via our e-hailing model.', badge: 'Stay Guarded', color: 'dark' },
              { icon: Phone, title: 'Emergency Call Button', desc: 'One tap to connect with a lawyer in a legal emergency. Available 24/7 for subscribers.', badge: 'Freemium', color: 'orange' },
              { icon: MapPin, title: 'Lawyer Geo-Locator', desc: 'Find verified lawyers near you. Filter by specialization, rating, and availability.', badge: 'All Plans', color: 'dark' },
              { icon: BookOpen, title: 'Legal Knowledge Hub', desc: "Do's & Don'ts, legal news, and expert articles. Stay informed about your rights.", badge: 'Free', color: 'orange' },
              { icon: Lock, title: 'Escrow Protection', desc: 'Your payment is held securely until service is delivered. Money-back guarantee.', badge: 'All Plans', color: 'dark' },
            ].map(({ icon: Icon, title, desc, badge, color }) => (
              <div key={title} className="card-hover group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color === 'orange' ? 'gradient-orange' : 'gradient-dark'}`}>
                  <Icon size={22} className="text-white" />
                </div>
                <span className={color === 'orange' ? 'badge-orange' : 'badge-gray'}>{badge}</span>
                <h3 className="text-lg font-display font-bold text-legali-dark mt-3 mb-2 group-hover:text-legali-orange transition-colors">{title}</h3>
                <p className="text-legali-gray text-sm leading-relaxed">{desc}</p>
                <div className="mt-4 flex items-center gap-1 text-legali-orange text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-legali-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="badge-orange mb-4 inline-block">How It Works</span>
            <h2 className="text-4xl font-display font-bold text-legali-dark mb-4">Get Legal Coverage in Minutes</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Sign Up Free', desc: 'Create your account in under 2 minutes. No card required for basic access.' },
              { step: '02', title: 'Choose Your Plan', desc: 'Pick Legal Insurance (Stay Covered) or Legal Immediate (Stay Guarded).' },
              { step: '03', title: 'Get Matched', desc: 'Our platform assigns the best verified lawyer for your case and location.' },
              { step: '04', title: 'Live Legali!', desc: 'Get legal representation, track your case, and live free — covered and guarded.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="card text-center relative">
                <div className="w-12 h-12 rounded-2xl gradient-orange flex items-center justify-center text-white font-black font-display text-lg mx-auto mb-4">{step}</div>
                <h3 className="font-display font-bold text-legali-dark mb-2">{title}</h3>
                <p className="text-sm text-legali-gray leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE AREAS */}
      <section id="coverage" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="badge-orange mb-4 inline-block">Coverage Areas</span>
            <h2 className="text-4xl font-display font-bold text-legali-dark mb-4">We've Got You Covered</h2>
            <p className="text-legali-gray text-lg max-w-xl mx-auto">From personal legal challenges to business needs, Legali covers the areas that matter most to Nigerians.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COVERAGE_AREAS.map(({ id, label, icon, description }) => (
              <div key={id} className="card-hover text-center p-5">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-display font-bold text-legali-dark mb-1">{label}</h3>
                <p className="text-xs text-legali-gray">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 bg-legali-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="badge-orange mb-4 inline-block">Pricing</span>
            <h2 className="text-4xl font-display font-bold text-legali-dark mb-4">Affordable Legal Coverage for Every Nigerian</h2>
            <p className="text-legali-gray text-lg">Starting from ₦10,000/quarter — less than ₦33/day to stay protected.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div key={plan.id} className={`card relative flex flex-col ${plan.popular ? 'ring-2 ring-legali-orange shadow-legali-lg scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge-orange px-4 py-1 text-xs font-bold">Most Popular</span>
                  </div>
                )}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${plan.color === 'orange' ? 'gradient-orange' : plan.color === 'dark' ? 'gradient-dark' : 'bg-gray-100'}`}>
                  <Shield size={18} className={plan.color === 'gray' ? 'text-gray-600' : 'text-white'} />
                </div>
                <h3 className="text-xl font-display font-bold text-legali-dark">{plan.name}</h3>
                <div className="mt-3 mb-1">
                  <span className="text-3xl font-black font-display text-legali-dark">₦{(plan.annualPrice).toLocaleString()}</span>
                  <span className="text-legali-gray text-sm">/year</span>
                </div>
                <p className="text-xs text-legali-gray mb-5">(₦{plan.price.toLocaleString()}/quarter)</p>

                <ul className="flex flex-col gap-2 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-legali-dark">
                      <Check size={15} className="text-legali-orange mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button onClick={() => navigate('/register')} className={plan.popular ? 'btn-primary justify-center' : 'btn-secondary justify-center'}>
                  Get {plan.name}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-legali-gray text-sm">Need immediate legal help? <button onClick={() => navigate('/register')} className="text-legali-orange font-semibold hover:underline">Try Legal Immediate — ₦50,000/session</button></p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-display font-bold text-legali-dark mb-4">Nigerians Living Legali</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Chidi Okonkwo', role: 'Entrepreneur, Lagos', text: 'When my landlord tried to illegally evict me, Legali connected me with a lawyer in under 3 hours. The case was resolved in my favor. Worth every kobo!', rating: 5 },
              { name: 'Amaka Nwosu', role: 'Fashion Designer, Abuja', text: 'I registered my brand trademark through Legali. The process was seamless and the lawyer was professional. My brand is now fully protected.', rating: 5 },
              { name: 'Tolu Adeyemi', role: 'Tech Professional, Lagos', text: 'Got wrongfully terminated. Legali\'s lawyer negotiated a settlement that was 3x my severance offer. Truly an aura for aura service!', rating: 5 },
            ].map(({ name, role, text, rating }) => (
              <div key={name} className="card">
                <div className="flex mb-3">
                  {Array.from({ length: rating }).map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-legali-dark text-sm leading-relaxed mb-4 italic">"{text}"</p>
                <div className="flex items-center gap-3 border-t border-legali-border pt-4">
                  <div className="w-10 h-10 rounded-full gradient-orange flex items-center justify-center text-white font-bold text-sm">{name.charAt(0)}</div>
                  <div>
                    <p className="font-semibold text-legali-dark text-sm">{name}</p>
                    <p className="text-legali-gray text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-display font-black text-white mb-4">
            To Live Free Is To <span className="text-gradient">Live Legali!</span>
          </h2>
          <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">Join thousands of Nigerians who are already covered and on guard. Start free today.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => navigate('/register')} className="btn-primary text-lg px-10 py-4">Get Started Free <ArrowRight size={20} /></button>
            <button onClick={() => navigate('/find-lawyer')} className="btn-secondary text-lg px-10 py-4">Find a Lawyer</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-legali-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <LegaliLogo variant="light" size="sm" showTagline />
              <p className="text-white/60 text-sm mt-3 leading-relaxed">Democratizing legal representation and making it accessible to all Nigerians.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Legal Insurance', 'Legal Immediate', 'Find a Lawyer'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press', 'Contact'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 className="font-display font-bold text-sm mb-4 text-white/90">{title}</h4>
                <ul className="flex flex-col gap-2">
                  {links.map(l => <li key={l}><a href="#" className="text-white/60 text-sm hover:text-legali-orange transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">© 2025 Legali Technologies Ltd. All rights reserved. RC: xxxxxxx</p>
            <p className="text-white/50 text-sm">Licensed by NAICOM | NBA Registered Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
