"use client";

import type { I18nDictionary } from "@wg-frontend/i18n";

export const errorsDict = {
  en: {
    "errors.UE1": "An unexpected error occurred. Please try again later.",
    "errors.UE2": "An unexpected error occurred. Please try again later.",
    "errors.WGE0001":
      "There is an issue with your credentials, please try again.",
    "errors.WGE0002": "There is no account associated with the entered email.",
    "errors.WGE0003":
      "An account is already registered with the provided email or username.",
    "errors.WGE0004":
      "The account exists, but the email has not been verified.",
    "errors.WGE0005":
      "Activation Code failed.  Please re-enter your verification code. If you encounter issues, tap Resend Code or contact our support team.",
    "errors.WGE0006":
      "The authentication session has expired, please log in again.",
    "errors.WGE0007":
      "The old password you entered is incorrect. Please check and try again.",
    "errors.WGE0008":
      "The new password you entered doesn't meet our requirements. Please try a different one.",
    "errors.WGE0010":
      "There was a problem sending the verification email. Please try again.",
    "errors.WGE0011":
      "The entered password reset token is invalid or has expired.",
    "errors.WGE0012": "There was a problem reseting the password.",
    "errors.WGE0015":
      "Two-factor authentication failed. Please re-enter your verification code. If you encounter issues, tap Resend Code or contact our support team.",
    "errors.WGE0016":
      "An unexpected error occurred on the server. Please try again later.",
    "errors.WGE0025": "Failed to add role. Check info and retry.",
    "errors.WGE0026": "Failed to edit role. Check inputs, then retry.",
    "errors.WGE0027": "There is no role with the id provided.",
    "errors.WGS0028": "Failed to deactivate role.  Please refresh and retry.",
    "errors.WGE0030": "Failed to create the service provider.",
    "errors.WGE0032":
      "You haven't created any roles yet. Please click 'Add New Role' to get started.",
    "errors.WGE0033":
      "Failed to edit Service Provider.  Check inputs, then retry.",
    "errors.WGE0035":
      "Failed to inactivate Service Provider.  Please refresh and retry.",
    "errors.WGE0037": "Failed to activate the Service Provider.",
    "errors.WGE0040": "There is no provider with the id provided.",
    "errors.WGE0073": "An error has occurred. Please try again later.",
    "errors.WGE0074": "There is no wallet associated with the entered info.",
    "errors.WGE0075": "Wallet update failed.",
    "errors.WGE00108": "This email is currently inactive. Please contact the wallet guru support team to reactivate your account.",
  },
  es: {
    "errors.UE1":
      "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.",
    "errors.UE2":
      "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.",
    "errors.WGE0001":
      "Ha ocurrido un problema con sus credenciales, por favor intentelo de nuevo.",
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
    "errors.WGE0025":
      "Error al agregar el rol. Verifica la información e inténtalo de nuevo.",
    "errors.WGE0026":
      "Error al editar el rol. Verifica los datos e inténtalo de nuevo.",
    "errors.WGE0027": "No hay ningún rol asociado con el id ingresado.",
    "errors.WGS0028":
      "Error al desactivar el rol.  Por favor, actualice e inténtelo de nuevo.",
    "errors.WGE0030": "Error al crear el proveedor de servicios.",
    "errors.WGE0032":
      "Aún no has creado ningún rol. Por favor, haz clic en 'Agregar nuevo rol' para comenzar.",
    "errors.WGE0033":
      "Error al editar el proveedor de servicios. Verifique los datos y vuelva a intentarlo.",
    "errors.WGE0035":
      "Error al inactivar el proveedor de servicios. Verifique los datos y vuelva a intentarlo.",
    "errors.WGE0037": "Error al activar el proveedor de servicios.",
    "errors.WGE0040": "No hay ningún provider asociado con el id ingresado.",
    "errors.WGE0073":
      "Ocurrió un error. Por favor, intente nuevamente más tarde.",
    "errors.WGE0074":
      "No hay ninguna billetera asociada con la información ingresada.",
    "errors.WGE0075": "Error al actualizar la billetera.",
    "errors.WGE00108": "Este correo electrónico está actualmente inactivo. Por favor, contacta al equipo de soporte de Wallet Guru para reactivar tu cuenta.",
  },
} satisfies I18nDictionary;
