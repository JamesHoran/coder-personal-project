"use client";

import { SessionProvider } from "next-auth/react";
import { Provider as JotaiProvider } from "jotai";
import { ProgressProvider } from "@/contexts/ProgressContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <JotaiProvider>
        <ProgressProvider>{children}</ProgressProvider>
      </JotaiProvider>
    </SessionProvider>
  );
}
