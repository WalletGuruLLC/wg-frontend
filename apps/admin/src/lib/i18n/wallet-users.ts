"use client";

import type { I18nDictionary } from "@wg-frontend/i18n";

export const walletUsersDict = {
  en: {
    "wallet-users.title": "Management wallet users",
    "wallet-users.table.header.name": "Name",
    "wallet-users.table.header.wallet": "Wallet",
    "wallet-users.table.header.balance": "Balance",
    "wallet-users.table.header.reserved": "Reserved",
    "wallet-users.table.header.available": "Available",
    "wallet-users.table.header.time": "Time Review",
    "wallet-users.table.header.state": "Status",
    "wallet-users.tooltip.reset": "Reset Password",
    "wallet-users.tooltip.details": "User Detail",
    "wallet-users.tooltip.transactions": "View transactions",
    "wallet-users.tooltip.validated": "KYC Validated",
    "wallet-users.tooltip.invalid": "KYC no validated",
    "wallet-users.state": "Unknown status",
    "wallet-users.state0": "Account created",
    "wallet-users.state1": "Email verified",
    "wallet-users.state2": "KYC verified",
    "wallet-users.state3": "Profile completed",
    "wallet-users.state4": "Wallet created",
    "wallet-users.state5": "KYC No verified",
    "wallet-users.locked-wallet": "Locked Wallet",
    "wallet-users.active-wallet": "Active Wallet",
    "wallet-users.no-wallet": "No wallet",
    "wallet-users.select-state": "Select status",
    "wallet-users.select-wallet": "Select wallet",
    "wallet-users.search.placeholder": "Search by name",
    "wallet-users.inactive-dialog.title": "Deactivate user",
    "wallet-users.inactive-dialog.description":
      "By deactivating this user, you will revoke the user's access to certain system privileges.\n Do you want to proceed?",
    "wallet-users.inactive-dialog.primary-button": "Yes",
    "wallet-users.inactive-dialog.secondary-button": "No",
    "wallet-users.inactive-dialog.toast.success":
      "The user has been deactivated successfully.",
    "wallet-users.activate-dialog.title": "Activate User",
    "wallet-users.activate-dialog.description":
      "By activating this user, you are granting the user access to specific system privileges.\n Do you want to proceed?",
    "wallet-users.activate-dialog.primary-button": "Yes",
    "wallet-users.activate-dialog.secondary-button": "No",
    "wallet-users.activate-dialog.toast.success":
      "The user has been activated successfully.",
    "wallet-users.table.header.is-active": "Active",
    "wallet-users.otp.title": "Access Requirement",
    "wallet-users.otp.description":
      "An OTP has been sent to {{name}}'s email, please enter it to continue.",
    "wallet-users.otp.description.name": "Name",
    "wallet-users.otp.primary-button": "Continue",
    "wallet-users.otp.secondary-button": "Resend Code",
    "wallet-users.otp.code.placeholder": "Enter the code",
    "wallet-user.detail.title": "User Details",
    "wallet-users.details.label.name": "First Name",
    "wallet-users.details.label.lastName": "Last Name",
    "wallet-users.details.label.phone": "Phone No.",
    "wallet-users.details.label.socialSecurityNumber": "Social Security Number",
    "wallet-users.details.label.idType": "ID Type",
    "wallet-users.details.label.idNumber": "ID Number",
    "wallet-users.details.label.country": "Country",
    "wallet-users.details.label.state": "State",
    "wallet-users.details.label.city": "City",
    "wallet-users.details.label.zipcode": "Zip Code",
    "wallet-users.details.button.reset": "Reset Password ",
    "wallet-users.details.button.lock": "Lock Wallet ",
    "wallet-users.details.button.unlock": "Unlock Wallet ",
    "wallet-users.details.button.transactions": "Transactions ",
    "wallet-users.reset-password.title": "Reset Password",
    "wallet-users.reset-password.description":
      "This action will send a password reset email.",
    "wallet-users.reset-password.yes": "Send",
    "wallet-users.reset-password.no": "Cancel",
  },
  es: {
    "wallet-users.title": "Administración Billetera habientes",
    "wallet-users.table.header.name": "Nombre",
    "wallet-users.table.header.wallet": "Billetera",
    "wallet-users.table.header.balance": "Balance",
    "wallet-users.table.header.reserved": "Reservado",
    "wallet-users.table.header.available": "Disponible",
    "wallet-users.table.header.time": "Tiempo Revisado",
    "wallet-users.table.header.state": "Estado",
    "wallet-users.tooltip.lock-wallet": "Bloquear billetera",
    "wallet-users.tooltip.unlock-wallet": "Desbloquear billetera",
    "wallet-users.tooltip.no-wallet": "No existe billetera",
    "wallet-users.tooltip.reset": "Resetear Contraseña",
    "wallet-users.tooltip.details": "Detalles usuario",
    "wallet-users.tooltip.transactions": "Ver transacciones",
    "wallet-users.tooltip.validated": "KYC Validado",
    "wallet-users.tooltip.invalid": "KYC No validado",
    "wallet-users.state": "Estado desconocido",
    "wallet-users.state0": "Cuenta creada",
    "wallet-users.state1": "Correo verificado",
    "wallet-users.state2": "KYC verificado",
    "wallet-users.state3": "Perfil completado",
    "wallet-users.state4": "Billetera Creada",
    "wallet-users.state5": "KYC No verificado",
    "wallet-users.locked-wallet": "Billetera bloqueada",
    "wallet-users.active-wallet": "Billetera Activa",
    "wallet-users.no-wallet": "No hay billetera",
    "wallet-users.select-state": "Seleccionar estado",
    "wallet-users.select-wallet": "Seleccionar billetera",
    "wallet-users.search.placeholder": "Buscar por nombre",
    "wallet-users.inactive-dialog.title": "Desactivar Usuario",
    "wallet-users.inactive-dialog.description":
      "Al desactivar a este usuario, revocarás su acceso a ciertos privilegios del sistema. ¿Deseas continuar?",
    "wallet-users.inactive-dialog.primary-button": "Si",
    "wallet-users.inactive-dialog.secondary-button": "No",
    "wallet-users.inactive-dialog.toast.success":
      "El usuario ha sido desactivado satisfactoriamente.",
    "wallet-users.activate-dialog.title": "Activar Usuario",
    "wallet-users.activate-dialog.description":
      "Al activar a este usuario, le estás otorgando acceso a privilegios específicos del sistema. ¿Deseas continuar?",
    "wallet-users.activate-dialog.primary-button": "Si",
    "wallet-users.activate-dialog.secondary-button": "No",
    "wallet-users.activate-dialog.toast.success":
      "El usuario ha sido activado satisfactoriamente.",
    "wallet-users.table.header.is-active": "Activo",
    "wallet-users.otp.title": "Requisito de acceso",
    "wallet-users.otp.description":
      "Se ha enviado un OTP al correo electrónico de {{name}}, por favor ingrésalo para continuar.",
    "wallet-users.otp.description.name": "Nombre",
    "wallet-users.otp.primary-button": "Continuar",
    "wallet-users.otp.secondary-button": "Reenviar código",
    "wallet-users.otp.code.placeholder": "Ingresar el código",
    "wallet-user.detail.title": "Detalles del usuario",
    "wallet-users.details.label.name": "Nombre",
    "wallet-users.details.label.lastName": "Apellido",
    "wallet-users.details.label.phone": "Teléfono",
    "wallet-users.details.label.socialSecurityNumber":
      "Número seguridad social",
    "wallet-users.details.label.idType": "Tipo ID",
    "wallet-users.details.label.idNumber": "Número ID",
    "wallet-users.details.label.country": "País",
    "wallet-users.details.label.state": "Estado",
    "wallet-users.details.label.city": "Ciudad",
    "wallet-users.details.label.zipcode": "Código Postal",
    "wallet-users.details.button.reset": "Reiniciar Contraseña ",
    "wallet-users.details.button.lock": "Bloquear Billetera ",
    "wallet-users.details.button.unlock": "Desbloquear Billetera ",
    "wallet-users.details.button.transactions": "Transacciones ",
    "wallet-users.reset-password.title": "Restablecer contraseña",
    "wallet-users.reset-password.description":
      "Se enviará un correo electrónico para restablecer la contraseña.",
    "wallet-users.reset-password.yes": "Enviar",
    "wallet-users.reset-password.no": "Cancelar",
  },
} satisfies I18nDictionary;
