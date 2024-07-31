"use client";

import type { I18nDictionary } from "@wg-frontend/i18n";
import createI18nHandlers from "@wg-frontend/i18n";

const dict = {
  en: {
    "wg-frontend": "wg-frontend",
    "admin.title": "title english",
  },
  es: {
    "wg-frontend": "wg-frontend",
    "admin.title": "title espanol",
  },
} satisfies I18nDictionary;

export const { I18nProvider, useI18n } = createI18nHandlers(dict, "en");
