"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";

import { useErrorsQuery } from ".";
import { useI18n } from "../i18n";

const ErrorsContext = createContext<Record<string, string>>({});

export function ErrorsProvider({ children }: { children: ReactNode }) {
  const { language } = useI18n();
  const { data } = useErrorsQuery({ language });

  return (
    <ErrorsContext.Provider value={data ?? {}}>
      {children}
    </ErrorsContext.Provider>
  );
}

export function useErrors() {
  return useContext(ErrorsContext);
}
