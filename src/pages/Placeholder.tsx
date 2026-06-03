import { Construction } from 'lucide-react';

interface Props { title: string; desc?: string; }
export default function Placeholder({ title, desc }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-16 h-16 rounded-2xl gradient-orange flex items-center justify-center"><Construction size={28} className="text-white" /></div>
      <h1 className="page-header">{title}</h1>
      <p className="text-legali-gray text-center max-w-md">{desc || 'This section is part of the full Legali platform implementation.'}</p>
      <div className="badge-orange">Coming Soon</div>
    </div>
  );
}
