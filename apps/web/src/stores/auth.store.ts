import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  auth,
  signInWithGoogle,
  signInWithEmail,
  registerWithEmail,
  logout,
  getIdToken,
  onAuthStateChanged,
  type User,
} from '../lib/firebase';
import { UserRole } from '@medisheba/types';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string | null;
  patientId?: string | null;
  doctorId?: string | null;
  hospitalId?: string | null;
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  token: string | null;
  loading: boolean;
  // actions
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<string | null>;
  setProfile: (profile: UserProfile | null) => void;
  _setUser: (user: User | null) => void;
  _setToken: (token: string | null) => void;
  _setLoading: (loading: boolean) => void;
}

export const getRoleDashboardUrl = (role?: UserRole | null): string => {
  switch (role) {
    case UserRole.DOCTOR:
      return '/doctor/dashboard';
    case UserRole.HOSPITAL_ADMIN:
      return '/admin/dashboard';
    case UserRole.SUPER_ADMIN:
      return '/super-admin/dashboard';
    case UserRole.PATIENT:
    default:
      return '/patient/dashboard';
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      token: null,
      loading: true,

      _setUser: (user) => set({ user }),
      _setToken: (token) => set({ token }),
      _setLoading: (loading) => set({ loading }),
      setProfile: (profile) => set({ profile }),

      loginWithGoogle: async () => {
        const user = await signInWithGoogle();
        const token = await user.getIdToken();
        set({ user, token });
      },

      loginWithEmail: async (email, password) => {
        const user = await signInWithEmail(email, password);
        const token = await user.getIdToken();
        set({ user, token });
      },

      register: async (email, password) => {
        const user = await registerWithEmail(email, password);
        const token = await user.getIdToken();
        set({ user, token });
      },

      logout: async () => {
        await logout();
        set({ user: null, profile: null, token: null });
      },

      refreshToken: async () => {
        const token = await getIdToken();
        set({ token });
        return token;
      },
    }),
    {
      name: 'medisheba-auth',
      partialize: (state) => ({ token: state.token, profile: state.profile }),
    }
  )
);

// Bootstrap: sync Firebase auth state changes into our store
onAuthStateChanged(auth, async (user) => {
  const store = useAuthStore.getState();
  if (user) {
    const token = await user.getIdToken();
    store._setUser(user);
    store._setToken(token);
  } else {
    store._setUser(null);
    store._setToken(null);
    store.setProfile(null);
  }
  store._setLoading(false);
});
