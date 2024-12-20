"use client";

import type { I18nDictionary } from "@wg-frontend/i18n";

export const authDict = {
  en: {
    "auth.login.title": "Login",
    "auth.login.email.placeholder": "Email",
    "auth.login.email.errors.invalid": "Enter a Valid Email",
    "auth.login.password.placeholder": "Password",
    "auth.login.password.errors.invalid":
      "Enter a strong password of up to 20 characters, including at least one number, uppercase, lowercase, and special character.",
    "auth.login.remember-me": "Remember Me",
    "auth.login.forgot-password": "Forgot Password?",
    "auth.2fa.title": "Two-Factor Authentication",
    "auth.2fa.subtitle":
      "A Unique Code has Been Sent to Your Email Address. Please Check your Inbox and Enter the Code",
    "auth.2fa.code.placeholder": "Enter your Authentication Code",
    "auth.2fa.code.valid-for": "Your Code is Valid up to",
    "auth.2fa.primary-button": "Verify",
    "auth.2fa.secondary-button": "Resend Code",
    "auth.2fa.code.errors.invalid": "Invalid Code, Please Try Again",
    "auth.2fa.errors.unauthorized": "Unauthorized",
    "auth.reset-password.title": "Reset Password",
    "auth.reset-password.primary-button": "Save",
    "auth.reset-password.current-password.placeholder":
      "Enter the Current Password",
    "auth.reset-password.new-password.placeholder": "Enter your New Password",
    "auth.reset-password.new-password.errors.invalid":
      "The New Password you Entered doesn't Meet our Requirements. Please Try a Different One.",
    "auth.reset-password.confirm-password.placeholder":
      "Confirm your New Password",
    "auth.reset-password.confirm-password.errors.passwords-not-match":
      "Passwords do not Match",
    "auth.reset-password.information-label":
      "Enter a strong password of up to 20 characters, including at least one number, uppercase, lowercase, and special character.",
    "auth.forgot-password.email-step.title": "Forgot Your Password?",
    "auth.forgot-password.email-step.subtitle":
      "Enter your Email Address Below, and We'll Send you a Code to Reset your Password.",
    "auth.forgot-password.email-step.email.placeholder": "Email",
    "auth.forgot-password.email-step.primary-button": "Request",
    "auth.forgot-password.email-step.secondary-button": "Go Back",
    "auth.forgot-password.code-step.title": "Reset Password",
    "auth.forgot-password.code-step.code.placeholder": "Enter the Code Sent",
    "auth.forgot-password.code-step.new-password.placeholder":
      "Enter your New Password",
    "auth.forgot-password.code-step.confirm-password.placeholder":
      "Confirm your New Password",
    "auth.forgot-password.code-step.information-label":
      "Enter a strong password of up to 20 characters, including at least one number, uppercase, lowercase, and special character.",
    "auth.forgot-password.code-step.primary-button": "Save",
    "auth.forgot-password.code-step.secondary-button": "Cancel",
  },
  es: {
    "auth.login.title": "Iniciar Sesión",
    "auth.login.email.placeholder": "Email",
    "auth.login.email.errors.invalid": "Ingresa un Email Válido",
    "auth.login.password.placeholder": "Contraseña",
    "auth.login.password.errors.invalid":
      "Tu Contraseña debe contener más de 20 carácteres, AL MENOS un número, un carácter en mayúscula, un carácter en minúscula y un carácter especial",
    "auth.login.remember-me": "Recuérdame",
    "auth.login.forgot-password": "¿Olvidaste tu contraseña?",
    "auth.2fa.title": "Autenticación de Dos Factores",
    "auth.2fa.subtitle":
      "Se ha Enviado un Código Único a tu Dirección de Correo Electrónico. Por Favor Revisa tu Bandeja de Entrada e ingresa el código",
    "auth.2fa.code.placeholder": "Ingresa tu Código de Autenticación",
    "auth.2fa.code.valid-for": "Tu Código es Válido por",
    "auth.2fa.primary-button": "Verificar",
    "auth.2fa.secondary-button": "Reenviar Código",
    "auth.2fa.code.errors.invalid":
      "Código Inválido, Por favor Inténtalo de Nuevo",
    "auth.2fa.errors.unauthorized": "No Autorizado",
    "auth.reset-password.title": "Restablecer Contraseña",
    "auth.reset-password.primary-button": "Guardar",
    "auth.reset-password.current-password.placeholder":
      "Ingresa la Contraseña Actual",
    "auth.reset-password.new-password.placeholder":
      "Ingresa la Nueva Contraseña",
    "auth.reset-password.new-password.errors.invalid":
      "La Nueva Contraseña que Ingresaste no Cumple con nuestros requisitos. Por favor, intenta con otra.",
    "auth.reset-password.confirm-password.placeholder":
      "Confirma tu Nueva Contraseña",
    "auth.reset-password.confirm-password.errors.passwords-not-match":
      "Las Contraseñas No Coinciden",
    "auth.reset-password.information-label":
      "Ingresa una Contraseña Segura que Contenga Mínimo 20 Caracteres, un número, un carácter en mayúscula, un carácter en minúscula y un carácter especial.",
    "auth.forgot-password.email-step.title": "¿Olvidaste tu Contraseña?",
    "auth.forgot-password.email-step.subtitle":
      "Ingresa tu Dirección de Correo Electrónico a Continuación, y te Enviaremos un Código para Restablecer tu contraseña.",
    "auth.forgot-password.email-step.email.placeholder": "Email",
    "auth.forgot-password.email-step.primary-button": "Solicitar",
    "auth.forgot-password.email-step.secondary-button": "Regresar",
    "auth.forgot-password.code-step.title": "Restablecer contraseña",
    "auth.forgot-password.code-step.code.placeholder":
      "Ingresa el Código Enviado",
    "auth.forgot-password.code-step.new-password.placeholder":
      "Ingresa tu Nueva Contraseña",
    "auth.forgot-password.code-step.confirm-password.placeholder":
      "Confirma tu Nueva Contraseña",
    "auth.forgot-password.code-step.information-label":
      "Ingresa una contraseña segura que contenga mínimo 20 caracteres, un número, un carácter en mayúscula, un carácter en minúscula y un carácter especial.",
    "auth.forgot-password.code-step.primary-button": "Guardar",
    "auth.forgot-password.code-step.secondary-button": "Cancelar",
  },
} satisfies I18nDictionary;
