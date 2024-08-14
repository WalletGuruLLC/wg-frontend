"use client";

import type { I18nDictionary } from "@wg-frontend/i18n";

// https://scrummers.atlassian.net/wiki/spaces/PWG/pages/2026045479/Status+Codes
export const errorsDict = {
  en: {
    "errors.UE1": "An unexpected error occurred. Please try again later.",
    "errors.UE2": "An unexpected error occurred. Please try again later.",
    "errors.WGE0001":
      "The entered password does not match the one registered in the system.",
    "errors.WGE0002":
      "There is no account associated with the entered email or username.",
    "errors.WGE0003":
      "An account is already registered with the provided email or username.",
    "errors.WGE0004":
      "The account exists, but the email has not been verified.",
    "errors.WGE0005":
      "The entered verification code is incorrect or has expired.",
    "errors.WGE0006":
      "The authentication session has expired, please log in again.",
    "errors.WGE0007": "The current password entered is incorrect.",
    "errors.WGE0008":
      "The new password does not meet the established security requirements.",
    "errors.WGE0010":
      "There was a problem sending the verification email. Please try again.",
    "errors.WGE0011":
      "The entered password reset token is invalid or has expired.",
    "errors.WGE0015":
      "Two-factor authentication failed due to an incorrect code or technical issue.",
    "errors.WGE0016":
      "An unexpected error occurred on the server. Please try again later.",
  },
  es: {
    "errors.UE1":
      "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.",
    "errors.UE2":
      "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.",
    "errors.WGE0001":
      "La contraseña ingresada no coincide con la registrada en el sistema.",
    "errors.WGE0002":
      "No existe una cuenta asociada con el correo electrónico o nombre de usuario ingresado.",
    "errors.WGE0003":
      "Ya existe una cuenta registrada con el correo electrónico o nombre de usuario proporcionado.",
    "errors.WGE0004":
      "La cuenta existe, pero el correo electrónico no ha sido verificado.",
    "errors.WGE0005":
      "El código de verificación ingresado es incorrecto o ha expirado.",
    "errors.WGE0006":
      "La sesión de autenticación ha expirado, por favor inicie sesión nuevamente.",
    "errors.WGE0007": "La contraseña actual ingresada es incorrecta.",
    "errors.WGE0008":
      "La nueva contraseña no cumple con los requisitos de seguridad establecidos.",
    "errors.WGE0010":
      "Hubo un problema al enviar el correo electrónico de verificación. Por favor, inténtelo nuevamente.",
    "errors.WGE0011":
      "El token de restablecimiento de contraseña ingresado es inválido o ha expirado.",
    "errors.WGE0015":
      "La autenticación de dos factores falló debido a un código incorrecto o un problema técnico.",
    "errors.WGE0016":
      "Ocurrió un error inesperado en el servidor. Por favor, inténtelo más tarde.",
  },
} satisfies I18nDictionary;
