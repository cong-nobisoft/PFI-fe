import { create } from 'zustand';
import { clearAuthStorage, persistAuthTokens, hasStoredAccessToken } from '@/shared/auth-storage';
import type { AuthTokenPayload, User } from '@/domain/models/Auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setAuthenticated: (user?: User | null, tokens?: AuthTokenPayload) => void;
  clearAuth: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: hasStoredAccessToken(),
  isLoading: hasStoredAccessToken(), // Initially true if token exists so we can fetch me

  setAuthenticated: (user = null, tokens) => {
    if (tokens) {
      persistAuthTokens(tokens);
    }
    set({ user, isAuthenticated: true, isLoading: false });
  },

  clearAuth: () => {
    clearAuthStorage();
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  setIsLoading: (isLoading) => set({ isLoading }),
}));
