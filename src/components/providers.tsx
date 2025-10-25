"use client";

import { Provider as JotaiProvider } from "jotai";
import { ProgressProvider } from "@/contexts/ProgressContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <ProgressProvider>{children}</ProgressProvider>
    </JotaiProvider>
  );
}
