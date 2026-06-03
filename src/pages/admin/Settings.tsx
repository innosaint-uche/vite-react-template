import { useState } from 'react';
import { Check, Shield, CreditCard, Mail, Bell, Globe, Key, AlertTriangle } from 'lucide-react';

const tabs = ['General', 'Integrations', 'OAuth', 'Email & SMS', 'Security', 'NAICOM'];

export default function AdminSettings() {
  const [tab, setTab] = useState('General');
  const [saved, setSaved] = useState(false);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-header">Platform Settings</h1>
        <p className="text-legali-gray mt-1">Configure integrations, OAuth, APIs and platform behaviour</p>
      </div>

      <div className="flex gap-1 p-1 bg-legali-light rounded-xl overflow-x-auto scrollbar-hide">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${tab === t ? 'bg-white shadow-sm text-legali-orange' : 'text-legali-gray hover:text-legali-dark'}`}>{t}</button>
        ))}
      </div>

      {tab === 'General' && (
        <form onSubmit={save} className="card flex flex-col gap-5">
          <h2 className="section-title">Platform Configuration</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-legali-gray mb-1.5 block">Platform Name</label><input defaultValue="Legali" className="input-field" /></div>
            <div><label className="text-xs font-semibold text-legali-gray mb-1.5 block">Support Email</label><input defaultValue="support@legali.ng" className="input-field" /></div>
            <div><label className="text-xs font-semibold text-legali-gray mb-1.5 block">Support Phone</label><input defaultValue="0800-LEGALI" className="input-field" /></div>
            <div><label className="text-xs font-semibold text-legali-gray mb-1.5 block">Lawyer Revenue Share (%)</label><input type="number" defaultValue={75} min={50} max={90} className="input-field" /></div>
            <div><label className="text-xs font-semibold text-legali-gray mb-1.5 block">Legal Immediate Fee (₦)</label><input type="number" defaultValue={50000} className="input-field" /></div>
            <div><label className="text-xs font-semibold text-legali-gray mb-1.5 block">Min Quarterly Premium (₦)</label><input type="number" defaultValue={10000} className="input-field" /></div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-legali-border">
            {saved && <span className="flex items-center gap-2 text-green-600 text-sm font-semibold"><Check size={15} />Settings saved!</span>}
            <button type="submit" className="btn-primary ml-auto">Save Settings</button>
          </div>
        </form>
      )}

      {tab === 'Integrations' && (
        <div className="flex flex-col gap-4">
          {[
            {
              icon: CreditCard, name: 'Paystack', desc: 'Primary payment gateway for subscriptions and escrow', connected: true,
              fields: [{ label: 'Public Key', value: 'pk_live_••••••••••••••••••••••' }, { label: 'Secret Key', value: 'sk_live_••••••••••••••••••••••' }]
            },
            {
              icon: CreditCard, name: 'Flutterwave', desc: 'Secondary payment gateway and alternative checkout', connected: false,
              fields: [{ label: 'Public Key', value: '' }, { label: 'Secret Key', value: '' }]
            },
            {
              icon: Globe, name: 'Google Maps API', desc: 'Lawyer geo-locator and proximity search', connected: true,
              fields: [{ label: 'API Key', value: 'AIza••••••••••••••••••••••••••' }]
            },
            {
              icon: Bell, name: 'Firebase FCM', desc: 'Push notifications for case updates and messages', connected: true,
              fields: [{ label: 'Server Key', value: 'AAAA••••••••••••••••••••••' }]
            },
            {
              icon: Shield, name: 'Termii SMS', desc: 'OTP and SMS notifications for Nigerian numbers', connected: false,
              fields: [{ label: 'API Key', value: '' }, { label: 'Sender ID', value: 'LEGALI' }]
            },
          ].map(({ icon: Icon, name, desc, connected, fields }) => (
            <div key={name} className="card flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-dark flex items-center justify-center"><Icon size={18} className="text-white" /></div>
                  <div><p className="font-bold text-legali-dark">{name}</p><p className="text-xs text-legali-gray">{desc}</p></div>
                </div>
                <span className={connected ? 'badge-green' : 'badge-gray'}>{connected ? 'Connected' : 'Not connected'}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {fields.map(f => (
                  <div key={f.label}>
                    <label className="text-xs font-semibold text-legali-gray mb-1.5 block">{f.label}</label>
                    <input defaultValue={f.value} placeholder={`Enter ${f.label}`} type="password" className="input-field font-mono text-sm" />
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary text-sm py-2 px-4">Test Connection</button>
                <button className="btn-primary text-sm py-2 px-4">Save & Connect</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'OAuth' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
            <Shield size={18} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">OAuth allows users to sign in with Google or Apple without creating a separate password. Configure the client IDs and secrets from each provider's developer console.</p>
          </div>
          {[
            { name: 'Google OAuth 2.0', icon: '🔵', enabled: true, fields: ['Client ID', 'Client Secret', 'Redirect URI'] },
            { name: 'Apple Sign-In', icon: '🍎', enabled: false, fields: ['App ID', 'Team ID', 'Key ID', 'Private Key'] },
          ].map(({ name, icon, enabled, fields }) => (
            <div key={name} className="card flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{icon}</span>
                  <div><p className="font-bold text-legali-dark">{name}</p><span className={enabled ? 'badge-green' : 'badge-gray'}>{enabled ? 'Enabled' : 'Disabled'}</span></div>
                </div>
                <div className={`relative w-11 h-6 rounded-full cursor-pointer ${enabled ? 'gradient-orange' : 'bg-legali-border'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${enabled ? 'right-1' : 'left-1'}`} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {fields.map(f => (
                  <div key={f}>
                    <label className="text-xs font-semibold text-legali-gray mb-1.5 block">{f}</label>
                    <input placeholder={`Enter ${f}`} className="input-field text-sm" />
                  </div>
                ))}
              </div>
              <button className="btn-primary text-sm py-2 w-fit">Save OAuth Config</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'Email & SMS' && (
        <div className="flex flex-col gap-4">
          <div className="card flex flex-col gap-4">
            <h2 className="section-title">Email Configuration (SendGrid)</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-xs font-semibold text-legali-gray mb-1.5 block">API Key</label><input type="password" placeholder="SG.••••" className="input-field" /></div>
              <div><label className="text-xs font-semibold text-legali-gray mb-1.5 block">From Email</label><input defaultValue="noreply@legali.ng" className="input-field" /></div>
              <div><label className="text-xs font-semibold text-legali-gray mb-1.5 block">From Name</label><input defaultValue="Legali Platform" className="input-field" /></div>
              <div><label className="text-xs font-semibold text-legali-gray mb-1.5 block">Reply-To</label><input defaultValue="support@legali.ng" className="input-field" /></div>
            </div>
            <div className="flex gap-2">
              <button className="btn-secondary text-sm py-2">Send Test Email</button>
              <button className="btn-primary text-sm py-2">Save</button>
            </div>
          </div>

          <div className="card flex flex-col gap-4">
            <h2 className="section-title">Email Templates</h2>
            {['Welcome Email', 'Case Assigned', 'Payment Confirmed', 'Lawyer Verified', 'Password Reset'].map(t => (
              <div key={t} className="flex items-center justify-between py-2 border-b border-legali-border last:border-0">
                <div className="flex items-center gap-3"><Mail size={16} className="text-legali-orange" /><span className="text-sm font-medium text-legali-dark">{t}</span></div>
                <button className="btn-ghost text-xs py-1 px-3">Edit Template</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Security' && (
        <div className="flex flex-col gap-4">
          <div className="card flex flex-col gap-4">
            <h2 className="section-title">Platform Security</h2>
            {[
              { label: 'Force 2FA for Lawyers', desc: 'Require two-factor authentication for all verified lawyers', on: true },
              { label: 'KYC Required for Subscriptions', desc: 'Users must complete KYC before subscribing to paid plans', on: true },
              { label: 'Escrow Auto-Release', desc: 'Automatically release escrow 48hrs after case marked complete', on: false },
              { label: 'IP Rate Limiting', desc: 'Limit API requests to 100/min per IP address', on: true },
            ].map(({ label, desc, on }) => (
              <div key={label} className="flex items-start justify-between gap-4 py-3 border-b border-legali-border last:border-0">
                <div><p className="font-semibold text-sm text-legali-dark">{label}</p><p className="text-xs text-legali-gray mt-0.5">{desc}</p></div>
                <div className={`relative w-11 h-6 rounded-full cursor-pointer shrink-0 ${on ? 'gradient-orange' : 'bg-legali-border'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${on ? 'right-1' : 'left-1'}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="card flex flex-col gap-3">
            <div className="flex items-center gap-2 text-yellow-600 mb-1"><AlertTriangle size={16} /><span className="font-bold text-sm">Danger Zone</span></div>
            <button className="btn-danger text-sm w-fit">Clear All Sessions</button>
            <button className="btn-danger text-sm w-fit">Purge Rate Limit Cache</button>
          </div>
        </div>
      )}

      {tab === 'NAICOM' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 p-4 bg-legali-orange/5 border border-legali-orange/20 rounded-2xl">
            <Shield size={18} className="text-legali-orange shrink-0 mt-0.5" />
            <p className="text-sm text-legali-dark">Legali operates under NAICOM (National Insurance Commission of Nigeria) regulatory framework. Ensure all configuration aligns with NAICOM guidelines for digital insurance platforms.</p>
          </div>
          <div className="card flex flex-col gap-4">
            <h2 className="section-title">NAICOM Registration Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[['License Number', 'NAICOM-2025-DIG-XXXX'], ['Regulatory Category', 'Digital Insurance Platform'], ['Annual Report Due', 'March 31, 2026'], ['Compliance Officer', 'To be appointed']].map(([l, v]) => (
                <div key={l} className="bg-legali-light rounded-xl p-3">
                  <p className="text-xs text-legali-gray">{l}</p>
                  <p className="font-semibold text-sm text-legali-dark mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            <button className="btn-secondary text-sm w-fit">Download Compliance Report</button>
          </div>
        </div>
      )}
    </div>
  );
}
