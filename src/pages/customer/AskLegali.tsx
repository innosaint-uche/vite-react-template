import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, Shield, Zap } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const starterQuestions = [
  'What are my rights as a tenant in Lagos?',
  'How do I register a trademark in Nigeria?',
  'Can my employer terminate me without notice?',
  'What should I do if I am arrested by police?',
  'How does legal insurance work on Legali?',
];

const demoResponses: Record<string, string> = {
  default: `I'm here to help with your legal questions as they apply to Nigerian law. As your Legali AI assistant, I can provide general legal information and guidance — though for specific legal advice and representation, I'll connect you with one of our verified lawyers.\n\nWhat legal question can I help you with today?`,
  tenant: `**Tenant Rights in Lagos — Key Points:**\n\n1. **Notice Period**: Your landlord must give you **6 months written notice** before any eviction (Lagos Tenancy Law 2011).\n\n2. **No Self-Help Eviction**: A landlord cannot change your locks, remove your belongings, or cut utilities without a **court order**.\n\n3. **Receipts**: Always demand and keep receipts for rent payments.\n\n4. **Repairs**: Your landlord is responsible for major structural repairs unless your tenancy agreement states otherwise.\n\n5. **Rent Tribunal**: If your landlord tries to increase rent unlawfully, you can report to the Lagos State Rent Tribunal.\n\n⚠️ *If you are facing an eviction threat, I recommend speaking to one of our verified lawyers immediately.* Use the **Emergency Call** button for urgent situations.\n\n*This is general legal information. For advice specific to your situation, book a session with a Legali lawyer.*`,
  arrest: `**If You Are Arrested — Your Constitutional Rights (Nigeria):**\n\n1. **Right to Know**: You must be told the reason for your arrest.\n\n2. **Right to Silence**: You are not required to say anything that may incriminate you. Say: *"I will not speak without my lawyer."*\n\n3. **Right to a Lawyer**: You have the right to a lawyer of your choice immediately. Use Legali's **Emergency Call** button.\n\n4. **48-Hour Rule**: Police must charge you to court or release you within **24–48 hours** (Section 35, 1999 Constitution).\n\n5. **No Torture**: Any form of torture or inhumane treatment is unconstitutional and should be reported.\n\n6. **Bail**: You are entitled to bail for minor offences.\n\n🚨 **URGENT?** Tap the Emergency Call button at the top of your dashboard to reach a lawyer right now.\n\n*Based on the Constitution of the Federal Republic of Nigeria, 1999 (as amended).*`,
};

function getResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('tenant') || q.includes('landlord') || q.includes('evict') || q.includes('rent')) return demoResponses.tenant;
  if (q.includes('arrest') || q.includes('police') || q.includes('detained')) return demoResponses.arrest;
  return `**On "${question}":**\n\nThank you for your question. Under Nigerian law, this area touches on several important statutes and constitutional provisions.\n\nWhile I can provide general information, the specifics of your situation matter greatly for accurate legal advice.\n\n**General guidance:**\n- Document everything relevant to your situation\n- Preserve any evidence, contracts, or communications\n- Act promptly — many legal matters have time limits\n\n**Recommended next step:** Book a session with one of our verified Legali lawyers who specializes in this area. They can review your specific documents and circumstances.\n\n*This is general legal information under Nigerian law and does not constitute legal advice. Powered by Cloudflare Workers AI.*`;
}

export default function AskLegali() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'assistant', content: demoResponses.default, timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text?: string) => {
    const q = text || input;
    if (!q.trim()) return;
    setInput('');

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: q, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // Simulate Workers AI response latency
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: getResponse(q),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-legali-dark mt-2 first:mt-0">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.match(/^\*\*.*\*\*/)) {
        return <p key={i} className="text-sm leading-relaxed">{line.replace(/\*\*(.*?)\*\*/g, (_, m) => m).split(':').map((part, j) => j === 0 ? <strong key={j}>{part}:</strong> : part)}</p>;
      }
      if (line.startsWith('- ') || line.match(/^\d+\./)) {
        return <li key={i} className="text-sm ml-4">{line.replace(/^[-\d.]+\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}</li>;
      }
      if (line.startsWith('⚠️') || line.startsWith('🚨') || line.startsWith('*Based') || line.startsWith('*This')) {
        return <p key={i} className="text-xs text-legali-gray italic mt-2">{line}</p>;
      }
      if (!line.trim()) return <br key={i} />;
      return <p key={i} className="text-sm leading-relaxed">{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="page-header flex items-center gap-2">
            Ask Legali AI <Sparkles size={24} className="text-legali-orange" />
          </h1>
          <p className="text-legali-gray mt-1">Powered by Cloudflare Workers AI — instant Nigerian legal guidance</p>
        </div>
        <span className="badge-orange text-sm px-4 py-1.5 flex items-center gap-1.5"><Bot size={14} />AI Assistant</span>
      </div>

      {/* Features bar */}
      <div className="grid sm:grid-cols-3 gap-3">
        {[
          { icon: Shield, label: 'Nigerian Law', desc: 'Trained on Nigerian statutes & case law' },
          { icon: Zap, label: 'Instant Answers', desc: 'Responses in under 2 seconds' },
          { icon: BookOpen, label: 'Connect to Lawyer', desc: 'Escalate to a real lawyer anytime' },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="card p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl gradient-orange flex items-center justify-center shrink-0"><Icon size={15} className="text-white" /></div>
            <div><p className="font-semibold text-sm text-legali-dark">{label}</p><p className="text-[11px] text-legali-gray">{desc}</p></div>
          </div>
        ))}
      </div>

      {/* Chat window */}
      <div className="card p-0 overflow-hidden flex flex-col" style={{ height: '520px' }}>
        <div className="flex items-center gap-3 p-4 border-b border-legali-border bg-legali-light">
          <div className="w-9 h-9 rounded-xl gradient-orange flex items-center justify-center"><Bot size={18} className="text-white" /></div>
          <div>
            <p className="font-bold text-sm text-legali-dark">Legali AI</p>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-xs text-legali-gray">Powered by Workers AI · Llama 3.1</span></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl gradient-orange flex items-center justify-center shrink-0 mt-1"><Bot size={14} className="text-white" /></div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'gradient-orange text-white rounded-tr-none' : 'bg-legali-light text-legali-dark rounded-tl-none'}`}>
                {msg.role === 'assistant' ? (
                  <div className="text-sm leading-relaxed flex flex-col gap-1">{formatContent(msg.content)}</div>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
                <p className={`text-[10px] mt-1.5 ${msg.role === 'user' ? 'text-white/60' : 'text-legali-gray'}`}>
                  {msg.timestamp.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-legali-light flex items-center justify-center shrink-0 mt-1"><User size={14} className="text-legali-gray" /></div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-xl gradient-orange flex items-center justify-center shrink-0"><Bot size={14} className="text-white" /></div>
              <div className="bg-legali-light rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex gap-1 items-center h-5">
                  {[0, 1, 2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-legali-orange animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Starter questions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {starterQuestions.map(q => (
              <button key={q} onClick={() => send(q)} className="text-xs bg-legali-light hover:bg-legali-orange/10 hover:text-legali-orange text-legali-gray border border-legali-border hover:border-legali-orange/30 px-3 py-1.5 rounded-xl transition-all font-medium">{q}</button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-legali-border flex items-center gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !loading && send()}
            placeholder="Ask any legal question about Nigeria..."
            className="input-field flex-1 py-2.5 text-sm"
            disabled={loading}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${input.trim() && !loading ? 'gradient-orange text-white shadow-legali' : 'bg-legali-border text-legali-gray'}`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      <p className="text-xs text-center text-legali-gray">
        Legali AI provides general legal information only — not legal advice. Always consult a verified lawyer for your specific situation. <span className="text-legali-orange font-semibold cursor-pointer">Book a lawyer →</span>
      </p>
    </div>
  );
}
