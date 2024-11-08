"use client";

import type { I18nDictionary, I18nKeyHelper } from "@wg-frontend/i18n";
import createI18nHandlers from "@wg-frontend/i18n";

import { authDict } from "./auth";
import { dashboardDict } from "./dashboard";
import { serviceProvidersDict } from "./service-providers";
import { walletUsersDict } from "./wallet-users";

const dict = {
  en: {
    loading: "Loading...",
    ...authDict.en,
    ...dashboardDict.en,
    ...serviceProvidersDict.en,
    ...walletUsersDict.es,
  },
  es: {
    loading: "Cargando...",
    ...authDict.es,
    ...dashboardDict.es,
    ...serviceProvidersDict.es,
    ...walletUsersDict.es,
  },
} satisfies I18nDictionary;

export type I18nKey = I18nKeyHelper<typeof dict>;

export const { I18nProvider, useI18n } = createI18nHandlers(dict, "en");
