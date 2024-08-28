"use client";

import type { I18nDictionary } from "@wg-frontend/i18n";

export const dashboardDict = {
  en: {
    "dashboard.home.title": "Welcome",
    "dashboard.layout.nav.home": "Home",
    "dashboard.layout.nav.wallet-management": "Wallet Management",
    "dashboard.layout.nav.service-providers": "Service Providers",
    "dashboard.layout.nav.users": "Users",
    "dashboard.layout.nav.roles": "Roles",
    "dashboard.layout.logout": "Logout",
    "dashboard.roles.title": "Roles",
    "dashboard.roles.search.placeholder": "Search",
    "dashboard.roles.add-button": "Add Role",
    "dashboard.roles.add-dialog.title": "Add Role",
    "dashboard.roles.add-dialog.name.label": "Name",
    "dashboard.roles.add-dialog.name.placeholder": "Role Name",
    "dashboard.roles.add-dialog.name.error":
      "Role Name cannot contain numbers and must be less than 20 characters",
    "dashboard.roles.add-dialog.description.label": "Description",
    "dashboard.roles.add-dialog.description.placeholder": "",
    "dashboard.roles.add-dialog.description.error":
      "Role Description cannot contain numbers and must be less than 50 characters",
    "dashboard.roles.add-dialog.primary-button": "Create",
    "dashboard.roles.add-dialog.toast.success": "Role Added Successfully",
    "dashboard.roles.edit-dialog.title": "Edit Role",
    "dashboard.roles.edit-dialog.name.label": "Name",
    "dashboard.roles.edit-dialog.name.placeholder": "Role Name",
    "dashboard.roles.edit-dialog.name.error":
      "Role Name cannot contain numbers and must be less than 20 characters",
    "dashboard.roles.edit-dialog.description.label": "Description",
    "dashboard.roles.edit-dialog.description.placeholder": "",
    "dashboard.roles.edit-dialog.description.error":
      "Role Description cannot contain numbers and must be less than 50 characters",
    "dashboard.roles.edit-dialog.primary-button": "Save",
    "dashboard.roles.edit-dialog.toast.success":
      "The role has been edited successfully.",
    "dashboard.roles.inactive-dialog.title": "Inactive Role",
    "dashboard.roles.inactive-dialog.description.first": "Inactiving ",
    "dashboard.roles.inactive-dialog.description.second":
      " Role, will remove their access to all system resources. Proceed?",
    "dashboard.roles.inactive-dialog.primary-button": "Yes",
    "dashboard.roles.inactive-dialog.secondary-button": "No",
    "dashboard.roles.inactive-dialog.toast.success":
      "The role has been deactivated successfully.",
    "dashboard.roles.activate-dialog.title": "Activate Role",
    "dashboard.roles.activate-dialog.description.first": "By activating ",
    "dashboard.roles.activate-dialog.description.second":
      " Role, you are granting them system privileges. Proceed?",
    "dashboard.roles.activate-dialog.primary-button": "Yes",
    "dashboard.roles.activate-dialog.secondary-button": "No",
    "dashboard.roles.activate-dialog.toast.success":
      "The role has been activated successfully.",
    "dashboard.roles.table.header.role": "Role",
    "dashboard.roles.table.header.is-active": "Active",
    "dashboard.roles.table.header.actions": "Actions",
    "dashboard.roles.table.actions.edit": "Edit",
    "dashboard.roles.table.actions.access": "Access",
    "dashboard.roles.table.items-label": "Items per page:",
    "dashboard.roles.table.items-count-separator": " of ",
    "dashboard.users.title": "Wallet Guru Users",
    "dashboard.users.search.placeholder": "Search",
    "dashboard.users.add-button": "Add User",
    "dashboard.users.add-dialog.title": "Add User",
    "dashboard.users.add-dialog.first-name.label": "First Name",
    "dashboard.users.add-dialog.first-name.placeholder": "Enter the name",
    "dashboard.users.add-dialog.first-name.error": "First Name is required",
    "dashboard.users.add-dialog.last-name.label": "Last Name",
    "dashboard.users.add-dialog.last-name.placeholder": "Enter the last name",
    "dashboard.users.add-dialog.last-name.error": "Last Name is required",
    "dashboard.users.add-dialog.email.label": "Email",
    "dashboard.users.add-dialog.email.placeholder": "Enter the email",
    "dashboard.users.add-dialog.email.error":
      "Email is required and must be a valid email",
    "dashboard.users.add-dialog.phone.label": "Phone Number",
    "dashboard.users.add-dialog.phone.code-placeholder": "+00",
    "dashboard.users.add-dialog.phone.phone-placeholder":
      "Enter your phone number",
    "dashboard.users.add-dialog.phone.error": "Phone Number is invalid",
    "dashboard.users.add-dialog.role.label": "Role",
    "dashboard.users.add-dialog.role.placeholder": "Select Role",
    "dashboard.users.add-dialog.role.error": "Role is required",
    "dashboard.users.add-dialog.primary-button": "Save",
    "dashboard.users.add-dialog.toast.success":
      "A confirmation email has been sent to the user with the assigned password.",
    "dashboard.users.edit-dialog.title": "Edit User",
    "dashboard.users.edit-dialog.first-name.label": "First Name",
    "dashboard.users.edit-dialog.first-name.placeholder": "Enter the name",
    "dashboard.users.edit-dialog.first-name.error": "First Name is required",
    "dashboard.users.edit-dialog.last-name.label": "Last Name",
    "dashboard.users.edit-dialog.last-name.placeholder": "Enter the last name",
    "dashboard.users.edit-dialog.last-name.error": "Last Name is required",
    "dashboard.users.edit-dialog.email.label": "Email",
    "dashboard.users.edit-dialog.email.placeholder": "Enter the email",
    "dashboard.users.edit-dialog.email.error":
      "Email is required and must be a valid email",
    "dashboard.users.edit-dialog.phone.label": "Phone Number",
    "dashboard.users.edit-dialog.phone.code-placeholder": "+00",
    "dashboard.users.edit-dialog.phone.phone-placeholder":
      "Enter your phone number",
    "dashboard.users.edit-dialog.phone.error": "Phone Number is invalid",
    "dashboard.users.edit-dialog.role.label": "Role",
    "dashboard.users.edit-dialog.role.placeholder": "Select Role",
    "dashboard.users.edit-dialog.role.error": "Role is required",
    "dashboard.users.edit-dialog.primary-button": "Save",
    "dashboard.users.edit-dialog.toast.success":
      "A confirmation email has been sent to the user with the assigned password.",
    "dashboard.users.inactive-dialog.title": "Inactive user",
    "dashboard.users.inactive-dialog.description":
      "By inactivating this user, you will revoke the user's access to certain system privileges. Do you want to proceed?",
    "dashboard.users.inactive-dialog.primary-button": "Yes",
    "dashboard.users.inactive-dialog.secondary-button": "No",
    "dashboard.users.inactive-dialog.toast.success":
      "The user has been deactivated successfully.",
    "dashboard.users.activate-dialog.title": "Activate User",
    "dashboard.users.activate-dialog.description":
      "By activating this user, you are granting the user access to specific system privileges. Do you want to proceed?",
    "dashboard.users.activate-dialog.primary-button": "Yes",
    "dashboard.users.activate-dialog.secondary-button": "No",
    "dashboard.users.activate-dialog.toast.success":
      "The user has been activated successfully.",
    "dashboard.users.table.header.first-name": "First Name",
    "dashboard.users.table.header.last-name": "Last Name",
    "dashboard.users.table.header.email": "Mail",
    "dashboard.users.table.header.phone": "Phone",
    "dashboard.users.table.header.role": "Role",
    "dashboard.users.table.header.is-active": "Active",
    "dashboard.users.table.header.actions": "Actions",
    "dashboard.users.table.actions.edit": "Edit",
    "dashboard.users.table.items-label": "Items per page:",
    "dashboard.users.table.items-count-separator": " of ",
    "dashboard.wallet-management.title": "Registered Wallets",
    "dashboard.wallet-management.search.placeholder": "Search",
    "dashboard.wallet-management.add-button": "Add new wallet",
    "dashboard.wallet-management.add-dialog.title": "Create a new wallet",
    "dashboard.wallet-management.add-dialog.name.label": "Name",
    "dashboard.wallet-management.add-dialog.name.placeholder": "Wallet Name",
    "dashboard.wallet-management.add-dialog.name.error":
      "Wallet Name is required",
    "dashboard.wallet-management.add-dialog.type.label": "Wallet Type",
    "dashboard.wallet-management.add-dialog.type.placeholder": "Wallet Type",
    "dashboard.wallet-management.add-dialog.type.error":
      "Wallet Type is required",
    "dashboard.wallet-management.add-dialog.address.label": "Wallet Address",
    "dashboard.wallet-management.add-dialog.address.placeholder":
      "Wallet Address",
    "dashboard.wallet-management.add-dialog.address.error":
      "Wallet Address must be a valid URL",
    "dashboard.wallet-management.add-dialog.primary-button": "Create",
    "dashboard.wallet-management.add-dialog.toast.success":
      "The wallet was Successfully created",
    "dashboard.wallet-management.edit-dialog.title": "Edit Wallet",
    "dashboard.wallet-management.edit-dialog.name.label": "Name",
    "dashboard.wallet-management.edit-dialog.name.placeholder": "Wallet Name",
    "dashboard.wallet-management.edit-dialog.name.error":
      "Wallet Name is required",
    "dashboard.wallet-management.edit-dialog.type.label": "Wallet Type",
    "dashboard.wallet-management.edit-dialog.type.placeholder": "Wallet Type",
    "dashboard.wallet-management.edit-dialog.type.error":
      "Wallet Type is required",
    "dashboard.wallet-management.edit-dialog.address.label": "Wallet Address",
    "dashboard.wallet-management.edit-dialog.address.placeholder":
      "Wallet Address",
    "dashboard.wallet-management.edit-dialog.address.error":
      "Wallet Address must be a valid URL",
    "dashboard.wallet-management.edit-dialog.primary-button": "Create",
    "dashboard.wallet-management.edit-dialog.toast.success":
      "The wallet was Successfully edited",
    "dashboard.wallet-management.inactive-dialog.title": "Inactive Wallet",
    "dashboard.wallet-management.inactive-dialog.description":
      "Deactivating the wallet will block transactions and access. Do you want to proceed?",
    "dashboard.wallet-management.inactive-dialog.primary-button": "Yes",
    "dashboard.wallet-management.inactive-dialog.secondary-button": "No",
    "dashboard.wallet-management.inactive-dialog.toast.success":
      "The wallet has been deactivated successfully.",
    "dashboard.wallet-management.activate-dialog.title": "Activate Wallet",
    "dashboard.wallet-management.activate-dialog.description":
      "Activating the wallet will restore transactions and access. Do you want to proceed?",
    "dashboard.wallet-management.activate-dialog.primary-button": "Yes",
    "dashboard.wallet-management.activate-dialog.secondary-button": "No",
    "dashboard.wallet-management.activate-dialog.toast.success":
      "The wallet has been activated successfully.",
    "dashboard.wallet-management.table.header.name": "Name",
    "dashboard.wallet-management.table.header.address": "Wallet Address",
    "dashboard.wallet-management.table.header.type": "Type",
    "dashboard.wallet-management.table.header.is-active": "Active",
    "dashboard.wallet-management.table.header.actions": "Actions",
    "dashboard.wallet-management.table.actions.edit": "Edit",
    "dashboard.wallet-management.table.items-label": "Items per page:",
    "dashboard.wallet-management.table.items-count-separator": " of ",
  },
  es: {
    "dashboard.home.title": "Bienvenido",
    "dashboard.layout.nav.home": "Inicio",
    "dashboard.layout.nav.wallet-management": "Billeteras",
    "dashboard.layout.nav.service-providers": "Service Providers",
    "dashboard.layout.nav.users": "Usuarios",
    "dashboard.layout.nav.roles": "Roles",
    "dashboard.layout.logout": "Cerrar sesión",
    "dashboard.roles.title": "Roles",
    "dashboard.roles.search.placeholder": "Buscar",
    "dashboard.roles.add-button": "Crear Rol",
    "dashboard.roles.add-dialog.title": "Crear Rol",
    "dashboard.roles.add-dialog.name.label": "Nombre",
    "dashboard.roles.add-dialog.name.placeholder": "Nombre del Rol",
    "dashboard.roles.add-dialog.name.error":
      "El nombre del Rol no puede contener números y debe tener menos de 20 caracteres",
    "dashboard.roles.add-dialog.description.label": "Descripción",
    "dashboard.roles.add-dialog.description.placeholder": "",
    "dashboard.roles.add-dialog.description.error":
      "El nombre del Rol no puede contener números y debe tener menos de 50 caracteres",
    "dashboard.roles.add-dialog.primary-button": "Crear",
    "dashboard.roles.add-dialog.toast.success": "Rol Creado Exitosamente",
    "dashboard.roles.edit-dialog.title": "Editar Rol",
    "dashboard.roles.edit-dialog.name.label": "Nombre",
    "dashboard.roles.edit-dialog.name.placeholder": "Nombre del Rol",
    "dashboard.roles.edit-dialog.name.error":
      "El nombre del Rol no puede contener números y debe tener menos de 20 caracteres",
    "dashboard.roles.edit-dialog.description.label": "Descripción",
    "dashboard.roles.edit-dialog.description.placeholder": "",
    "dashboard.roles.edit-dialog.description.error":
      "La descripción del Rol no puede contener números y debe tener menos de 50 caracteres",
    "dashboard.roles.edit-dialog.primary-button": "Guardar",
    "dashboard.roles.edit-dialog.toast.success":
      "El rol se ha editado exitosamente.",
    "dashboard.roles.inactive-dialog.title": "Desactivar Rol",
    "dashboard.roles.inactive-dialog.description.first": "Al desactivar Rol ",
    "dashboard.roles.inactive-dialog.description.second":
      " se le quitará el acceso a todos los recursos del sistema. ¿Desea continuar?",
    "dashboard.roles.inactive-dialog.primary-button": "Sí",
    "dashboard.roles.inactive-dialog.secondary-button": "No",
    "dashboard.roles.inactive-dialog.toast.success":
      "El rol se ha desactivado exitosamente.",
    "dashboard.roles.activate-dialog.title": "Activar Rol",
    "dashboard.roles.activate-dialog.description.first": "Al activar Rol ",
    "dashboard.roles.activate-dialog.description.second":
      " se le otorgarán privilegios en el sistema. ¿Desea continuar?",
    "dashboard.roles.activate-dialog.primary-button": "Sí",
    "dashboard.roles.activate-dialog.secondary-button": "No",
    "dashboard.roles.activate-dialog.toast.success":
      "El rol se ha activado exitosamente.",
    "dashboard.roles.table.header.role": "Rol",
    "dashboard.roles.table.header.is-active": "Activo",
    "dashboard.roles.table.header.actions": "Acciones",
    "dashboard.roles.table.actions.edit": "Editar",
    "dashboard.roles.table.actions.access": "Acceder",
    "dashboard.roles.table.items-label": "Elementos por página:",
    "dashboard.roles.table.items-count-separator": " de ",
    "dashboard.users.title": "Usuarios de Wallet Guru",
    "dashboard.users.search.placeholder": "Buscar",
    "dashboard.users.add-button": "Agregar Usuario",
    "dashboard.users.add-dialog.title": "Agregar Usuario",
    "dashboard.users.add-dialog.first-name.label": "Nombre",
    "dashboard.users.add-dialog.first-name.placeholder": "Ingrese el nombre",
    "dashboard.users.add-dialog.first-name.error": "Nombre es requerido",
    "dashboard.users.add-dialog.last-name.label": "Apellido",
    "dashboard.users.add-dialog.last-name.placeholder": "Ingrese el apellido",
    "dashboard.users.add-dialog.last-name.error": "Apellido es requerido",
    "dashboard.users.add-dialog.email.label": "Correo",
    "dashboard.users.add-dialog.email.placeholder": "Ingrese el correo",
    "dashboard.users.add-dialog.email.error":
      "Correo es requerido y debe ser un correo válido",
    "dashboard.users.add-dialog.phone.label": "Número de Teléfono",
    "dashboard.users.add-dialog.phone.code-placeholder": "+00",
    "dashboard.users.add-dialog.phone.phone-placeholder":
      "Ingrese su número de teléfono",
    "dashboard.users.add-dialog.phone.error": "Número de Teléfono es invalido",
    "dashboard.users.add-dialog.role.label": "Rol",
    "dashboard.users.add-dialog.role.placeholder": "Seleccionar Rol",
    "dashboard.users.add-dialog.role.error": "Rol es requerido",
    "dashboard.users.add-dialog.primary-button": "Guardar",
    "dashboard.users.add-dialog.toast.success":
      "Se ha enviado un correo de confirmación al usuario con la contraseña asignada.",
    "dashboard.users.edit-dialog.title": "Editar Usuario",
    "dashboard.users.edit-dialog.first-name.label": "Nombre",
    "dashboard.users.edit-dialog.first-name.placeholder": "Ingrese el nombre",
    "dashboard.users.edit-dialog.first-name.error": "Nombre es requerido",
    "dashboard.users.edit-dialog.last-name.label": "Apellido",
    "dashboard.users.edit-dialog.last-name.placeholder": "Ingrese el apellido",
    "dashboard.users.edit-dialog.last-name.error": "Apellido es requerido",
    "dashboard.users.edit-dialog.email.label": "Correo",
    "dashboard.users.edit-dialog.email.placeholder": "Ingrese el correo",
    "dashboard.users.edit-dialog.email.error":
      "Correo es requerido y debe ser un correo válido",
    "dashboard.users.edit-dialog.phone.label": "Número de Teléfono",
    "dashboard.users.edit-dialog.phone.code-placeholder": "+00",
    "dashboard.users.edit-dialog.phone.phone-placeholder":
      "Ingrese su número de teléfono",
    "dashboard.users.edit-dialog.phone.error": "Número de Teléfono es invalido",
    "dashboard.users.edit-dialog.role.label": "Rol",
    "dashboard.users.edit-dialog.role.placeholder": "Seleccionar Rol",
    "dashboard.users.edit-dialog.role.error": "Rol es requerido",
    "dashboard.users.edit-dialog.primary-button": "Guardar",
    "dashboard.users.edit-dialog.toast.success":
      "Se ha enviado un correo de confirmación al usuario con la contraseña asignada.",
    "dashboard.users.inactive-dialog.title": "Inactivar usuario",
    "dashboard.users.inactive-dialog.description":
      "Al inactivar este usuario, revocará el acceso del usuario a ciertos privilegios del sistema. ¿Desea continuar?",
    "dashboard.users.inactive-dialog.primary-button": "Sí",
    "dashboard.users.inactive-dialog.secondary-button": "No",
    "dashboard.users.inactive-dialog.toast.success":
      "El usuario se ha desactivado exitosamente.",
    "dashboard.users.activate-dialog.title": "Activar Usuario",
    "dashboard.users.activate-dialog.description":
      "Al activar este usuario, le está otorgando al usuario acceso a privilegios específicos del sistema. ¿Desea continuar?",
    "dashboard.users.activate-dialog.primary-button": "Sí",
    "dashboard.users.activate-dialog.secondary-button": "No",
    "dashboard.users.activate-dialog.toast.success":
      "El usuario se ha activado exitosamente.",
    "dashboard.users.table.header.first-name": "Nombre",
    "dashboard.users.table.header.last-name": "Apellido",
    "dashboard.users.table.header.email": "Correo",
    "dashboard.users.table.header.phone": "Teléfono",
    "dashboard.users.table.header.role": "Rol",
    "dashboard.users.table.header.is-active": "Activo",
    "dashboard.users.table.header.actions": "Acciones",
    "dashboard.users.table.actions.edit": "Editar",
    "dashboard.users.table.items-label": "Elementos por página:",
    "dashboard.users.table.items-count-separator": " de ",
    "dashboard.wallet-management.title": "Billeteras Registradas",
    "dashboard.wallet-management.search.placeholder": "Buscar",
    "dashboard.wallet-management.add-button": "Agregar nueva billetera",
    "dashboard.wallet-management.add-dialog.title": "Crear una nueva billetera",
    "dashboard.wallet-management.add-dialog.name.label": "Nombre",
    "dashboard.wallet-management.add-dialog.name.placeholder":
      "Nombre de la Billetera",
    "dashboard.wallet-management.add-dialog.name.error":
      "Nombre de la Billetera es requerido",
    "dashboard.wallet-management.add-dialog.type.label": "Tipo de Billetera",
    "dashboard.wallet-management.add-dialog.type.placeholder":
      "Tipo de Billetera",
    "dashboard.wallet-management.add-dialog.type.error":
      "Tipo de Billetera es requerido",
    "dashboard.wallet-management.add-dialog.address.label":
      "Dirección de la Billetera",
    "dashboard.wallet-management.add-dialog.address.placeholder":
      "Dirección de la Billetera",
    "dashboard.wallet-management.add-dialog.address.error":
      "Dirección de la Billetera debe ser una URL válida",
    "dashboard.wallet-management.add-dialog.primary-button": "Crear",
    "dashboard.wallet-management.add-dialog.toast.success":
      "La billetera se ha creado exitosamente",
    "dashboard.wallet-management.edit-dialog.title": "Editar Billetera",
    "dashboard.wallet-management.edit-dialog.name.label": "Nombre",
    "dashboard.wallet-management.edit-dialog.name.placeholder":
      "Nombre de la Billetera",
    "dashboard.wallet-management.edit-dialog.name.error":
      "Nombre de la Billetera es requerido",
    "dashboard.wallet-management.edit-dialog.type.label": "Tipo de Billetera",
    "dashboard.wallet-management.edit-dialog.type.placeholder":
      "Tipo de Billetera",
    "dashboard.wallet-management.edit-dialog.type.error":
      "Tipo de Billetera es requerido",
    "dashboard.wallet-management.edit-dialog.address.label":
      "Dirección de la Billetera",
    "dashboard.wallet-management.edit-dialog.address.placeholder":
      "Dirección de la Billetera",
    "dashboard.wallet-management.edit-dialog.address.error":
      "Dirección de la Billetera debe ser una URL válida",
    "dashboard.wallet-management.edit-dialog.primary-button": "Crear",
    "dashboard.wallet-management.edit-dialog.toast.success":
      "La billetera se ha editado exitosamente",
    "dashboard.wallet-management.inactive-dialog.title": "Billetera Inactiva",
    "dashboard.wallet-management.inactive-dialog.description":
      "Al desactivar la billetera, se bloquearán las transacciones y el acceso. ¿Desea continuar?",
    "dashboard.wallet-management.inactive-dialog.primary-button": "Sí",
    "dashboard.wallet-management.inactive-dialog.secondary-button": "No",
    "dashboard.wallet-management.inactive-dialog.toast.success":
      "La billetera se ha desactivado exitosamente.",
    "dashboard.wallet-management.activate-dialog.title": "Activar Billetera",
    "dashboard.wallet-management.activate-dialog.description":
      "Al activar la billetera, se restaurarán las transacciones y el acceso. ¿Desea continuar?",
    "dashboard.wallet-management.activate-dialog.primary-button": "Sí",
    "dashboard.wallet-management.activate-dialog.secondary-button": "No",
    "dashboard.wallet-management.activate-dialog.toast.success":
      "La billetera se ha activado exitosamente.",
    "dashboard.wallet-management.table.header.name": "Nombre",
    "dashboard.wallet-management.table.header.address":
      "Dirección de la Billetera",
    "dashboard.wallet-management.table.header.type": "Tipo",
    "dashboard.wallet-management.table.header.is-active": "Activo",
    "dashboard.wallet-management.table.header.actions": "Acciones",
    "dashboard.wallet-management.table.actions.edit": "Editar",
    "dashboard.wallet-management.table.items-label": "Elementos por página:",
    "dashboard.wallet-management.table.items-count-separator": " de ",
  },
} satisfies I18nDictionary;
