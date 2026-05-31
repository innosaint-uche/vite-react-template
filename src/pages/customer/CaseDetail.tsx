import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, MessageSquare, Clock, CheckCircle, AlertCircle, Upload, Send, Shield, DollarSign, Calendar, User } from 'lucide-react';
import { useState } from 'react';
import { mockCases, CASE_TYPE_LABELS } from '../../data/mockData';

const statusColor: Record<string, string> = { pending: 'badge-yellow', assigned: 'badge-blue', in_progress: 'badge-orange', completed: 'badge-green', cancelled: 'badge-red', disputed: 'badge-red' };
const priorityColor: Record<string, string> = { low: 'badge-gray', medium: 'badge-blue', high: 'badge-yellow', urgent: 'badge-red' };

const demoMessages = [
  { id: '1', sender: 'Adaeze Okonkwo', role: 'lawyer', content: 'I have reviewed your documents. The landlord\'s notice is legally insufficient under Section 13 of the Lagos Tenancy Law.', time: '10:30 AM', mine: false },
  { id: '2', sender: 'You', role: 'customer', content: 'That is great news! What are the next steps?', time: '10:35 AM', mine: true },
  { id: '3', sender: 'Adaeze Okonkwo', role: 'lawyer', content: 'I\'ll file for an injunction tomorrow to halt any eviction attempt. Please do not communicate with the landlord directly.', time: '10:40 AM', mine: false },
];

export default function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'messages' | 'documents'>('overview');

  const c = mockCases.find(x => x.id === id) || mockCases[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl hover:bg-legali-light flex items-center justify-center text-legali-gray hover:text-legali-dark transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <h1 className="page-header text-xl">{c.title}</h1>
          <div className="flex gap-2 mt-1 flex-wrap">
            <span className={statusColor[c.status]}>{c.status.replace('_', ' ')}</span>
            <span className={priorityColor[c.priority]}>{c.priority} priority</span>
            <span className="badge-gray">{CASE_TYPE_LABELS[c.type]}</span>
            <span className="badge-blue capitalize">{c.serviceType === 'insurance' ? 'Legal Insurance' : 'Legal Immediate'}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-legali-light rounded-xl max-w-sm">
        {(['overview', 'messages', 'documents'] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${activeTab === t ? 'bg-white shadow-sm text-legali-orange' : 'text-legali-gray'}`}>{t}</button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="card">
              <h2 className="font-display font-bold text-legali-dark mb-3">Case Description</h2>
              <p className="text-sm text-legali-gray leading-relaxed">{c.description}</p>
            </div>

            {/* Timeline */}
            <div className="card">
              <h2 className="font-display font-bold text-legali-dark mb-4">Case Timeline</h2>
              <div className="flex flex-col gap-4">
                {[
                  { icon: FileText, label: 'Case submitted', date: c.createdAt, done: true },
                  { icon: User, label: 'Lawyer assigned', date: c.updatedAt, done: !!c.lawyerId },
                  { icon: Clock, label: 'Session scheduled', date: c.scheduledAt, done: !!c.scheduledAt },
                  { icon: MessageSquare, label: 'In progress', date: null, done: ['in_progress', 'completed'].includes(c.status) },
                  { icon: CheckCircle, label: 'Case completed', date: null, done: c.status === 'completed' },
                ].map(({ icon: Icon, label, date, done }, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${done ? 'gradient-orange' : 'bg-legali-border'}`}>
                      <Icon size={14} className={done ? 'text-white' : 'text-legali-gray'} />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className={`text-sm font-semibold ${done ? 'text-legali-dark' : 'text-legali-gray'}`}>{label}</p>
                      {date && <p className="text-xs text-legali-gray mt-0.5">{new Date(date).toLocaleDateString('en-NG', { day: '2-digit', month: 'long', year: 'numeric' })}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Lawyer info */}
            {c.lawyerName && (
              <div className="card flex flex-col gap-3">
                <h2 className="font-display font-bold text-legali-dark">Your Lawyer</h2>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-orange flex items-center justify-center text-white font-bold">{c.lawyerName.charAt(0)}</div>
                  <div>
                    <p className="font-bold text-legali-dark">{c.lawyerName}</p>
                    <span className="badge-green text-[10px]">Verified</span>
                  </div>
                </div>
                <button className="btn-primary text-sm justify-center gap-2"><MessageSquare size={14} />Send Message</button>
              </div>
            )}

            {/* Payment info */}
            <div className="card flex flex-col gap-3">
              <h2 className="font-display font-bold text-legali-dark">Payment</h2>
              <div className="flex justify-between text-sm"><span className="text-legali-gray">Amount</span><span className="font-bold text-legali-dark">₦{(c.amount || 50000).toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-legali-gray">Status</span><span className={c.paymentStatus === 'escrowed' ? 'badge-yellow' : c.paymentStatus === 'released' ? 'badge-green' : c.paymentStatus === 'paid' ? 'badge-blue' : 'badge-gray'}>{c.paymentStatus}</span></div>
              {c.paymentStatus === 'escrowed' && (
                <div className="flex items-start gap-2 p-3 bg-legali-orange/5 rounded-xl border border-legali-orange/20 text-xs">
                  <Shield size={13} className="text-legali-orange shrink-0 mt-0.5" />
                  <span>Payment is held in escrow and will be released to your lawyer upon case completion.</span>
                </div>
              )}
            </div>

            {/* Dates */}
            <div className="card flex flex-col gap-3">
              <h2 className="font-display font-bold text-legali-dark">Dates</h2>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between"><span className="text-legali-gray">Filed</span><span className="font-medium">{new Date(c.createdAt).toLocaleDateString('en-NG')}</span></div>
                {c.scheduledAt && <div className="flex justify-between"><span className="text-legali-gray">Session</span><span className="font-medium">{new Date(c.scheduledAt).toLocaleDateString('en-NG')}</span></div>}
                <div className="flex justify-between"><span className="text-legali-gray">Updated</span><span className="font-medium">{new Date(c.updatedAt).toLocaleDateString('en-NG')}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="card p-0 overflow-hidden flex flex-col" style={{ height: '560px' }}>
          <div className="p-4 border-b border-legali-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl gradient-orange flex items-center justify-center text-white font-bold text-sm">{(c.lawyerName || 'L').charAt(0)}</div>
            <div>
              <p className="font-semibold text-sm text-legali-dark">{c.lawyerName || 'Awaiting lawyer'}</p>
              <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /><span className="text-xs text-legali-gray">Online</span></div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {demoMessages.map(msg => (
              <div key={msg.id} className={`flex ${msg.mine ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] flex flex-col gap-1 ${msg.mine ? 'items-end' : 'items-start'}`}>
                  {!msg.mine && <span className="text-xs text-legali-gray px-1">{msg.sender}</span>}
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.mine ? 'gradient-orange text-white rounded-tr-none' : 'bg-legali-light text-legali-dark rounded-tl-none'}`}>{msg.content}</div>
                  <span className="text-[10px] text-legali-gray px-1">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-legali-border flex items-center gap-2">
            <input value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && message && setMessage('')} placeholder="Type a message..." className="input-field flex-1 py-2.5 text-sm" />
            <button onClick={() => setMessage('')} disabled={!message} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${message ? 'gradient-orange text-white' : 'bg-legali-border text-legali-gray'}`}><Send size={15} /></button>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="flex flex-col gap-4">
          <div className="card p-0 overflow-hidden">
            {c.documents.length === 0 ? (
              <div className="py-12 text-center">
                <FileText size={40} className="text-legali-border mx-auto mb-3" />
                <p className="font-semibold text-legali-dark">No documents yet</p>
                <p className="text-sm text-legali-gray mt-1">Upload supporting documents for your case</p>
              </div>
            ) : c.documents.map(d => (
              <div key={d.id} className="flex items-center gap-3 p-4 border-b border-legali-border last:border-0 hover:bg-legali-light">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><FileText size={18} className="text-blue-600" /></div>
                <div className="flex-1"><p className="font-semibold text-sm text-legali-dark">{d.name}</p><p className="text-xs text-legali-gray">{new Date(d.uploadedAt).toLocaleDateString('en-NG')}</p></div>
                <button className="btn-ghost py-1.5 px-3 text-xs">Download</button>
              </div>
            ))}
          </div>
          <div className="border-2 border-dashed border-legali-border rounded-2xl p-8 text-center hover:border-legali-orange/50 transition-colors cursor-pointer">
            <Upload size={28} className="text-legali-gray mx-auto mb-3" />
            <p className="font-semibold text-legali-dark">Upload Documents</p>
            <p className="text-sm text-legali-gray mt-1">PDF, DOC, JPG up to 10MB</p>
            <button className="btn-primary mt-4 text-sm">Choose Files</button>
          </div>
        </div>
      )}
    </div>
  );
}
