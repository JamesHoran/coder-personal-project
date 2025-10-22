import { create } from "zustand";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  login: async (email) => {
    set({ isLoading: true });
    try {
      // TODO: Implement actual auth logic
      // This is a mock implementation
      const mockUser: User = {
        id: "be3d97ac-e48a-4c37-8c2b-5cff1710d785", // Demo User UUID
        email: "demo@example.com",
        displayName: "Demo User",
        role: "student",
        createdAt: new Date().toISOString(),
      };

      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  signup: async (email, password, displayName) => {
    set({ isLoading: true });
    try {
      // TODO: Implement actual auth logic
      const mockUser: User = {
        id: "be3d97ac-e48a-4c37-8c2b-5cff1710d785", // Demo User UUID
        email: "demo@example.com",
        displayName: "Demo User",
        role: "student",
        createdAt: new Date().toISOString(),
      };

      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));
