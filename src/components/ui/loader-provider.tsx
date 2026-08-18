"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { IntroLoader } from "@/components/ui/preloader";

const LoaderDoneContext = createContext(false);

export function useLoaderDone() {
  return useContext(LoaderDoneContext);
}

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);

  return (
    <LoaderDoneContext.Provider value={done}>
      <IntroLoader onDone={() => setDone(true)}>{children}</IntroLoader>
    </LoaderDoneContext.Provider>
  );
}
