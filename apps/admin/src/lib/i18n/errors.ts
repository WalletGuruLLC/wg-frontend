"use client";

import type { I18nDictionary } from "@wg-frontend/i18n";

export const errorsDict = {
  en: {
    "errors.UE1": "An unexpected error occurred. Please try again later.",
    "errors.UE2": "An unexpected error occurred. Please try again later.",
    "errors.WGE0001":
      "There is an issue with your credentials, please try again.",
    "errors.WGE0002":
      "There is no account associated with the entered email.",
    "errors.WGE0003":
      "An account is already registered with the provided email or username.",
    "errors.WGE0004":
      "The account exists, but the email has not been verified.",
    "errors.WGE0005":
      "Activation Code failed.  Please re-enter your verification code. If you encounter issues, tap Resend Code or contact our support team.",
    "errors.WGE0006":
      "The authentication session has expired, please log in again.",
    "errors.WGE0007": "The old password you entered is incorrect. Please check and try again.",
    "errors.WGE0008":
      "The new password you entered doesn't meet our requirements. Please try a different one.",
    "errors.WGS0009": "Password Successfully Updated! Your password has been changed successfully.",
    "errors.WGE0010":
      "There was a problem sending the verification email. Please try again.",
    "errors.WGE0011":
      "The entered password reset token is invalid or has expired.",
    "errors.WGE0012":
      "There was a problem reseting the password.",
    "errors.WGE0015":
      "Two-factor authentication failed. Please re-enter your verification code. If you encounter issues, tap Resend Code or contact our support team.",
    "errors.WGE0016":
      "An unexpected error occurred on the server. Please try again later.",
      "errors.WGE0019":
      "By activating this user, you are granting the user access to specific system privileges. Do you want to proceed?.",
      "errors.WGE0020":
      "By inactivating this user, you will revoke the user's access to certain system privileges. Do you want to proceed?",
      "errors.WGE0021":
      "By activating this role, you are granting the user access to specific system privileges. Do you want to proceed?.",
      "errors.WGE0022":
      "By inactivating this role, you will revoke the user's access to certain system privileges. Do you want to proceed?.",
      "errors.WGS0023":
      "The role has been added successfully.",
      "errors.WGS0024":
      "The role has been added successfully.",
      "errors.WGE0025":
      "Failed to add role. Check info and retry.",
      "errors.WGE0026":
      "Failed to edit role. Check inputs, then retry.",
      "errors.WGE0027":
      "There is no role with the id provided.",
      "errors.WGS0028":
      "Failed to deactivate role.  Please refresh and retry.",
      "errors.WGS0029":
      "Service provider created successfully.",
      "errors.WGE0030":
      "Failed to create the service provider.",
      "errors.WGS0031":
      "The roles was getting succesfully.",
      "errors.WGE0032":
      "You haven't created any roles yet. Please click 'Add New Role' to get started.",
      "errors.WGE0033":
      "Failed to edit Service Provider.  Check inputs, then retry.",
      "errors.WGS0034":
      "The Service Provider has been edited successfully.",
      "errors.WGE0035":
      "Failed to inactivate Service Provider.  Please refresh and retry.",
      "errors.WGS0036":
      "The Service Provider has been inactive successfully.",
      "errors.WGE0037":
      "Failed to activate the Service Provider.",
      "errors.WGS0038":
      "The Service Provider has been activated successfully.",
      "errors.WGE0040":
      "There is no provider with the id provided.",
      "errors.WGE0072":
      "The wallet was Sucessfully created..",
      "errors.WGE0073":
      "An error has occurred. Please try again later.",
      "errors.WGE0074":
      "There is no wallet associated with the entered info.",
      "errors.WGE0075":
      "Wallet update failed.",
      "errors.WGE0076":
      "The wallet $variable was Sucessfully created.",
      "errors.WGE0077":
      "The wallet was successfully retrieved.",
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
      "errors.WGE0019":
      "Al activar este usuario, le estás otorgando acceso a privilegios específicos del sistema. ¿Deseas continuar?",
      "errors.WGE0020":
      "Al desactivar este usuario, revocarás su acceso a ciertos privilegios del sistema. ¿Deseas continuar?",
      "errors.WGE0021":
      "Al activar este rol, le estás otorgando acceso a privilegios específicos del sistema. ¿Deseas continuar?",
      "errors.WGE0022":
      "Al desactivar este rol, revocarás su acceso a ciertos privilegios del sistema. ¿Deseas continuar?",
      "errors.WGS0023":
      "El rol ha sido añadido con éxito.",
      "errors.WGS0024":
      "El rol ha sido editado con éxito.",
      "errors.WGE0025":
      "Error al agregar el rol. Verifica la información e inténtalo de nuevo.",
      "errors.WGE0026":
      "Error al editar el rol. Verifica los datos e inténtalo de nuevo.",
      "errors.WGE0027":
      "No hay ningún rol asociado con el id ingresado.",
      "errors.WGS0028":
      "Error al desactivar el rol.  Por favor, actualice e inténtelo de nuevo.",
      "errors.WGS0029":
      "Proveedor de servicios creado con éxito.",
      "errors.WGE0030":
      "Error al crear el proveedor de servicios.",
      "errors.WGS0031":
      "Los roles se han obtenido con éxito.",
      "errors.WGE0032":
      "Aún no has creado ningún rol. Por favor, haz clic en 'Agregar nuevo rol' para comenzar.",
      "errors.WGE0033":
      "Error al editar el proveedor de servicios. Verifique los datos y vuelva a intentarlo.",
      "errors.WGS0034":
      "El proveedor de servicios ha sido editado con éxito.",
      "errors.WGE0035":
      "Error al inactivar el proveedor de servicios. Verifique los datos y vuelva a intentarlo.",
      "errors.WGS0036":
      "El proveedor de servicios ha sido inactivado con éxito.",
      "errors.WGE0037":
      "Error al activar el proveedor de servicios.",
      "errors.WGS0038":
      "El proveedor de servicios ha sido activado con éxito.",
      "errors.WGE0040":
      "No hay ningún provider asociado con el id ingresado.",
      "errors.WGE0072":
      "La billetera $variable se creó correctamente.",
      "errors.WGE0073":
      "Ocurrió un error. Por favor, intente nuevamente más tarde.",
      "errors.WGE0074":
      "No hay ninguna billetera asociada con la información ingresada.",
      "errors.WGE0075":
      "Wallet update failed.",
      "errors.WGE0076":
      "La billetera $variable se atualizó correctamente.",
      "errors.WGE0077":
      "La billetera se obtuvo con éxito.",
  },
} satisfies I18nDictionary;
