import create from "zustand";

/**
 * Simple auth store using zustand
 * - Keeps loading, auth flag and minimal user profile
 * - Exposes setters to keep components simple
 *
 * This store is intentionally small — extend with tokens/persistence when needed.
 */
type User = {
    id: string;
    name?: string;
    email?: string;
    avatar?: string;
};

type AuthState = {
    loading: boolean;
    isAuthenticated: boolean;
    user: User | null;
    setLoading: (v: boolean) => void;
    setAuth: (user: User | null) => void;
    signOut: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
    loading: false,
    isAuthenticated: false,
    user: null,
    setLoading: (v: boolean) => set({ loading: v }),
    setAuth: (user) => set({ user, isAuthenticated: !!user, loading: false }),
    signOut: () => set({ user: null, isAuthenticated: false }),
}));

export default useAuthStore;
