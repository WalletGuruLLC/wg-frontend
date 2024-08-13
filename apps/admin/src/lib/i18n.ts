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
    "auth.login.title": "Login",
    "auth.login.email.placeholder": "Email",
    "auth.login.email.errors.invalid": "Enter a valid email",
    "auth.login.password.placeholder": "Password",
    "auth.login.password.errors.invalid":
      "Your password must contain 8 to 12 characters, AT LEAST one number, one alpha character, one upper case character, one lower case access and one special character",
    "auth.login.remember-me": "Remember me",
    "auth.login.forgot-password": "Forgot password?",
  },
  es: {
    "dashboard.home.title": "Bienvenido",
    "dashboard.layout.nav.home": "Inicio",
    "dashboard.layout.nav.wallet-management": "Billeteras",
    "dashboard.layout.nav.service-providers": "Service Providers",
    "dashboard.layout.nav.users": "Usuarios",
    "dashboard.layout.nav.roles": "Roles",
    "dashboard.layout.logout": "Cerrar sesión",
    "auth.login.title": "Iniciar sesión",
    "auth.login.email.placeholder": "Email",
    "auth.login.email.errors.invalid": "Ingresa un email válido",
    "auth.login.password.placeholder": "Contraseña",
    "auth.login.password.errors.invalid":
      "Tu contraseña debe contener de 8 a 12 caracteres, AL MENOS un número, un carácter alfa, un carácter en mayúscula, un carácter en minúscula y un carácter especial",
    "auth.login.remember-me": "Recuérdame",
    "auth.login.forgot-password": "¿Olvidaste tu contraseña?",
  },
} satisfies I18nDictionary;

export const { I18nProvider, useI18n } = createI18nHandlers(dict, "en");
