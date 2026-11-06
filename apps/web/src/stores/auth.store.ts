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

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  // actions
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<string | null>;
  _setUser: (user: User | null) => void;
  _setToken: (token: string | null) => void;
  _setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: true,

      _setUser: (user) => set({ user }),
      _setToken: (token) => set({ token }),
      _setLoading: (loading) => set({ loading }),

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
        set({ user: null, token: null });
      },

      refreshToken: async () => {
        const token = await getIdToken();
        set({ token });
        return token;
      },
    }),
    {
      name: 'medisheba-auth',
      partialize: (state) => ({ token: state.token }), // only persist token
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
  }
  store._setLoading(false);
});

