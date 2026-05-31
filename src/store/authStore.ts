import { create } from 'zustand';
import type { UserRole } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
  userName: string;
  login: (role: UserRole, name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  role: null,
  userName: '',
  login: (role, name) => set({ isAuthenticated: true, role, userName: name }),
  logout: () => set({ isAuthenticated: false, role: null, userName: '' }),
}));
