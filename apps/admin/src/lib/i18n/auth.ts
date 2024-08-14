"use client";

import type { I18nDictionary } from "@wg-frontend/i18n";

export const authDict = {
  en: {
    "auth.login.title": "Login",
    "auth.login.email.placeholder": "Email",
    "auth.login.email.errors.invalid": "Enter a valid email",
    "auth.login.password.placeholder": "Password",
    "auth.login.password.errors.invalid":
      "Your password must contain 8 to 12 characters, AT LEAST one number, one alpha character, one upper case character, one lower case access and one special character",
    "auth.login.remember-me": "Remember me",
    "auth.login.forgot-password": "Forgot password?",
    "auth.forgot-password.code.errors.invalid":
      "Invalid code, please try again",
    "auth.forgot-password.code.placeholder": "Code",
    "auth.forgot-password.title": "Enter Recovery Code",
    "auth.forgot-password.subtitle":
      "An e-mail has been sent with a verification code",
    "auth.forgot-password.primary-button": "Verify",
    "auth.forgot-password.secondary-button": "Cancel",
    "auth.2fa.title": "Two-Factor Authentication",
    "auth.2fa.subtitle":
      "A unique code has been sent to your email address. Please check your inbox and enter the code",
    "auth.2fa.code.placeholder": "Enter your authentication code",
    "auth.2fa.code.valid-for": "Your code is valid up to",
    "auth.2fa.primary-button": "Verify",
    "auth.2fa.secondary-button": "Resend Code",
    "auth.2fa.code.errors.invalid": "Invalid code, please try again",
    "auth.reset-password.title": "Reset Password",
    "auth.reset-password.primary-button": "Save",
    "auth.reset-password.current-password.placeholder":
      "Enter the current password",
    "auth.reset-password.new-password.placeholder": "Enter your new password",
    "auth.reset-password.new-password.errors.invalid":
      "The new password you entered doesn't meet our requirements. Please try a different one.",
    "auth.reset-password.confirm-password.placeholder":
      "Confirm your new password",
    "auth.reset-password.confirm-password.errors.passwords-not-match":
      "Passwords do not match",
    "auth.reset-password.information-label":
      "Enter a strong password containing 8 to 12 characters, AT LEAST one number, one alpha character, one upper case character, one lower case access and one special character.",
  },
  es: {
    "auth.login.title": "Iniciar sesión",
    "auth.login.email.placeholder": "Email",
    "auth.login.email.errors.invalid": "Ingresa un email válido",
    "auth.login.password.placeholder": "Contraseña",
    "auth.login.password.errors.invalid":
      "Tu contraseña debe contener de 8 a 12 caracteres, AL MENOS un número, un carácter alfa, un carácter en mayúscula, un carácter en minúscula y un carácter especial",
    "auth.login.remember-me": "Recuérdame",
    "auth.login.forgot-password": "¿Olvidaste tu contraseña?",
    "auth.forgot-password.code.errors.invalid":
      "Código inválido, por favor inténtalo de nuevo",
    "auth.forgot-password.code.placeholder": "Código",
    "auth.forgot-password.title": "Ingresa el código de recuperación",
    "auth.forgot-password.subtitle":
      "Se ha enviado un correo electrónico con un código de verificación",
    "auth.forgot-password.primary-button": "Verificar",
    "auth.forgot-password.secondary-button": "Cancelar",
    "auth.2fa.title": "Autenticación de dos factores",
    "auth.2fa.subtitle":
      "Se ha enviado un código único a tu dirección de correo electrónico. Por favor revisa tu bandeja de entrada e ingresa el código",
    "auth.2fa.code.placeholder": "Ingresa tu código de autenticación",
    "auth.2fa.code.valid-for": "Tu código es válido por",
    "auth.2fa.primary-button": "Verificar",
    "auth.2fa.secondary-button": "Reenviar código",
    "auth.2fa.code.errors.invalid":
      "Código inválido, por favor inténtalo de nuevo",
    "auth.reset-password.title": "Restablecer contraseña",
    "auth.reset-password.primary-button": "Guardar",
    "auth.reset-password.current-password.placeholder":
      "Ingresa la contraseña actual",
    "auth.reset-password.new-password.placeholder":
      "Ingresa tu nueva contraseña",
    "auth.reset-password.new-password.errors.invalid":
      "La nueva contraseña que ingresaste no cumple con nuestros requisitos. Por favor, intenta con otra.",
    "auth.reset-password.confirm-password.placeholder":
      "Confirma tu nueva contraseña",
    "auth.reset-password.confirm-password.errors.passwords-not-match":
      "Las contraseñas no coinciden",
    "auth.reset-password.information-label":
      "Ingresa una contraseña segura que contenga de 8 a 12 caracteres, AL MENOS un número, un carácter alfa, un carácter en mayúscula, un carácter en minúscula y un carácter especial.",
  },
} satisfies I18nDictionary;
