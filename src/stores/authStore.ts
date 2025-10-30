import { create } from "zustand";
import { signIn, signOut } from "next-auth/react";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
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

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        set({ isLoading: false });
        throw new Error(result.error);
      }

      // Fetch the user session after successful login
      const response = await fetch("/api/auth/session");
      const session = await response.json();

      if (session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email,
          displayName: session.user.name || session.user.email,
          role: session.user.role || "student",
          createdAt: new Date().toISOString(),
        };

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
        throw new Error("Failed to fetch user session");
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  signup: async (email, password, displayName) => {
    set({ isLoading: true });
    try {
      // Call the signup API endpoint
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name: displayName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // After successful signup, automatically log in
      const loginResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginResult?.error) {
        set({ isLoading: false });
        throw new Error(loginResult.error);
      }

      // Fetch the user session after successful login
      const sessionResponse = await fetch("/api/auth/session");
      const session = await sessionResponse.json();

      if (session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email,
          displayName: session.user.name || session.user.email,
          role: session.user.role || "student",
          createdAt: new Date().toISOString(),
        };

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
        throw new Error("Failed to fetch user session");
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    await signOut({ redirect: false });
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));
