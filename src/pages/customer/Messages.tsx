import { useState } from 'react';
import { Send, Paperclip, Phone, Video } from 'lucide-react';
import { mockCases } from '../../data/mockData';

const demoMessages = [
  { id: '1', sender: 'Adaeze Okonkwo', role: 'lawyer', content: 'Good morning! I have reviewed the tenancy agreement you sent. There are a few key points we need to address before we proceed.', time: '10:30 AM', mine: false },
  { id: '2', sender: 'You', role: 'customer', content: 'Good morning Adaeze! Thank you for looking into it. What are the key points?', time: '10:32 AM', mine: true },
  { id: '3', sender: 'Adaeze Okonkwo', role: 'lawyer', content: 'First, the landlord\'s notice period is insufficient under the Lagos Tenancy Law. He must give you at least 6 months notice, not 1 month as claimed. Secondly, there\'s no valid court order for the eviction.', time: '10:35 AM', mine: false },
  { id: '4', sender: 'You', role: 'customer', content: 'This is great news! What are our next steps?', time: '10:37 AM', mine: true },
  { id: '5', sender: 'Adaeze Okonkwo', role: 'lawyer', content: 'I\'ll be drafting a formal legal notice to the landlord and his lawyer. I\'ll also file for an injunction to halt any eviction attempt. Please don\'t engage with the landlord directly until further notice.', time: '10:40 AM', mine: false },
];

export default function Messages() {
  const [message, setMessage] = useState('');
  const activeCases = mockCases.filter(c => ['assigned', 'in_progress'].includes(c.status) && c.lawyerName);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="page-header">Messages</h1>

      <div className="grid lg:grid-cols-3 gap-4 h-[600px]">
        {/* Conversation list */}
        <div className="card p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-legali-border">
            <p className="font-semibold text-legali-dark">Conversations</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {activeCases.map((c, i) => (
              <div key={c.id} className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-legali-light border-b border-legali-border transition-colors ${i === 0 ? 'bg-legali-orange/5 border-l-2 border-l-legali-orange' : ''}`}>
                <div className="w-10 h-10 rounded-xl gradient-orange flex items-center justify-center text-white font-bold text-sm shrink-0">{c.lawyerName?.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm text-legali-dark truncate">{c.lawyerName}</p>
                    <span className="text-xs text-legali-gray shrink-0">10:40 AM</span>
                  </div>
                  <p className="text-xs text-legali-gray truncate mt-0.5">{c.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div className="lg:col-span-2 card p-0 overflow-hidden flex flex-col">
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 border-b border-legali-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gradient-orange flex items-center justify-center text-white font-bold text-sm">A</div>
              <div>
                <p className="font-semibold text-sm text-legali-dark">Adaeze Okonkwo</p>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500" /><span className="text-xs text-legali-gray">Online</span></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg hover:bg-legali-light flex items-center justify-center text-legali-gray"><Phone size={16} /></button>
              <button className="w-8 h-8 rounded-lg hover:bg-legali-light flex items-center justify-center text-legali-gray"><Video size={16} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {demoMessages.map(msg => (
              <div key={msg.id} className={`flex ${msg.mine ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] ${msg.mine ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  {!msg.mine && <span className="text-xs text-legali-gray px-1">{msg.sender}</span>}
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.mine ? 'gradient-orange text-white rounded-tr-none' : 'bg-legali-light text-legali-dark rounded-tl-none'}`}>
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-legali-gray px-1">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-legali-border flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl hover:bg-legali-light flex items-center justify-center text-legali-gray"><Paperclip size={16} /></button>
            <input value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && message && setMessage('')} placeholder="Type a message..." className="input-field flex-1 py-2.5 text-sm" />
            <button onClick={() => setMessage('')} disabled={!message} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${message ? 'gradient-orange text-white' : 'bg-legali-border text-legali-gray'}`}>
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
