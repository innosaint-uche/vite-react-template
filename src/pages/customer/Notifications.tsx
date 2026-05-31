import { Bell, FileText, Shield, TrendingUp, AlertCircle, CheckCircle, Zap, Star } from 'lucide-react';
import { mockNotifications } from '../../data/mockData';
import { useState } from 'react';

const iconMap: Record<string, React.ReactNode> = {
  case: <FileText size={16} className="text-blue-600" />,
  payment: <TrendingUp size={16} className="text-green-600" />,
  lawyer: <Shield size={16} className="text-legali-orange" />,
  system: <Bell size={16} className="text-purple-600" />,
  promotion: <Star size={16} className="text-yellow-500" />,
};
const bgMap: Record<string, string> = {
  case: 'bg-blue-50', payment: 'bg-green-50', lawyer: 'bg-legali-orange/10',
  system: 'bg-purple-50', promotion: 'bg-yellow-50',
};

export default function Notifications() {
  const [items, setItems] = useState(mockNotifications);
  const unread = items.filter(n => !n.read).length;

  const markAll = () => setItems(prev => prev.map(n => ({ ...n, read: true })));
  const markOne = (id: string) => setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Notifications</h1>
          <p className="text-legali-gray mt-1">{unread} unread notification{unread !== 1 ? 's' : ''}</p>
        </div>
        {unread > 0 && (
          <button onClick={markAll} className="btn-ghost text-sm py-2 px-4 text-legali-orange">
            Mark all as read
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {items.length === 0 && (
          <div className="card text-center py-16">
            <Bell size={40} className="text-legali-border mx-auto mb-3" />
            <p className="font-display font-bold text-legali-dark">You're all caught up!</p>
            <p className="text-legali-gray text-sm mt-1">No new notifications</p>
          </div>
        )}
        {items.map(n => (
          <div
            key={n.id}
            onClick={() => markOne(n.id)}
            className={`card p-4 flex items-start gap-4 cursor-pointer hover:shadow-card-hover transition-all ${!n.read ? 'border-legali-orange/30 bg-legali-orange/5' : 'opacity-80'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bgMap[n.type]}`}>
              {iconMap[n.type]}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-sm text-legali-dark">{n.title}</p>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-legali-gray">
                    {new Date(n.createdAt).toLocaleDateString('en-NG', { day: '2-digit', month: 'short' })}
                  </span>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-legali-orange" />}
                </div>
              </div>
              <p className="text-sm text-legali-gray mt-0.5 leading-relaxed">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
