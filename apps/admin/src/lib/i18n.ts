"use client";

import type { I18nDictionary } from "@wg-frontend/i18n";
import createI18nHandlers from "@wg-frontend/i18n";

const dict = {
  en: {
    "dashboard.home.title": "Welcome",
    "dashboard.layout.nav.home": "Home",
    "dashboard.layout.nav.wallet-management": "Wallet Management",
    "dashboard.layout.nav.service-providers": "Service Providers",
    "dashboard.layout.nav.users": "Users",
    "dashboard.layout.nav.roles": "Roles",
    "dashboard.layout.logout": "Logout",
  },
  es: {
    "dashboard.home.title": "Bienvenido",
    "dashboard.layout.nav.home": "Inicio",
    "dashboard.layout.nav.wallet-management": "Billeteras",
    "dashboard.layout.nav.service-providers": "Service Providers",
    "dashboard.layout.nav.users": "Usuarios",
    "dashboard.layout.nav.roles": "Roles",
    "dashboard.layout.logout": "Cerrar sesión",
  },
} satisfies I18nDictionary;

export const { I18nProvider, useI18n } = createI18nHandlers(dict, "en");
