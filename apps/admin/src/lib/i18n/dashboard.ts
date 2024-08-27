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
    "dashboard.roles.add-dialog.description.label": "Role Description",
    "dashboard.roles.add-dialog.description.placeholder": "Description",
    "dashboard.roles.add-dialog.description.error":
      "Role Description cannot contain numbers and must be less than 50 characters",
    "dashboard.roles.add-dialog.primary-button": "Create",
    "dashboard.roles.add-dialog.toast.success": "Role Added Successfully",
    "dashboard.roles.edit-dialog.title": "Edit Role",
    "dashboard.roles.edit-dialog.name.label": "Name",
    "dashboard.roles.edit-dialog.name.placeholder": "Role Name",
    "dashboard.roles.edit-dialog.name.error":
      "Role Name cannot contain numbers and must be less than 20 characters",
    "dashboard.roles.edit-dialog.description.label": "Role Description",
    "dashboard.roles.edit-dialog.description.placeholder": "Description",
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
    "dashboard.roles.add-dialog.description.placeholder": "Descripción del Rol",
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
    "dashboard.roles.edit-dialog.description.placeholder":
      "Descripción del Rol",
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
  },
} satisfies I18nDictionary;
