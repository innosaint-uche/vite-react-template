import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  color?: 'orange' | 'green' | 'blue' | 'purple' | 'dark';
  subtitle?: string;
}

const colorMap = {
  orange: { bg: 'bg-legali-orange/10', icon: 'text-legali-orange', border: 'border-legali-orange/20' },
  green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100' },
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-100' },
  dark: { bg: 'bg-legali-dark/5', icon: 'text-legali-dark', border: 'border-legali-dark/10' },
};

export default function StatCard({ label, value, icon: Icon, change, changeType = 'up', color = 'orange', subtitle }: StatCardProps) {
  const colors = colorMap[color];
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
          <Icon size={20} className={colors.icon} />
        </div>
        {change && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${changeType === 'up' ? 'bg-green-50 text-green-600' : changeType === 'down' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
            {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : '•'} {change}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold font-display text-legali-dark">{value}</p>
        <p className="text-sm font-medium text-legali-gray mt-0.5">{label}</p>
        {subtitle && <p className="text-xs text-legali-gray-light mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
