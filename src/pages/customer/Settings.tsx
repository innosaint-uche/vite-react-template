import { useState } from 'react';
import { User, Bell, Lock, Shield, CreditCard, Trash2, Camera, Check } from 'lucide-react';
import { currentCustomer } from '../../data/mockData';

const tabs = ['Profile', 'Security', 'Notifications', 'Billing', 'Privacy'];

export default function Settings() {
  const [tab, setTab] = useState('Profile');
  const [saved, setSaved] = useState(false);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-header">Account Settings</h1>
        <p className="text-legali-gray mt-1">Manage your profile, security and preferences</p>
      </div>

      <div className="flex gap-1 p-1 bg-legali-light rounded-xl overflow-x-auto scrollbar-hide">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${tab === t ? 'bg-white shadow-sm text-legali-orange' : 'text-legali-gray hover:text-legali-dark'}`}>{t}</button>
        ))}
      </div>

      {tab === 'Profile' && (
        <form onSubmit={save} className="grid lg:grid-cols-3 gap-6">
          <div className="card flex flex-col items-center gap-4 py-8">
            <div className="relative">
              <img src={currentCustomer.avatar} alt="Avatar" className="w-24 h-24 rounded-2xl" />
              <button type="button" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl gradient-orange flex items-center justify-center">
                <Camera size={14} className="text-white" />
              </button>
            </div>
            <div className="text-center">
              <p className="font-bold font-display text-legali-dark">{currentCustomer.name}</p>
              <span className="badge-orange mt-1">Standard Plan</span>
            </div>
            <div className="w-full border-t border-legali-border pt-4 flex flex-col gap-2">
              {[['KYC Verified', true], ['Email Verified', true], ['Phone Verified', false]].map(([l, v]) => (
                <div key={l as string} className="flex items-center justify-between text-sm">
                  <span className="text-legali-gray">{l as string}</span>
                  <span className={v ? 'badge-green' : 'badge-yellow'}>{v ? 'Verified' : 'Pending'}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 card flex flex-col gap-4">
            <h2 className="section-title">Personal Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-legali-gray mb-1.5 block">Full Name</label>
                <input defaultValue={currentCustomer.name} className="input-field" />
              </div>
              <div>
                <label className="text-xs font-semibold text-legali-gray mb-1.5 block">Email Address</label>
                <input type="email" defaultValue={currentCustomer.email} className="input-field" />
              </div>
              <div>
                <label className="text-xs font-semibold text-legali-gray mb-1.5 block">Phone Number</label>
                <input type="tel" defaultValue={currentCustomer.phone} className="input-field" />
              </div>
              <div>
                <label className="text-xs font-semibold text-legali-gray mb-1.5 block">State of Residence</label>
                <select className="input-field" defaultValue="Lagos">
                  {['Lagos', 'Abuja (FCT)', 'Ogun', 'Oyo', 'Rivers', 'Delta'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-legali-gray mb-1.5 block">Gender</label>
              <div className="flex gap-3">
                {['Male', 'Female', 'Prefer not to say'].map(g => (
                  <label key={g} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="gender" value={g} defaultChecked={g === 'Male'} className="accent-legali-orange" />
                    {g}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-legali-border">
              {saved && <span className="flex items-center gap-2 text-green-600 text-sm font-semibold"><Check size={15} />Changes saved!</span>}
              <button type="submit" className="btn-primary ml-auto">Save Changes</button>
            </div>
          </div>
        </form>
      )}

      {tab === 'Security' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card flex flex-col gap-4">
            <h2 className="section-title">Change Password</h2>
            <input type="password" placeholder="Current password" className="input-field" />
            <input type="password" placeholder="New password" className="input-field" />
            <input type="password" placeholder="Confirm new password" className="input-field" />
            <button className="btn-primary w-fit"><Lock size={15} />Update Password</button>
          </div>
          <div className="card flex flex-col gap-4">
            <h2 className="section-title">Two-Factor Authentication</h2>
            <p className="text-sm text-legali-gray">Add an extra layer of security to your account with SMS or authenticator app verification.</p>
            <div className="flex items-center justify-between p-4 bg-legali-light rounded-xl">
              <div>
                <p className="font-semibold text-sm text-legali-dark">SMS Authentication</p>
                <p className="text-xs text-legali-gray mt-0.5">via {currentCustomer.phone}</p>
              </div>
              <div className="relative w-11 h-6 bg-legali-orange rounded-full cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-legali-light rounded-xl">
              <div>
                <p className="font-semibold text-sm text-legali-dark">Authenticator App</p>
                <p className="text-xs text-legali-gray mt-0.5">Google / Authy</p>
              </div>
              <div className="relative w-11 h-6 bg-legali-border rounded-full cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'Notifications' && (
        <div className="card flex flex-col gap-4">
          <h2 className="section-title">Notification Preferences</h2>
          {[
            { label: 'Case Updates', desc: 'Lawyer assigned, case status changes', email: true, sms: true, push: true },
            { label: 'Payment Alerts', desc: 'Payments, escrow releases, receipts', email: true, sms: false, push: true },
            { label: 'Lawyer Messages', desc: 'New messages from your lawyer', email: false, sms: false, push: true },
            { label: 'Promotions & Offers', desc: 'Discounts, new features, newsletter', email: true, sms: false, push: false },
            { label: 'Legal News', desc: 'Weekly legal tips and knowledge', email: true, sms: false, push: false },
          ].map(({ label, desc, email, sms, push }) => (
            <div key={label} className="flex items-start justify-between gap-4 py-3 border-b border-legali-border last:border-0">
              <div>
                <p className="font-semibold text-sm text-legali-dark">{label}</p>
                <p className="text-xs text-legali-gray mt-0.5">{desc}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                {[['Email', email], ['SMS', sms], ['Push', push]].map(([ch, val]) => (
                  <label key={ch as string} className="flex flex-col items-center gap-1 cursor-pointer">
                    <input type="checkbox" defaultChecked={val as boolean} className="accent-legali-orange" />
                    <span className="text-[10px] text-legali-gray">{ch as string}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button className="btn-primary w-fit">Save Preferences</button>
        </div>
      )}

      {tab === 'Billing' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card flex flex-col gap-4">
            <h2 className="section-title">Payment Methods</h2>
            <div className="flex items-center gap-3 p-4 bg-legali-light rounded-xl border-2 border-legali-orange">
              <CreditCard size={20} className="text-legali-orange" />
              <div className="flex-1">
                <p className="font-semibold text-sm text-legali-dark">•••• •••• •••• 4242</p>
                <p className="text-xs text-legali-gray">Expires 08/26 · Visa</p>
              </div>
              <span className="badge-orange">Default</span>
            </div>
            <button className="btn-secondary text-sm gap-2 w-fit"><CreditCard size={15} />Add New Card</button>
          </div>
          <div className="card flex flex-col gap-4">
            <h2 className="section-title">Billing History</h2>
            {[
              { ref: 'LGL-2025-002', desc: 'Standard Plan — Annual', amt: '₦70,000', date: 'Jan 1, 2025', status: 'Paid' },
              { ref: 'LGL-2024-089', desc: 'Standard Plan — Annual', amt: '₦70,000', date: 'Jan 1, 2024', status: 'Paid' },
            ].map(b => (
              <div key={b.ref} className="flex items-center justify-between py-2 border-b border-legali-border last:border-0">
                <div>
                  <p className="text-sm font-semibold text-legali-dark">{b.desc}</p>
                  <p className="text-xs text-legali-gray">{b.ref} · {b.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-legali-dark text-sm">{b.amt}</p>
                  <span className="badge-green">{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Privacy' && (
        <div className="card flex flex-col gap-5">
          <h2 className="section-title">Privacy & Data</h2>
          {[
            { label: 'Share profile with lawyers', desc: 'Allow assigned lawyers to view your profile' },
            { label: 'Analytics & Improvement', desc: 'Help us improve Legali with anonymous usage data' },
            { label: 'Marketing communications', desc: 'Receive personalised offers and updates' },
          ].map(({ label, desc }) => (
            <div key={label} className="flex items-start justify-between gap-4 py-3 border-b border-legali-border last:border-0">
              <div>
                <p className="font-semibold text-sm text-legali-dark">{label}</p>
                <p className="text-xs text-legali-gray mt-0.5">{desc}</p>
              </div>
              <div className="relative w-11 h-6 bg-legali-orange rounded-full cursor-pointer shrink-0">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          ))}
          <div className="border-t border-legali-border pt-4 flex flex-col gap-3">
            <button className="btn-ghost text-sm text-legali-gray w-fit">Download My Data</button>
            <button className="btn-danger text-sm w-fit gap-2"><Trash2 size={15} />Delete Account</button>
          </div>
        </div>
      )}
    </div>
  );
}
