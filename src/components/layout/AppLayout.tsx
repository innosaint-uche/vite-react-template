import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import { Bell, Search, Phone } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { role } = useAuthStore();

  return (
    <div className="min-h-screen bg-legali-light flex">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-legali-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-legali-gray" />
            <input type="text" placeholder="Search cases, lawyers..." className="input-field pl-9 py-2 text-sm h-9" />
          </div>
          <div className="flex items-center gap-3">
            {role === 'customer' && (
              <button className="btn-primary py-2 px-4 text-sm gap-1.5">
                <Phone size={14} />
                Emergency
              </button>
            )}
            <button className="relative w-9 h-9 rounded-xl hover:bg-legali-light flex items-center justify-center text-legali-gray hover:text-legali-orange transition-colors">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-legali-orange rounded-full" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
